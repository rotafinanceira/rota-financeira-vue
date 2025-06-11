export type Tab = {
  name: string;
  path: string;
  icon: {
    enabled: string;
    disabled: string;
  };
  label: string;
  notification?: number;
};
