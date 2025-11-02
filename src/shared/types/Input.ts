import { InputHTMLAttributes } from 'vue';

export type Input = {
  modelValue: string | number;
  label?: string;
  name: string;
  placeholder?: string;
  icon?: string;
  showIcon?: 'always' | 'not-empty';
  disabled?: boolean;
  supportingText?: string;
  action?: () => void;
  variant: 'generic' | 'password' | 'date' | 'money' | 'unit';
  required?: boolean;
} & /* @vue-ignore */ InputHTMLAttributes;
