export type HistoryCardProps = {
  id: string;
  month: string;
  date: string;
  km: string;
  maintenances: {
    icon: 'oil' | 'airFilter' | 'wheel' | 'battery' | 'fuelFilter';
    title: string;
    description: string;
  }[];
};
