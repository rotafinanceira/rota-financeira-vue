import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    redirect: '/welcome',
    children: [
      {
        path: '/splash',
        component: () => import('src/pages/SplashScreen.vue'),
      },
      {
        path: 'welcome',
        name: 'welcome',
        component: () => import('src/pages/WelcomePage.vue'),
      },
      {
        path: 'terms-and-privacy',
        name: 'terms-and-privacy',
        component: () => import('@/pages/TermsAndPrivacyPage.vue'),
      },
      {
        path: 'auth',
        component: () => import('src/layouts/AuthLayout.vue'),
        // redirect: { name: 'signin' },
        children: [
          {
            path: 'signin',
            name: 'signin',
            component: () => import('src/pages/Auth/SignInPage.vue'),
          },
          {
            path: 'google-callback',
            name: 'google-callback',
            component: () => import('src/pages/Auth/GoogleCallbackPage.vue'),
          },
          {
            path: 'signup',
            name: 'signup',
            redirect: '/auth/signup/step-1',
            children: [
              {
                path: 'step-1',
                name: 'signup-step-1',
                component: () => import('src/pages/Auth/SignUpStep1.vue'),
              },
              {
                path: 'step-2',
                name: 'signup-step-2',
                component: () => import('src/pages/Auth/SignUpStep2.vue'),
              },
              {
                path: 'step-3',
                name: 'signup-step-3',
                component: () => import('src/pages/Auth/SignUpStep3.vue'),
              },
            ],
          },
        ],
      },
      {
        path: '/app',
        component: () => import('src/layouts/AppLayout.vue'),
        children: [
          {
            path: 'home',
            name: 'home',
            component: () => import('@/pages/Home/HomePage.vue'),
          },
          {
            path: 'maintenances',
            meta: {
              title: 'Manutenções',
            },
            children: [
              {
                path: '',
                name: 'maintenances',
                component: () =>
                  import('@/pages/Maintenances/MaintenancesPage.vue'),
                meta: {
                  title: undefined,
                },
              },
              {
                path: 'oil',
                name: 'maintenance-oil',
                component: () =>
                  import(
                    '@/pages/Maintenances/Maintenance/OilPage/OilPage.vue'
                  ),
              },
              {
                path: 'oil/form',
                name: 'maintenance-oil-form',
                component: () =>
                  import(
                    '@/pages/Maintenances/Maintenance/OilPage/OilPageForm.vue'
                  ),
              },
              {
                path: 'oil/form/:maintenanceId?',
                name: 'maintenance-oil-form',
                component: () =>
                  import(
                    '@/pages/Maintenances/Maintenance/OilPage/OilPageForm.vue'
                  ),
              },
              {
                path: 'battery',
                name: 'maintenance-battery',
                component: () =>
                  import(
                    '@/pages/Maintenances/Maintenance/BatteryPage/BatteryPage.vue'
                  ),
              },
              {
                path: 'battery/form',
                name: 'maintenance-battery-form',
                component: () =>
                  import(
                    '@/pages/Maintenances/Maintenance/BatteryPage/BatteryPageForm.vue'
                  ),
              },
              {
                path: 'battery/form/:maintenanceId?',
                name: 'maintenance-battery-form',
                component: () =>
                  import(
                    '@/pages/Maintenances/Maintenance/BatteryPage/BatteryPageForm.vue'
                  ),
              },
              {
                path: 'fuel-filter',
                name: 'maintenance-fuel-filter',
                component: () =>
                  import(
                    '@/pages/Maintenances/Maintenance/FuelFilterPage/FuelFilterPage.vue'
                  ),
              },
              {
                path: 'fuel-filter/form',
                name: 'maintenance-fuel-filter-form',
                component: () =>
                  import(
                    '@/pages/Maintenances/Maintenance/FuelFilterPage/FuelFilterPageForm.vue'
                  ),
              },
              {
                path: 'fuel-filter/form/:maintenanceId?',
                name: 'maintenance-fuel-filter-form',
                component: () =>
                  import(
                    '@/pages/Maintenances/Maintenance/FuelFilterPage/FuelFilterPageForm.vue'
                  ),
              },
              {
                path: 'alignment-balancing',
                name: 'maintenance-alignment-balancing',
                component: () =>
                  import(
                    '@/pages/Maintenances/Maintenance/AlignmentBalancingPage.vue'
                  ),
              },
              {
                path: 'air-filter',
                name: 'maintenance-air-filter',
                component: () =>
                  import('@/pages/Maintenances/Maintenance/AirFilterPage.vue'),
              },
            ],
          },
          {
            path: 'history',
            name: 'history',
            component: () => import('@/pages/History/HistoryPage.vue'),
          },
          {
            path: 'finances',
            meta: {
              title: 'Finanças',
            },
            children: [
              {
                path: '',
                name: 'finances',
                component: () => import('@/pages/Finances/FinancesPage.vue'),
                meta: {
                  title: undefined,
                },
              },
              {
                path: 'store-money',
                name: 'finances-store-money',
                component: () =>
                  import('@/pages/Finances/components/StoreMoney.vue'),
              },
              {
                path: 'edit-value',
                name: 'finances-edit-value',
                component: () =>
                  import('@/pages/Finances/components/EditValue.vue'),
              },
            ],
          },
          {
            path: 'user',
            name: 'user',
            component: () => import('@/layouts/UserLayout.vue'),
            redirect: { name: 'user-profile' },
            children: [
              {
                path: 'profile',
                children: [
                  {
                    path: '',
                    name: 'user-profile',
                    component: () =>
                      import('@/pages/Profile/MyProfile/MyProfilePage.vue'),
                  },
                  {
                    path: 'edit',
                    meta: {
                      title: 'Editar perfil',
                    },
                    children: [
                      {
                        path: '',
                        name: 'user-profile-edit',
                        component: () =>
                          import(
                            '@/pages/Profile/MyProfile/EditProfilePage.vue'
                          ),
                      },
                      {
                        path: 'name',
                        name: 'user-profile-edit-name',
                        component: () =>
                          import('@/pages/Profile/MyProfile/Edit/NamePage.vue'),
                      },
                      {
                        path: 'birthdate',
                        name: 'user-profile-edit-birthdate',
                        component: () =>
                          import(
                            '@/pages/Profile/MyProfile/Edit/BirthdatePage.vue'
                          ),
                      },
                      {
                        path: 'email',
                        name: 'user-profile-edit-email',
                        component: () =>
                          import(
                            '@/pages/Profile/MyProfile/Edit/EmailPage.vue'
                          ),
                      },
                      {
                        path: 'password',
                        name: 'user-profile-edit-password',
                        component: () =>
                          import(
                            '@/pages/Profile/MyProfile/Edit/PasswordPage.vue'
                          ),
                      },
                    ],
                  },
                ],
              },
              {
                path: 'vehicle',
                children: [
                  {
                    path: '',
                    name: 'user-vehicle',
                    component: () =>
                      import('@/pages/Profile/MyVehicle/MyVehiclePage.vue'),
                  },
                  {
                    path: 'edit',
                    meta: {
                      title: 'Editar veículo',
                    },
                    children: [
                      {
                        path: '',
                        name: 'user-vehicle-edit',
                        component: () =>
                          import(
                            '@/pages/Profile/MyVehicle/EditVehiclePage.vue'
                          ),
                      },
                      {
                        path: 'model',
                        name: 'user-vehicle-edit-model',
                        component: () =>
                          import(
                            '@/pages/Profile/MyVehicle/Edit/ModelPage.vue'
                          ),
                      },
                      {
                        path: 'brand',
                        name: 'user-vehicle-edit-brand',
                        component: () =>
                          import(
                            '@/pages/Profile/MyVehicle/Edit/BrandPage.vue'
                          ),
                      },
                      {
                        path: 'year',
                        name: 'user-vehicle-edit-year',
                        component: () =>
                          import('@/pages/Profile/MyVehicle/Edit/YearPage.vue'),
                      },
                      {
                        path: 'plate',
                        name: 'user-vehicle-edit-plate',
                        component: () =>
                          import(
                            '@/pages/Profile/MyVehicle/Edit/PlatePage.vue'
                          ),
                      },
                      {
                        path: 'color',
                        name: 'user-vehicle-edit-color',
                        component: () =>
                          import(
                            '@/pages/Profile/MyVehicle/Edit/ColorPage.vue'
                          ),
                      },
                    ],
                  },
                  {
                    path: 'register',
                    name: 'user-vehicle-register',
                    meta: {
                      title: 'Cadastrar veículo',
                    },
                    component: () => import('@/pages/Vehicle/RegisterPage.vue'),
                  },
                ],
              },
            ],
          },
          {
            path: 'notifications',
            name: 'notifications',
            meta: {
              title: 'Notificações',
            },
            component: () =>
              import('@/pages/Notifications/NotificationPage.vue'),
          },
          {
            path: '/lab',
            component: () => import('@/pages/LabPage.vue'),
          },
          {
            path: '/:catchAll(.*)*',
            name: 'not-found',
            component: () => import('pages/NotFound.vue'),
          },
        ],
      },
    ],
  },
];

export default routes;
