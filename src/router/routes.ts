import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/SignIn.vue') }, // Página inicial
      { path: 'register', component: () => import('src/pages/SignUp.vue') }, // Rota para a tela de cadastro
    ],
  },

  // Rota para página não encontrada
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
