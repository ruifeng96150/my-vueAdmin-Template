import request from '@/js/request'
import md5 from 'js-md5';

export function login(username,password) {
  return request({
    url:'system/user/login',
    method:'post',
    data:{
      user_id:username,
      pass_word:md5(password)
    }
  })
}

export function getInfo(user_id) {
  return request({
    url:'system/user/info',
    method:'get',
    params:{
      user_id:user_id
    }
  })
}

export function logout() {
  return request({
    url:'system/user/logout',
    method:'post'
  })
}
