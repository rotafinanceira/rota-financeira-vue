export type Notification = {
  id?: number;
  message: string;
  icon: 'battery' | 'oil' | 'wheel';
  status: 'info' | 'warning' | 'danger';
};
