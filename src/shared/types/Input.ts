import { InputHTMLAttributes } from 'vue';

export type Input = {
  label?: string;
  placeholder?: string;
  icon?: string;
  showIcon?: 'always' | 'not-empty';
  disabled?: boolean;
  supportingText?: string;
  action?: () => void;
} & /* @vue-ignore */  InputHTMLAttributes;
