import { InputHTMLAttributes } from 'vue';

export type Input = {
  label?: string;
  name: string;
  placeholder?: string;
  icon?: string;
  showIcon?: 'always' | 'not-empty';
  disabled?: boolean;
  supportingText?: string;
  action?: () => void;
  variant: 'generic' | 'password'
} & /* @vue-ignore */ InputHTMLAttributes;
