import { style } from '@vanilla-extract/css';

import roundWithFallback from '../../../../helpers/round-with-fallback/round-with-fallback';

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
