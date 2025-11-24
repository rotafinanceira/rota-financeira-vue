export const formatInput = (
  value: string | number | null | undefined,
  type: 'money' | 'unit' = 'money'
): string => {
  if (value === null || value === undefined || value === '') {
    return type === 'money' ? 'R$ 0,00' : '0';
  }

  if (type === 'money' && typeof value === 'number') {
    const fixed = value.toFixed(2);
    const [reais, cents] = fixed.split('.');
    const reaisFormatted = reais.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `R$ ${reaisFormatted},${cents}`;
  }

  let digits = String(value).replace(/\D/g, '');

  if (type === 'unit') {
    digits = digits.replace(/^0+/, '');
  }

  if (type === 'money') {
    if (digits.length === 0) digits = '000';
    if (digits.length === 1) digits = '00' + digits;
    if (digits.length === 2) digits = '0' + digits;

    const cents = digits.slice(-2);
    let reais = digits.slice(0, -2);

    if (!reais) reais = '0';

    reais = reais.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return `R$ ${reais},${cents}`;
  }

  if (digits.length === 0) digits = '0';
  const formatted = digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return formatted;
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

export const parsePlateToString = (value: string): string => {
  if (!value) return '';
  return value.replace(/[^A-Z0-9]/gi, '').toUpperCase();
};
