import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }, // Página inicial
      { path: 'register', component: () => import('pages/RegisterScreen.vue') }, // Rota para a tela de cadastro
    ],
  },

  // Rota para página não encontrada
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
