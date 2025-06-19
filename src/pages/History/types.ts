import { MaintenanceItemProps } from '@/shared/types/maintenance';

export type HistoryCardProps = {
  id?: string;
  month: string;
  date: string;
  km: string;
  maintenances: MaintenanceItemProps[]
};
