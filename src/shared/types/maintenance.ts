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
};
