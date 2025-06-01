import { style } from '@vanilla-extract/css';

import roundWithFallback from '../../helpers/round-with-fallback/round-with-fallback';

export const detailsWrapper = style({
  marginBottom: ['2rlh', 'round(to-zero, 2rlh, 1px)'],
});

export const details = style({
  position: 'relative',
  paddingBlock: roundWithFallback('calc(var(--spacing-default) * 1)'),
  paddingInline: roundWithFallback('calc(var(--spacing-default) * 2)'),
  border: '1px solid var(--color-primary)',
  borderTop: 0,

  selectors: {
    '&:first-of-type': {
      borderTop: '1px solid var(--color-primary)',
    },
    '&:before': {
      content: '+',
      position: 'absolute',
      left: '0.75rlh',
      fontWeight: 600,
    },
    '&[open]': {
      backgroundColor: 'var(--color-primary)',
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
  paddingTop: roundWithFallback('calc(var(--spacing-default) * 1)'),
});

export const debugString = style({
  ':before': {
    content: '(',
  },
  ':after': {
    content: ')',
  },
});
