export const formatCurrency = (number: number) => {
  if (number) {
    return `Rp ${number.toLocaleString('id', {maximumFractionDigits: 2})}`;
  }
};
