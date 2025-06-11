import maintenanceIcons from '@/assets/maintenance';
import { MaintenanceData } from './components/StatusTag.vue';

export type MaintenanceCardProps = {
  title: string;
  icon: keyof typeof maintenanceIcons;
  maintenanceData?: MaintenanceData;
};

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
