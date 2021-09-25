export const formatter = {
  currency(number) {
    if (typeof number !== 'number') throw Error(`${number} is not Number`);
    number = Math.round(number);
    return new Intl.NumberFormat('ko-KR', { currency: 'KRW' }).format(number);
  },
};
