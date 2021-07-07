import axios from 'axios'
import store from '../store/index.js'
import bus from '@/utils/bus.js'

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL
})
instance.authCheck = true

instance.interceptors.request.use(
  (config) => {
    /**
     * 인증키가 필요한 API 인지 판단하여, 인증키가 없는 경우 강제 로그아웃을 진행
     */
    if( instance.authCheck && store.getters.getUserInfo.access_token == undefined ) {
      bus.$emit('forceLogout')
      return false
    } else {
      config.headers.Authorization = `${ store.getters.getUserInfo.token_type } ${ store.getters.getUserInfo.access_token }`
      return config
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    bus.$emit('end:spinner')
    return response
  },
  (error) => {
    if( error.response.status == 401 ) {
      bus.$emit('forceLogout')
      return Promise.reject(error)
    }
    bus.$emit('end:spinner')
    return Promise.reject(error)
  }
)

function apiUserInfo(user_seq) {
  return instance.get(`/api/users/${user_seq}`)
}

function apiLogin (id, password) {
  instance.authCheck = false
  let form = new FormData()
  form.append('id', id)
  form.append('password', password)
  return instance.post('/api/login', form)
}

function apiUserList () {
  return instance.get('/api/users')
}

function apiUserProfileImage (user_seq, fileObj) {
  let form = new FormData();
  form.append('_method', 'PATCH')
  form.append('user_seq', user_seq)
  form.append('file', fileObj)
  return instance.post('/api/users/profileImage', form)
}

function apiArticleList() {
  return instance.get('/api/articles')
}

export {
  apiLogin,
  apiUserInfo,
  apiUserList,
  apiUserProfileImage,
  apiArticleList
}