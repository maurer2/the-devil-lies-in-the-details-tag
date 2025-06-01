import { style } from '@vanilla-extract/css';

export const debugList = style({
  marginBlock: ['2rlh', 'round(to-zero, 2rlh, 1px)'],
  position: 'relative',
});

export const debugListKey = style({
  marginTop: 0,
  fontWeight: 'bold',
  position: 'sticky',
  top: 0,
  background: 'var(--color-secondary)',

  selectors: {
    '&:not(:first-of-type)': {
      marginTop: ['2rlh', 'round(to-zero, 2rlh, 1px)'],
    },
  },
});

export const debugListValue = style({
  marginTop: 0,
  marginLeft: ['3rlh', 'round(to-zero, 3rlh, 1px)'],

  selectors: {
    '&:not(:last-of-type)': {
      marginBottom: ['2rlh', 'round(to-zero, 1rlh, 1px)'],
    },
  },
});
