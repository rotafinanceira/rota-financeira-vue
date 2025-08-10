export const ROUTES = {
  // Public
  ROOT: '/',
  SIGNIN: '/signin',
  SIGNUP_OPTIONS: '/signup-options',
  LOGIN_SUCCESS: '/success',

  // Registration
  REGISTER: {
    ROOT: '/register',
    STEP_1: '/register/step-1',
    STEP_2: '/register/step-2',
    STEP_3: '/register/step-3',
  },

  // Private
  // Main pages
  HOME: '/home',

  MAINTENANCE: {
    ROOT: '/maintenance',
    OIL: '/maintenance/oil',
    BATTERY: '/maintenance/battery',
    FUEL_FILTER: '/maintenance/fuel-filter',
    ALIGNMENT_BALANCING: '/maintenance/alignment-balancing',
    AIR_FILTER: '/maintenance/air-filter',
  },

  HISTORY: '/history',
  FINANCES: {
    ROOT: '/finances',
    STORE_MONEY: '/finances/store-money',
    EDIT_VALUE: '/finances/edit-value',
  },

  // Independent routes
  USER: {
    ROOT: '/user',
    PROFILE: {
      ROOT: '/user/profile',
      EDIT_NAME: '/user/profile/edit-name',
      EDIT_BIRTHDATE: '/user/profile/edit-birthdate',
      EDIT_EMAIL: '/user/profile/edit-email',
      EDIT_PASSWORD: '/user/profile/edit-password',
      TERMS_AND_PRIVACY: '/user/profile/terms-and-privacy',
    },
    VEHICLE: {
      ROOT: '/user/vehicle',
      EDIT_MODEL: '/user/vehicle/edit-model',
      EDIT_BRAND: '/user/vehicle/edit-brand',
      EDIT_YEAR: '/user/vehicle/edit-year',
      EDIT_PLATE: '/user/vehicle/edit-plate',
      EDIT_COLOR: '/user/vehicle/edit-color',
      REGISTRATION: '/user/vehicle/registration',
    },
  },

  NOTIFICATIONS: '/notifications',
};
