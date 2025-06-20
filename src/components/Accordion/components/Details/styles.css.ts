import { style, type CSSProperties } from '@vanilla-extract/css';

import roundWithFallback from '../../../../helpers/round-with-fallback/round-with-fallback';

export const detailsWrapper = style({
  marginBottom: roundWithFallback('calc(var(--spacing-default) * 2)'),
});

const transitionDefaults: CSSProperties = {
  transitionDuration: '0.25s',
  transitionBehavior: 'allow-discrete',
};

export const details = style({
  position: 'relative',
  border: '1px solid var(--color-primary)',
  borderTop: 0,
  paddingBlock: roundWithFallback('calc(var(--spacing-default) * 1)'),
  paddingInline: roundWithFallback('calc(var(--spacing-default) * 2)'),
  overflow: 'hidden',

  '@media': {
    '(prefers-reduced-motion: no-preference)': {
      ...transitionDefaults,
      transitionProperty: 'background-color',
    },
  },

  selectors: {
    '&:first-of-type': {
      borderTop: '1px solid var(--color-primary)',
    },
    '&:before': {
      position: 'absolute',
      left: '0.75rlh',
      fontWeight: 600,
      content: '+',
    },
    '&[open]:before': {
      content: '-',
    },
    '&[open]': {
      borderBottom: '1px solid currentColor',
      backgroundColor: 'var(--color-primary)',
      color: 'var(--color-secondary)',
    },
    // pseudo element not supported in FF unflagged
    '&::details-content': {
      height: 0,

      '@media': {
        '(prefers-reduced-motion: no-preference)': {
          ...transitionDefaults,
          transitionProperty: 'height, content-visibility',
        },
      },
    },
    '&[open]::details-content': {
      height: ['auto', 'calc-size(auto, size)'],
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
