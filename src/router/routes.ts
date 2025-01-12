import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/SignIn.vue') },
      {
        path: 'success',
        component: () => import('src/pages/LoginSuccess.vue'),
      },
      {
        path: 'register-1',
        component: () => import('src/pages/SignUp/SignUpStep1.vue'),
      },
      {
        path: 'register-2',
        component: () => import('src/pages/SignUp/SignUpStep2.vue'),
      },
      {
        path: 'register-3',
        component: () => import('src/pages/SignUp/SignUpStep3.vue'),
      },
      {
        path: 'oil-maintenance',
        component: () =>
          import('@/pages/RegistrationMaintenance/OilMaintenance.vue'),
      },
      {
        path: 'battery-maintenance',
        component: () =>
          import('@/pages/RegistrationMaintenance/BatteryMaintenance.vue'),
      },
      {
        path: 'fuel-filter-maintenance',
        component: () =>
          import('@/pages/RegistrationMaintenance/FuelFilterMaintenance.vue'),
      },
      {
        path: 'alignment-balancing',
        component: () =>
          import('@/pages/RegistrationMaintenance/AlignmentBalancing.vue'),
      },
      {
        path: 'air-conditioner-filter-maintenance',
        component: () =>
          import('@/pages/RegistrationMaintenance/AirConditioningFilter.vue'),
      },
      {
        path: 'registration-vehicle',
        component: () => import('@/pages/Vehicle/RegistrationVehicle.vue'),
      },
      {
        path: 'test-layout',
        component: () => import('src/pages/TestLayoutPage.vue'),
      },
      {
        path: 'maintenance-history',
        component: () => import('@/pages/MaintenanceHistory.vue'),
      },
      {
        path: 'profile',
        component: () => import('@/pages/Profile/ProfilePage.vue'),
      },
      {
        path: 'home',
        component: () => import('@/pages/Home/HomePage.vue'),
      }
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
