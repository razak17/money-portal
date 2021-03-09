export const getRound = (value: number, decimals: number = 2) => {
  if (value === 0) {
    return "0.00";
  }
  if (value) {
    return Number(
      Math.round(parseFloat(value + "e" + decimals)) + "e-" + decimals
    ).toFixed(2);
  }
  return "0";
};
