import axios from 'axios'
import store from '../store/index.js'
import bus from '@/utils/bus.js'

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL
})

instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `${ store.getters.getUserInfo.token_type } ${ store.getters.getUserInfo.access_token }`
    return config
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
    bus.$emit('end:spinner')
    return Promise.reject(error)
  }
)

function apiUserInfo(user_seq) {
  return instance.get(`/users/${user_seq}`)
}

function apiLogin (id, password) {
  let form = new FormData()
  form.append('id', id)
  form.append('password', password)
  return instance.post('/api/login', form)
}

function apiDashboard () {
  return instance.get('/solution/company/companyList')
}

function apiCompanyList () {
  //let options = apiCallSet('/solution/company/companyList', 'GET')
  //return axiosObj(options)
  return instance.get('/solution/company/companyList')
}

function apiCompanyInfo(company_seq){
  //let options = apiCallSet('/solution/company/companyList/'+company_seq, 'GET');
  //return axiosObj(options);
  return instance.get('/solution/company/companyList/'+company_seq)
}

function apicompanyModify(company_data){
  let form = new FormData();
  form.append('_method', 'PUT');
  form.append('company_data', JSON.stringify(company_data));
  return instance.post('/solution/company/modify', form);
}

function apiCompanyRegister(company_data, admin_data){
  //data.company_data   = JSON.stringify(company_data);
  let data = {
    'company_data'  :  JSON.stringify(company_data),
    'admin_data'    :  JSON.stringify(admin_data)
  }
  return instance.post('/solution/company/register', data);
}


export {
  apiUserInfo,
  apiLogin,
  apiDashboard,
  apiCompanyList,
  apiCompanyInfo,
  apicompanyModify,
  apiCompanyRegister
}