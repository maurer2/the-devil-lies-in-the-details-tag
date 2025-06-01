import { style } from '@vanilla-extract/css';

export const detailsWrapper = style({
  marginBottom: ['2rlh', 'round(to-zero, 2rlh, 1px)'],
});

export const details = style({
  position: 'relative',
  border: '1px solid var(--color-primary)',
  paddingBlock: ['1rlh', 'round(to-zero, 1rlh, 1px)'],
  paddingInline: ['2rlh', 'round(to-zero, 2rlh, 1px)'],
  borderTop: 0,

  selectors: {
    '&:first-of-type': {
      borderTop: '1px solid var(--color-primary)',
    },
    '&:before': {
      position: 'absolute',
      left: '0.75rlh',
      content: '+',
      fontWeight: 600,
    },
    '&[open]': {
      background: 'var(--color-primary)',
      color: 'var(--color-secondary)',
    },
    '&[open]:before': {
      content: '-',
    },
  },
});

export const summary = style({
  cursor: 'pointer',

  '::marker': {
    content: '',
  },
  selectors: {
    ['[open] > &, [open] > &::marker']: {
      fontWeight: 600,
    },
  },
});

export const content = style({
  paddingTop: ['1rlh', 'round(to-zero, 1rlh, 1px)'],
});

export const debugString = style({
  ':before': {
    content: '(',
  },
  ':after': {
    content: ')',
  },
});
