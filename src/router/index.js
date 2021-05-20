import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import bus from '../utils/bus'

import LoginView from '../views/login/index.vue'
import DashboardView from '../views/dashboard/'
import AccountListView from '../views/account/'
import AccountCreateView from '../views/account/create'
import AccountView from '../views/account/view'
import AccountModifyView from '../views/account/modify'

Vue.use(VueRouter)

const requireAuth = () => (to, from, next) => {
  if( to.meta.pageLoader ){
    bus.$emit('start:spinner')
  }
  const userInfo = store.getters.getUserInfo
  console.log(userInfo.apiKey)
  // if( userInfo.apiKey === '' ) {
  //   return next('/login')
  // } else {
  //   return next()
  // }
  return next()
}

const routes = [
  {
    path: '/',
    name: 'default',
    redirect: '/dashboard'
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      layout: 'BlankLayout'
    },
    component: LoginView,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: {
      layout: 'adminLayout',
      pageLoader: true
    },
    component: DashboardView,
    beforeEnter: requireAuth()
  },
  {
    path: '/account',
    name: 'accountList',
    meta: {
      layout: 'adminLayout'
    },
    component: AccountListView,
    beforeEnter: requireAuth()
  },
  {
    path: '/account/create',
    name: 'accountCreate',
    meta: {
      layout: 'adminLayout'
    },
    component: AccountCreateView,
    beforeEnter: requireAuth()
  },
  {
    path: '/account/:seq',
    name: 'accountView',
    meta: {
      layout: 'adminLayout'
    },
    component: AccountView,
    beforeEnter: requireAuth()
  },
  {
    path: '/account/modify/:seq',
    name: 'accountModifyView',
    meta: {
      layout: 'adminLayout'
    },
    component: AccountModifyView,
    beforeEnter: requireAuth()
  },
  { /* 404 error 방지 */
    path: '*',
    redirect: '/'
  }
];

export const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
