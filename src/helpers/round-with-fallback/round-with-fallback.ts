export const roundWithFallback = (value: string): [string, string] => {
  return [value, `round(to-zero, ${value}, 1px)`];
};

export default roundWithFallback;
