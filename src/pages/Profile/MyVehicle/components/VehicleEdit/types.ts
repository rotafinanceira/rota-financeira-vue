import type maintenanceIcons from '@/assets/maintenance';

export type MaintenanceItemProps = {
  icon: keyof typeof maintenanceIcons;
  title: string;
};
