import { RouteRecordRaw } from 'vue-router';

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
        path: '/',
        component: () => import('src/layouts/AppLayout.vue'),
        children: [
          {
            path: 'home',
            component: () => import('@/pages/Home/HomePage.vue'),
          },
          {
            path: 'maintenance',
            component: () => import('@/pages/Maintenance/MaintenancePage.vue'),
          },
          {
            path: 'history',
            component: () => import('@/pages/MaintenanceHistory.vue'),
          },
          {
            path: 'profile',
            component: () => import('@/pages/Profile/ProfilePage.vue'),
          },
          {
            path: 'profile/edit-name',
            component: () =>
              import('@/pages/Profile/MyProfile/components/EditName.vue'),
          },
          {
            path: 'profile/edit-birthdate',
            component: () =>
              import('@/pages/Profile/MyProfile/components/EditBirthdate.vue'),
          },
          {
            path: 'profile/edit-email',
            component: () =>
              import('@/pages/Profile/MyProfile/components/EditEmail.vue'),
          },
          {
            path: 'profile/edit-password',
            component: () =>
              import('@/pages/Profile/MyProfile/components/EditPassword.vue'),
          },
          {
            path: 'profile/terms-and-privacy',
            component: () =>
              import(
                '@/pages/Profile/MyProfile/components/TermsAndPrivacy.vue'
              ),
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
              import(
                '@/pages/RegistrationMaintenance/FuelFilterMaintenance.vue'
              ),
          },
          {
            path: 'alignment-balancing',
            component: () =>
              import('@/pages/RegistrationMaintenance/AlignmentBalancing.vue'),
          },
          {
            path: 'air-conditioner-filter-maintenance',
            component: () =>
              import(
                '@/pages/RegistrationMaintenance/AirConditioningFilter.vue'
              ),
          },
          {
            path: 'registration-vehicle',
            component: () => import('@/pages/Vehicle/RegistrationVehicle.vue'),
          },
          {
            path: 'profile/edit-model',
            component: () =>
              import(
                '@/pages/Profile/MyVehicle/components/VehicleEdit/components/EditModel.vue'
              ),
          },
          {
            path: 'profile/edit-brand',
            component: () =>
              import(
                '@/pages/Profile/MyVehicle/components/VehicleEdit/components/EditBrand.vue'
              ),
          },
          {
            path: 'profile/edit-year',
            component: () =>
              import(
                '@/pages/Profile/MyVehicle/components/VehicleEdit/components/EditYear.vue'
              ),
          },
          {
            path: 'profile/edit-plate',
            component: () =>
              import(
                '@/pages/Profile/MyVehicle/components/VehicleEdit/components/EditPlate.vue'
              ),
          },
          {
            path: 'profile/edit-color',
            component: () =>
              import(
                '@/pages/Profile/MyVehicle/components/VehicleEdit/components/EditColor.vue'
              ),
          },
          {
            path: 'notifications',
            component: () =>
              import('@/pages/Notifications/NotificationPage.vue'),
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
