import { h } from 'vue';
import { RouteRecordRaw, RouterView } from 'vue-router';
import { ROUTES } from './paths';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/IntroductionApp.vue') },
      {
        path: 'signin',
        component: () => import('src/pages/SignIn.vue'),
      },
      {
        path: 'signup-options',
        component: () => import('src/pages/SignUpOptions.vue'),
      },
      {
        path: 'success',
        component: () => import('src/pages/LoginSuccess.vue'),
      },
      {
        path: 'register',
        component: { render: () => h(RouterView) },
        children: [
          {
            path: '',
            redirect: '/register/step-1',
          },
          {
            path: 'step-1',
            component: () => import('src/pages/SignUp/SignUpStep1.vue'),
          },
          {
            path: 'step-2',
            component: () => import('src/pages/SignUp/SignUpStep2.vue'),
          },
          {
            path: 'step-3',
            component: () => import('src/pages/SignUp/SignUpStep3.vue'),
          },
        ],
      },
      {
        path: '',
        component: () => import('src/layouts/AppLayout.vue'),
        children: [
          {
            path: 'notifications',
            meta: {
              title: 'Notificações',
            },
            component: () =>
              import('@/pages/Notifications/NotificationPage.vue'),
          },

          {
            path: 'home',
            component: () => import('@/pages/Home/HomePage.vue'),
          },
          {
            path: 'maintenance',
            component: { render: () => h(RouterView) },
            meta: {
              title: 'Manutenções',
            },
            children: [
              {
                path: '',
                component: () =>
                  import('@/pages/Maintenance/MaintenancePage.vue'),
                meta: {
                  title: undefined,
                },
              },
              {
                path: 'oil',
                component: () =>
                  import('@/pages/RegistrationMaintenance/OilMaintenance.vue'),
              },
              {
                path: 'battery',
                component: () =>
                  import(
                    '@/pages/RegistrationMaintenance/BatteryMaintenance.vue'
                  ),
              },
              {
                path: 'fuel-filter',
                component: () =>
                  import(
                    '@/pages/RegistrationMaintenance/FuelFilterMaintenance.vue'
                  ),
              },
              {
                path: 'alignment-balancing',
                component: () =>
                  import(
                    '@/pages/RegistrationMaintenance/AlignmentBalancing.vue'
                  ),
              },
              {
                path: 'air-filter',
                component: () =>
                  import(
                    '@/pages/RegistrationMaintenance/AirConditioningFilter.vue'
                  ),
              },
            ],
          },
          {
            path: 'registration-vehicle',
            component: () => import('@/pages/Vehicle/RegistrationVehicle.vue'),
          },
          {
            path: 'history',
            component: () => import('@/pages/MaintenanceHistory.vue'),
          },
          {
            path: 'profile',
            component: { render: () => h(RouterView) },
            children: [
              {
                path: '',
                component: () => import('@/pages/Profile/ProfilePage.vue'),
              },
              {
                path: 'edit-name',
                component: () =>
                  import('@/pages/Profile/MyProfile/components/EditName.vue'),
              },
              {
                path: 'edit-birthdate',
                component: () =>
                  import(
                    '@/pages/Profile/MyProfile/components/EditBirthdate.vue'
                  ),
              },
              {
                path: 'edit-email',
                component: () =>
                  import('@/pages/Profile/MyProfile/components/EditEmail.vue'),
              },
              {
                path: 'edit-password',
                component: () =>
                  import(
                    '@/pages/Profile/MyProfile/components/EditPassword.vue'
                  ),
              },
              {
                path: 'terms-and-privacy',
                component: () =>
                  import(
                    '@/pages/Profile/MyProfile/components/TermsAndPrivacy.vue'
                  ),
              },
              {
                path: 'edit-model',
                component: () =>
                  import(
                    '@/pages/Profile/MyVehicle/components/VehicleEdit/components/EditModel.vue'
                  ),
              },
              {
                path: 'edit-brand',
                component: () =>
                  import(
                    '@/pages/Profile/MyVehicle/components/VehicleEdit/components/EditBrand.vue'
                  ),
              },
              {
                path: 'edit-year',
                component: () =>
                  import(
                    '@/pages/Profile/MyVehicle/components/VehicleEdit/components/EditYear.vue'
                  ),
              },
              {
                path: 'edit-plate',
                component: () =>
                  import(
                    '@/pages/Profile/MyVehicle/components/VehicleEdit/components/EditPlate.vue'
                  ),
              },
              {
                path: 'edit-color',
                component: () =>
                  import(
                    '@/pages/Profile/MyVehicle/components/VehicleEdit/components/EditColor.vue'
                  ),
              },
            ],
          },
          {
            path: ROUTES.FINANCES.ROOT,
            component: { render: () => h(RouterView) },
            meta: {
              title: 'Finanças',
            },
            children: [
              {
                path: '',
                component: () => import('@/pages/Finances/FinancesPage.vue'),
                meta: {
                  title: undefined,
                },
              },
              {
                path: ROUTES.FINANCES.STORE_MONEY,
                component: () =>
                  import('@/pages/Finances/components/StoreMoney.vue'),
              },
              {
                path: 'edit-value',
                component: () =>
                  import('@/pages/Finances/components/EditValue.vue'),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
