export const formatCurrency = (
  value: string | number | null | undefined
): string => {
  if (value === null || value === undefined || value === '') return 'R$ 0,00';

  let digits = String(value).replace(/\D/g, '');
  digits = digits.replace(/^0+/, '');

  if (digits.length === 0) digits = '000';
  if (digits.length === 1) digits = '00' + digits;
  if (digits.length === 2) digits = digits;

  const cents = digits.slice(-2);
  let reais = digits.slice(0, -2);
  if (!reais) reais = '0';

  reais = reais.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return `R$ ${reais},${cents}`;
};

export const parseCurrencyToFloat = (value: string): number => {
  if (!value) return 0;
  const numeric = value.replace(/[R$\.\s]/g, '').replace(',', '.');
  return parseFloat(numeric) || 0;
};
