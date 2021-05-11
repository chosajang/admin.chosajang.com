import Vue from 'vue'
import VueRouter from 'vue-router'

import DashboardView from '../views/dashboard'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'default',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: {
      layout: 'AdminLayout'
    },
    component: DashboardView,
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
