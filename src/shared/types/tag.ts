export type Tag = {
  id?: number;
  variant?: 'default' | 'outline' | 'error' | 'alert';
  icon?: string;
  title: string;
};

export type TagProps = Tag & {
  removable?: boolean;
};
