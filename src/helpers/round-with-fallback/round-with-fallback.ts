const roundWithFallback = (value: string): [string, string] => [
  value,
  `round(to-zero, ${value}, 1px)`,
];

export default roundWithFallback;
