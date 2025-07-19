export type Tab = {
  name: string;
  routeName: string;
  icon: {
    enabled: string;
    disabled: string;
  };
  label: string;
  notification?: number;
};
