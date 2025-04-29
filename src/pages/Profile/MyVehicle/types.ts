export type Vehicle = {
  model: string;
  plate: string;
  year: number;
  color: string;
  photo: string;
}

export type Maintenance = {
  id: number;
  description: string;
  date: string;
  cost: number;
}

export type vehicleEditRoutes = {
  path: string;
  title: string;
}
