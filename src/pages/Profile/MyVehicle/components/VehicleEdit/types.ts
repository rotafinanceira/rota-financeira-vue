import { MaintenanceIcons } from '@/shared/types/maintenance';

export type MaintenanceItemProps = {
  icon: keyof MaintenanceIcons;
  title: string;
};
