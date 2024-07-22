import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/SignIn.vue'), name: 'SignIn' },
      {
        path: 'success',
        component: () => import('src/pages/LoginSuccess.vue'),
        name: 'LoginSuccess',
      },
      {
        path: 'register',
        component: () => import('src/pages/SignUp/SignUpStepper.vue'),
        name: 'SignUpStepper',
        children: [

          {
            path: 'step1',
            component: () => import('src/pages/SignUp/SignUpStep1.vue'),
            name: 'SignUpStep1',
          },
          {
            path: 'step2',
            component: () => import('src/pages/SignUp/SignUpStep2.vue'),
            name: 'SignUpStep2',
          },
          {
            path: 'step3',
            component: () => import('src/pages/SignUp/SignUpStep3.vue'),
            name: 'SignUpStep3',
          },
        ],
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
    name: 'ErrorNotFound',
  },
];

export default routes;
