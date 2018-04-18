import {login,logout,getInfo} from '@/js/api/login'
import {getToken,setToken,removeToken} from '@/js/auth'

const user = {
  state:{
    token:getToken(),
    name:'',
    avatar:'',
    roles:[]
  },

  mutations:{
    SET_TOKEN:(state,token) => {
      state.token = token
    },
    SET_USER_ID:(state,user_id) => {
      state.user_id = user_id
    },
    SET_NAME:(state,name) => {
      state.name = name
    },
    SET_AVATAR:(state,avatar) => {
      state.avatar = avatar
    },
    SET_ROLES:(state,roles) => {
      state.roles = roles
    }
  },

  actions:{
    // 登录
    Login({commit},userInfo) {
      const user_id = userInfo.user_id.trim();
      // console.log('userInfo',userInfo);
      return new Promise((resolve,reject) => {
        login(user_id,userInfo.password).then(response => {
          // console.log('login response',response);
          const token = user_id + '|' + response.msg;
          setToken(token);
          commit('SET_USER_ID',user_id);
          commit('SET_TOKEN',token);
          resolve()
        }).catch(error => {
          console.log('login error',error);
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({commit,state}) {
      return new Promise((resolve,reject) => {
        getInfo(state.user_id).then(response => {
          // console.log('getuserinfo',response)
          commit('SET_ROLES',response.roles);
          commit('SET_NAME',response.name);
          commit('SET_AVATAR',response.avatar);
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({commit,state}) {
      return new Promise((resolve,reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN','');
          commit('SET_ROLES',[]);
          removeToken();
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({commit}) {
      return new Promise(resolve => {
        commit('SET_TOKEN','');
        removeToken();
        resolve()
      })
    }
  }
}

export default user
