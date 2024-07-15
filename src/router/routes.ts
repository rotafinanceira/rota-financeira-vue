import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/SignIn.vue') }, // Página inicial
      {
        path: 'success',
        component: () => import('src/pages/LoginSuccess.vue'),
      }, // Rota para a tela de sucesso
      {
        path: 'register-1',
        component: () => import('src/pages/SignUp/SignUpStep1.vue'),
      }, // Rota para a tela de cadastro
      {
        path: 'register-2',
        component: () => import('src/pages/SignUp/SignUpStep2.vue'),
      }, // Rota para a tela de informações pessoais
      {
        path: 'register-3',
        component: () => import('src/pages/SignUp/SignUpStep3.vue'),
      }, // Rota para a tela de senha
      { path: 'test', component: () => import('src/pages/TestPage.vue') }, // Rota de teste
    ],
  },

  // Rota para página não encontrada
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
