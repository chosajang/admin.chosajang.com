import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
// import bus from '../utils/bus'
import { jwtRemainingTime } from '@/utils/common.js'
import VueJwtDecode from 'vue-jwt-decode'

import LoginView from '../views/login/'
import DashboardView from '../views/dashboard/'
import UserListView from '../views/users/'
import UserCreateView from '../views/users/create'
import UserReadView from '../views/users/read'
import UserUpdateView from '../views/users/update'
import ArticleListView from '../views/articles/'
import ArticleCreateView from '../views/articles/create'
import ArticleReadView from '../views/articles/read'

Vue.use(VueRouter)

const requireAuth = () => (to, from, next) => {
  /**
   * 1. login으로 이동시,
   * 1.1 토큰이 있는 경우,
   * - 토큰이 유효한 경우 : next('/dashboard')
   * - 유효하지 않은 경우 : 토큰정보 삭제 후 로그인 페이지로 이동
   * 1.2 토큰이 없는 경우,
   * - 로그인 페이지로 이동
   * 2. 그외 페이지 접근 시
   * 2.1 토큰이 있는 경우,
   * - 토큰이 유효한 경우 : next()
   * - 토큰이 유효하지 않은 경우 : 토큰정보 삭제 후 로그인 페이지로 이동
   * 2.2 토큰이 없는 경우,
   * - 로그인 페이지로 이동
   */
  if( to.name == 'login' ){
    if( store.getters.getUserInfo.access_token == undefined || store.getters.getUserInfo.access_token == '' ) {
      return next()
    } else {
      const jwtPayload = VueJwtDecode.decode( store.getters.getUserInfo.access_token )
      const remainingTime = jwtRemainingTime(jwtPayload.exp)
      if( remainingTime < 1 ) {
        store.commit('SET_USERINFO', '')
        localStorage.removeItem('userInfo')
        return next()
      } else {
        return next('/dashboard')
      }
    }
  } else {
    if( store.getters.getUserInfo.access_token == undefined || store.getters.getUserInfo.access_token == '' ) {
      return next('/login')
    } else {
      const jwtPayload = VueJwtDecode.decode( store.getters.getUserInfo.access_token )
      const remainingTime = jwtRemainingTime(jwtPayload.exp)
      if( remainingTime < 1 ) {
        store.commit('SET_USERINFO', '')
        localStorage.removeItem('userInfo')
        return next('/login')
      } else {
        return next()
      }
    }
  }
  
}

const routes = [
  {
    path: '/',
    name: 'default',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      layout: 'BlankLayout'
    },
    component: LoginView,
    beforeEnter: requireAuth()
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
    path: '/users',
    name: 'userList',
    meta: {
      layout: 'adminLayout',
      pageLoader: true
    },
    component: UserListView,
    beforeEnter: requireAuth()
  },
  {
    path: '/users/create',
    name: 'userCreate',
    meta: {
      layout: 'adminLayout'
    },
    component: UserCreateView,
    beforeEnter: requireAuth()
  },
  {
    path: '/users/:user_seq',
    name: 'userRead',
    meta: {
      layout: 'adminLayout'
    },
    component: UserReadView,
    beforeEnter: requireAuth()
  },
  {
    path: '/users/update/:user_seq',
    name: 'userUpdate',
    meta: {
      layout: 'adminLayout'
    },
    component: UserUpdateView,
    beforeEnter: requireAuth()
  },
  {
    path: '/articles',
    name: 'articleList',
    meta: {
      layout: 'adminLayout',
      pageLoader: true
    },
    component: ArticleListView,
    beforeEnter: requireAuth()
  },
  {
    path: '/articles/create',
    name: 'articleCreate',
    meta: {
      layout: 'adminLayout'
    },
    component: ArticleCreateView,
    beforeEnter: requireAuth()
  },
  {
    path: '/articles/:article_seq',
    name: 'articleRead',
    meta: {
      layout: 'adminLayout'
    },
    component: ArticleReadView,
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
