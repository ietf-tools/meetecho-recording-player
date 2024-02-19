export const getNumber = (val) => {
  if (Number.isNaN(val)) {
    return 0;
  }
  return val;
};

export const calculatePercentage = (partialValue, totalValue) => {
  // https://stackoverflow.com/questions/7540397/convert-nan-to-0-in-javascript
  let percentage = getNumber(partialValue / totalValue) * 100;

  // Round to 2 Decimals
  // https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary
  return Math.round(percentage);
};
