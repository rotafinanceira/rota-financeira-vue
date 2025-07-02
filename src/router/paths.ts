// src/router/paths.ts

export const ROUTES = {
  ROOT: '/',
  SIGN_IN: '/signin',
  SIGN_UP_OPTIONS: '/signup-options',
  LOGIN_SUCCESS: '/success',

  REGISTER: {
    ROOT: '/register',
    STEP_1: '/register/step-1',
    STEP_2: '/register/step-2',
    STEP_3: '/register/step-3',
  },

  HOME: '/home',

  NOTIFICATIONS: '/notifications',

  MAINTENANCE: {
    ROOT: '/maintenance',
    OIL: '/maintenance/oil',
    BATTERY: '/maintenance/battery',
    FUEL_FILTER: '/maintenance/fuel-filter',
    ALIGNMENT_BALANCING: '/maintenance/alignment-balancing',
    AIR_FILTER: '/maintenance/air-filter',
  },

  HISTORY: '/history',

  USER: {
    ROOT: 'user',
    PROFILE: {
      ROOT: 'profile',
      EDIT_NAME: 'edit-name',
      EDIT_BIRTHDATE: 'edit-birthdate',
      EDIT_EMAIL: 'edit-email',
      EDIT_PASSWORD: 'edit-password',
      TERMS_PRIVACY: 'terms-and-privacy',
    },
    VEHICLE: {
      ROOT: 'vehicle',
      EDIT_MODEL: 'edit-model',
      EDIT_BRAND: 'edit-brand',
      EDIT_YEAR: 'edit-year',
      EDIT_PLATE: 'edit-plate',
      EDIT_COLOR: 'edit-color',
    },
  },

  REGISTRATION_VEHICLE: '/registration-vehicle',

  FINANCES: {
    ROOT: 'finances',
    STORE_MONEY: 'store-money',
    EDIT_VALUE: 'edit-value',
  },
};
