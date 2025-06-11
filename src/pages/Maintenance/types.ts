export type MaintenanceTypes =
  | 'engine'
  | 'battery'
  | 'oil'
  | 'air filter'
  | 'wheel'
  | 'alignment and balancing'
  | 'fuel levels'
  | 'fluid levels';

export type MaintenanceStatus = 'unregistered' | 'pending' | 'expired';
