<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item"
                :placeholder="$t('table.title')" v-model="datas.param.keyword">
      </el-input>
      <el-button class="filter-item" type="primary" icon="el-icon-search"
                 @click="btnSearch()">
        {{$t('table.search')}}
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="btnAdd()" type="primary"
                 icon="el-icon-edit">{{$t('table.add')}}
      </el-button>
    </div>
    <ac-table :cfg="datas" ref="datas" @callback="datasCallback">

      <template slot="page_title" slot-scope="props">
        <el-tag><span class="link-type" @click="viewReport(props.value)">{{props.value.page_title}}</span></el-tag>
      </template>

      <!--编辑框内容-->
      <template slot="_dialog">

        <el-form-item :label="$t('id')" prop="id" v-show="pageStatus==='add'">
          <el-input v-model="datas.temp.id" :readonly="true"></el-input>
        </el-form-item>


        <el-form-item :label="$t('page_title')" prop="url_text">
          <el-input v-model="datas.temp.page_title"></el-input>
        </el-form-item>

        <el-form-item :label="$t('sql_text')" prop="sql_text">
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 10}" placeholder="请输入SQL"
                    v-model="datas.temp.sql_text">
          </el-input>
        </el-form-item>

      </template>
      <!--编辑框内容-->

    </ac-table>
  </div>
</template>

<script>

  import AcTable from "@/components/AcTable/AcTable";

  export default {
    components:{AcTable},
    data() {
      return {
        datas:{
          url:'system/report',
          columns:[
            {column:'id'},
            {
              column:'page_title',
              template:true,
            },
            {
              column:'sql_text',
            }
          ],
          param:{
            keyword:''
          },
          pk:'id',
          temp:{
            id:'',
            url_text:'',
            page_title:'',
            sql_text:'',
          },
          show_update_link:true,
          show_delete_link:true
        },
        pageStatus:''
      }
    },
    methods:{
      btnSearch() {
        this.$refs.datas.search();
      },
      btnAdd() {
        this.$refs.datas.add();
      },
      datasCallback(action) {
        console.log('action',action);
        this.pageStatus = this.$refs.datas.pageStatus;
        if (action.indexOf('link_') === 0) {
          this.datas.temp = this.$refs.datas.config.temp;
        } else if (action === 'add') {

        } else if (action === 'update') {

        } else {

        }
      },
      viewReport(row) {
        this.$router.push({
          path:'/report/list',query:{id:row.id,title:row.page_title}
        })
      }
    }
  }
</script>

<style scoped>

</style>
