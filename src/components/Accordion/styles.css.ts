import { style } from '@vanilla-extract/css';

export const detailsWrapper = style({
  marginBottom: ['2rlh', 'round(to-zero, 2rlh, 1px)'],
});

export const details = style({});

export const summary = style({
  '::marker': {
    color: 'var(--color-primary)',
  },
  selectors: {
    '[open] > &': {
      color: 'var(--color-tertiary)',
    },
    '[open] > &::marker': {
      color: 'var(--color-tertiary)',
    },
  },
});
