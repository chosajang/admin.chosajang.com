import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import bus from '../utils/bus'
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
  if( to.meta.pageLoader ){
    bus.$emit('start:spinner')
  }
  if( store.getters.getUserInfo.access_token == undefined ) {
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
    component: LoginView
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
