export type MaintenanceIcons = {
  wheel: string;
  oil: string;
  battery: string;
  engine: string;
  fuelFilter: string;
  airFilter: string;
  fluidLevel: string;
};

export type MaintenanceItemProps = {
  icon: keyof MaintenanceIcons;
  title: string;
  description?: string;
  hasArrow?: boolean;
};

export type MaintenanceHistoryItem = {
  type:
    | 'Oil Change'
    | 'Battery Change'
    | 'Air Filter Change'
    | 'Wheel Change'
    | 'Oil Filter Change'
    | 'Fuel Filter Change';
  data: {
    id: string;
    lastMaintenanceDate?: string;
    lastMaintenanceKm?: number;
    valor?: string;
    batteryBrand?: string;
    oilType?: string;
    status?: string;
  };
};
