import Vue from 'vue';
import VueRouter from 'vue-router';

import Runs from '../views/Runs.vue';
import Run from '../views/Run.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/runs',
  },
  {
    path: '/runs',
    name: 'Runs',
    component: Runs,
  },
  {
    path: '/runs/:runId',
    name: 'Run',
    component: Run,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
