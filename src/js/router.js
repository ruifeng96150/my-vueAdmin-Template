import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '@/common/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  {path:'/login',component:() => import('@/common/login'),hidden:true},
  {path:'/404',component:() => import('@/common/404'),hidden:true},
  {
    path:'/',
    component:Layout,
    redirect:'/dashboard',
    name:'首页',
    hidden:true,
    children:[
      {
        path:'dashboard',
        name:'dashboard',
        component:() => import('@/common/dashboard')
      }
    ]
  },
  {
    path:'/user',
    component:Layout,
    redirect:'/user/user',
    name:'user',
    meta:{title:'用户管理',icon:'example'},
    children:[
      {
        path:'user',
        component:() => import('@/system/user'),
        meta:{title:'用户管理',icon:'table'}
      }
    ]
  },
  {
    path:'/system',
    component:Layout,
    redirect:'/system/user',
    name:'system',
    meta:{title:'报表',icon:'example'},
    children:[
      {
        path:'report',
        component:() => import('@/system/report'),
        meta:{title:'报表管理',icon:'icon'}
      }
    ]
  },
  {
    path:'/report',
    component:Layout,
    redirect:'/report/list',
    name:'report',
    hidden:true,
    meta:{title:'Report',icon:'clipboard'},
    children:[
      {
        path:'list',
        name:'list',
        component:() => import('@/report/list'),
        meta:{title:'报表1',icon:'chart'}
      }
    ]
  },
  {path:'*',redirect:'/',hidden:true}
];

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior:() => ({y:0}),
  routes:constantRouterMap
})

