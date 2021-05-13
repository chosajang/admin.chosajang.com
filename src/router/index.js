import Vue from 'vue'
import VueRouter from 'vue-router'

import LoginView from '../views/login/index.vue'
import DashboardView from '../views/dashboard/'
import CompanyListView from '../views/company/'
import CompanyView from '../views/company/view'
import CompanyCreateView from '../views/company/create'

Vue.use(VueRouter);

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
      layout: 'AdminLayout'
    },
    component: DashboardView,
  },
  {
    path: '/company',
    name: 'companyList',
    props: true,
    meta: {
      layout: 'AdminLayout'
    },
    component: CompanyListView
  },
  {
    path: '/company/view/:seq',
    name: 'companyView',
    props: true,
    meta: {
      layout: 'AdminLayout'
    },
    component: CompanyView
  },
  {
    path: '/company/create',
    name: 'companyCreate',
    props: true,
    meta: {
      layout: 'AdminLayout'
    },
    component: CompanyCreateView
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
