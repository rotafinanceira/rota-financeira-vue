import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/SignIn.vue') }, // Página inicial
      { path: 'register', component: () => import('src/pages/SignUp.vue') }, // Rota para a tela de cadastro
      { path: 'success', component: () => import('src/pages/LoginSuccess.vue') }, // Rota para a tela de sucesso
      { path: 'personal-info', component: () => import('src/components/PersonalInformationStep.vue') }, // Rota para a tela de informações pessoais
      { path: 'password-step', component: () => import('src/components/PasswordStep.vue') }, // Rota para a tela de senha
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
