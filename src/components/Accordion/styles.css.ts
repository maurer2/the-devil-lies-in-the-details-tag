import { style, createContainer } from '@vanilla-extract/css';

import roundWithFallback from '../../helpers/round-with-fallback/round-with-fallback';

export const detailsWrapperContainer = createContainer();

export const detailsWrapper = style({
  marginBottom: roundWithFallback('calc(var(--spacing-default) * 2)'),
  containerName: 'detailsWrapperContainer',
  containerType: 'inline-size',
});

export const toggleButtonGroup = style({
  display: 'flex',
  gap: roundWithFallback('calc(var(--spacing-default) * 1)'),
  marginBottom: roundWithFallback('calc(var(--spacing-default) * 1)'),
  flexWrap: 'wrap',
});

export const toggleButton = style({
  paddingInline: roundWithFallback('calc(var(--spacing-default) * 1)'),
  paddingBlock: roundWithFallback('calc(var(--spacing-default) * 0.75)'),
  border: '1px solid var(--color-primary)',
  backgroundColor: 'var(--color-secondary)',
  opacity: 1,
  cursor: 'pointer',
  transition: 'opacity 0.25s',
  flexBasis: '100%',

  selectors: {
    '&[aria-disabled=true]': {
      opacity: 0.25,
      cursor: 'not-allowed',
    },
  },

  '@container': {
    ['detailsWrapperContainer (width > 400px)']: {
      flexBasis: 'auto',
    },
  },
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
    '&[open]:before': {
      content: '-',
    },
    '&[open]': {
      backgroundColor: 'var(--color-primary)',
      color: 'var(--color-secondary)',
      borderBottom: '1px solid currentColor',
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
