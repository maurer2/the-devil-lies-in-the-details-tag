import { style } from '@vanilla-extract/css';

import roundWithFallback from '../../helpers/round-with-fallback/round-with-fallback';

export const debugList = style({
  position: 'relative',
  marginBlock: roundWithFallback('calc(var(--spacing-default) * 2)'),
});

export const debugListKey = style({
  position: 'sticky',
  top: 0,
  marginTop: 0,
  backgroundColor: 'var(--color-secondary)',
  fontWeight: 'bold',

  selectors: {
    '&:not(:first-of-type)': {
      marginTop: roundWithFallback('calc(var(--spacing-default) * 2)'),
    },
  },
});

export const debugListValue = style({
  marginTop: 0,
  marginLeft: roundWithFallback('calc(var(--spacing-default) * 3)'),

  selectors: {
    '&:not(:last-of-type)': {
      marginBottom: roundWithFallback('calc(var(--spacing-default) * 2)'),
    },
  },
});
