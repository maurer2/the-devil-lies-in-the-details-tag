import { style } from '@vanilla-extract/css';

export const detailsWrapper = style({
  marginBottom: ['2rlh', 'round(to-zero, 2rlh, 1px)'],
});

export const details = style({
  position: 'relative',
  border: '1px solid var(--color-primary)',
  paddingLeft: ['2rlh', 'round(to-zero, 2rlh, 1px)'],
  borderTop: 0,

  selectors: {
    '&:first-of-type': {
      borderTop: '1px solid var(--color-primary)',
    },
    '&:before': {
      position: 'absolute',
      left: '0.5rlh',
      paddingBlock: ['1rlh', 'round(to-zero, 1rlh, 1px)'],
      content: '+',
    },
    '[open]&:before': {
      content: '-',
      color: 'var(--color-tertiary)',
    },
  },
});

export const summary = style({
  paddingBlock: ['1rlh', 'round(to-zero, 1rlh, 1px)'],
  cursor: 'pointer',

  '::marker': {
    content: '',
  },
  selectors: {
    ['[open] > &, [open] > &::marker']: {
      color: 'var(--color-tertiary)',
    },
  },
});

export const content = style({});
