import request from '@/utils/request'

// 登录
export function userLogin(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

// 获取当前用户信息
export function getProfile() {
  return request({
    url: '/users/me'
  })
}
