import { Pinia } from 'pinia';
import { RouteRecordRaw } from 'vue-router';

export default function (store: Pinia) {
  if (process.env.CLIENT && process.env.DEV) {
    console.log(store)
  }
  const routes: RouteRecordRaw[] = [
    {
      path: '/',
      component: () => import('layouts/MainLayout.vue'),
      children: [{ path: '', component: () => import('pages/Index.vue') }],
    },
  
    // Always leave this as last one,
    // but you can also remove it
    {
      path: '/:catchAll(.*)*',
      component: () => import('pages/Error404.vue'),
    },
  ];
  
  return routes;
}

