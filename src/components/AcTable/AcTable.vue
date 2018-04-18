<template>
  <div class="app-container">
    <el-table :data="config.data" v-loading.body="listLoading" element-loading-text="Loading" border fit
              highlight-current-row>

      <!--行操作链接-->
      <el-table-column align="center" :label="$t('table.actions')" width="100" class-name="small-padding fixed-width"
                       v-if="config.show_view_link || config.show_update_link || config.show_delete_link">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="handleLink(scope.row,'view')" v-if="config.show_view_link">
            {{$t('table.view')}}
          </el-button>
          <el-button type="text" size="mini" @click="handleLink(scope.row,'update')" v-if="config.show_update_link">
            {{$t('table.update')}}
          </el-button>
          <el-button size="mini" type="text" style="color:#F56C6C" v-if="config.show_delete_link"
                     @click="handleLink(scope.row,'delete')">{{$t('table.delete')}}
          </el-button>
        </template>
      </el-table-column>
      <!--行操作链接-->

      <!--表格数据-->
      <el-table-column v-for="(col,idx) in config.columns" :key="idx" :align="col.align"
                       :label="$t(''+col.column)"
                       :width="col.width">
        <template slot-scope="scope">
          <span v-if="!col.template">
          {{scope.row[col.column]}}
          </span>
          <span v-if="col.template">
               <slot :name="col.column" :value="scope.row"></slot>
          </span>
        </template>
      </el-table-column>
      <!--表格数据-->

    </el-table>


    <!--分页-->
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="config.param.page" :page-sizes="[10,20,30, 50]" :page-size="config.param.limit"
                     layout="total, sizes, prev, pager, next, jumper" :total="config.count">
      </el-pagination>
    </div>
    <!--分页-->

    <!--编辑页-->
    <el-dialog :title="$t('table.'+pageStatus)" :visible.sync="dialogFormVisible">
      <el-form :rules="config.rules" ref="dataForm" :model="config.temp" label-position="left" label-width="70px"
               style='width: 400px; margin-left:50px;'>
        <slot :name="'_dialog'" :value="config.temp" v-if="!isConfirmDialog"></slot>
        <div v-if="isConfirmDialog">
          {{$t('table.confirm_delete')}} {{$t(cfg.pk)}}:{{config.temp[cfg.pk]}}
        </div>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button type="primary" @click="handleBtn('confirm')">{{$t('table.confirm')}}
        </el-button>
      </div>
    </el-dialog>
    <!--编辑页-->

  </div>
</template>

<script>
  import {Message,MessageBox} from 'element-ui'
  import request from '@/js/request'
  import {deepMerge} from '@/js/tools'

  export default {
    name:'ac-table',
    props:{
      cfg:{
        type:Object,
        default:{}
      }
    },
    data() {
      return {
        config:{},
        listLoading:true,
        dialogFormVisible:false,
        isConfirmDialog:false,
        pageStatus:''//add,update,view,delete
      }
    },
    created() {
      const _cfg = {
        data:null,
        columns:[],
        count:null,
        param:{
          page:1,
          limit:20,
          sort:'+user_id'
        },
        show_view_link:false,
        show_update_link:false,
        show_delete_link:false,
      };
      this.config = deepMerge(_cfg,this.cfg);
      this.search()
    },
    methods:{
      search() {
        this.listLoading = true;
        request({
          url:this.config.url + '/getlist',
          method:'get',
          params:this.config.param
        }).then(response => {
          if (this.config.columns.length === 0 && response.data.length > 0) {
            this.config.columns = [];
            for (let col in response.data[0]) {
              this.config.columns.push({
                column:col
              });
            }
          }
          this.config.data = response.data;
          this.config.count = response.count;
          this.listLoading = false;
        })
      },
      add() {
        this.$emit('callback','add_before');
        this.pageStatus = 'add';
        this.dialogFormVisible = true;
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      handleSizeChange(val) {
        this.config.param.limit = val;
        this.search()
      },
      handleCurrentChange(val) {
        this.config.param.page = val;
        this.search()
      },
      handleLink(row,action) {
        console.log('handleLink',action);
        this.config.temp = deepMerge(row); // copy obj
        this.$emit('callback','link_' + action);
        this.pageStatus = action;
        this.dialogFormVisible = true;
        if (action === 'delete') {
          this.isConfirmDialog = true;
        } else {
          this.isConfirmDialog = false;
          this.$nextTick(() => {
            this.$refs['dataForm'].clearValidate()
          })
        }

      },
      handleBtn(type) {
        console.log('handleBtn',this.pageStatus,type);
        if (type === 'confirm') {
          console.log(this.config.temp);
          const allowStatus = 'add,delete,update';
          if (allowStatus.indexOf(this.pageStatus) > -1) {
            this.listLoading = true;
            request({
              url:this.config.url + '/' + this.pageStatus,
              method:'post',
              params:this.config.temp
            }).then(response => {
              console.log(response);
              if (response.success) {
                this.listLoading = false;
                this.dialogFormVisible = false;
                this.search()
              } else {
                Message({
                  message:response.msg,
                  type:'error',
                  duration:5 * 1000
                });
              }
            })
          }
        }
      }
    }
  }
</script>
