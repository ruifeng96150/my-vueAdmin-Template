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

      <!--自定义列-->
      <template slot="user_role" slot-scope="props">
        <el-tag :type="props.value.user_role|statusFilter">{{props.value.user_role}}</el-tag>
      </template>
      <!--自定义列-->

      <!--编辑框内容-->
      <template slot="_dialog">
        <el-form-item :label="$t('user_id')" prop="user_id">
          <el-input v-model="datas.temp.user_id" :readonly="pageStatus=='update'"></el-input>
        </el-form-item>

        <el-form-item :label="$t('user_pwd')" prop="user_pwd">
          <el-input v-model="datas.temp.user_pwd"></el-input>
        </el-form-item>

        <el-form-item :label="$t('user_name')" prop="user_name">
          <el-input v-model="datas.temp.user_name"></el-input>
        </el-form-item>

        <el-form-item :label="$t('table.type')" prop="type">
          <el-select class="filter-item" v-model="datas.temp.user_role" :placeholder="$t('components.please_select')">
            <el-option v-for="item in user_roles" :key="item" :label="item"
                       :value="item">
            </el-option>
          </el-select>
        </el-form-item>
      </template>
      <!--编辑框内容-->

    </ac-table>
  </div>
</template>

<script>

  import AcTable from "@/components/AcTable/AcTable";
  // import SvgIcon from '@/components/SvgIcon'

  export default {
    components:{AcTable},
    data() {
      return {
        datas:{
          url:'system/user',
          columns:[
            {
              column:'user_id',
            },
            {
              column:'user_name',
            },
            {
              column:'user_role',
              template:true,
            },
            {
              column:'login_time'
            }
          ],
          param:{
            keyword:''
          },
          pk:'user_id',
          temp:{
            user_id:'',
            user_pwd:'',
            user_name:'',
            user_role:'',
          },
          show_update_link:true,
          show_delete_link:true
        },
        user_roles:['admin','editor'],
        pageStatus:''
      }
    },
    methods:{
      btnSearch() {
        console.log('param',this.datas.param);
        this.$refs.datas.search();
      },
      btnAdd() {
        this.$refs.datas.add();
      },
      datasCallback(action) {
        console.log('action',action,action.indexOf('link_'));
        this.pageStatus = this.$refs.datas.pageStatus;
        if (action.indexOf('link_') === 0) {
          this.datas.temp = this.$refs.datas.config.temp;
        } else if (action === 'add') {
          // this.datas.temp.user_id = '';
        } else if (action === 'update') {

        } else {

        }
      }
    },
    filters:{
      statusFilter(status) {
        const statusMap = {
          admin:'danger',
          editor:'gray'
        };
        return statusMap[status]
      }
    },
  }
</script>

<style scoped>

</style>
