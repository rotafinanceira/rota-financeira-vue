export const formatInput = (
  value: string | number | null | undefined,
  type: 'money' | 'unit' = 'money'
): string => {
  if (value === null || value === undefined || value === '') {
    return type === 'money' ? 'R$ 0,00' : '0';
  }

  let digits = String(value).replace(/\D/g, '');
  digits = digits.replace(/^0+/, '');

  if (type === 'money') {
    if (digits.length === 0) digits = '000';
    if (digits.length === 1) digits = '00' + digits;
    if (digits.length === 2) digits = digits;

    const cents = digits.slice(-2);
    let reais = digits.slice(0, -2);
    if (!reais) reais = '0';
    reais = reais.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return `R$ ${reais},${cents}`;
  } else {
    if (digits.length === 0) digits = '0';
    const formatted = digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return formatted;
  }
};

export const parseInputToNumber = (
  value: string,
  type: 'money' | 'unit' = 'money'
): number => {
  if (!value) return 0;

  if (type === 'money') {
    const numeric = value.replace(/[R$\.\s]/g, '').replace(',', '.');
    return parseFloat(numeric) || 0;
  } else {
    const numeric = value.replace(/\./g, '');
    return parseInt(numeric) || 0;
  }
};
