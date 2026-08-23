import { style } from '@vanilla-extract/css';

import round from '../../helpers/round/round';

export const debugList = style({
  position: 'relative',
  marginBlock: round('calc(var(--spacing-default) * 2)'),
});

export const debugListKey = style({
  position: 'sticky',
  top: 0,
  marginTop: 0,
  backgroundColor: 'var(--color-secondary)',
  fontWeight: 'bold',

  selectors: {
    '&:not(:first-of-type)': {
      marginTop: round('calc(var(--spacing-default) * 2)'),
    },
  },
});

export const debugListValue = style({
  marginTop: 0,
  marginLeft: round('calc(var(--spacing-default) * 3)'),

  selectors: {
    '&:not(:last-of-type)': {
      marginBottom: round('calc(var(--spacing-default) * 2)'),
    },
  },
});
