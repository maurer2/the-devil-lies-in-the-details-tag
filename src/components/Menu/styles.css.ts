import { style } from '@vanilla-extract/css';

import roundWithFallback from '../../helpers/round-with-fallback/round-with-fallback';

export const menu = style({
  display: 'grid',
  marginBottom: roundWithFallback('calc(var(--spacing-default) * 1)'),
  gridTemplateColumns: 'repeat(auto-fit, minmax(50px, 1fr))',
  gap: roundWithFallback('calc(var(--spacing-default) * 0.75)'),
  textAlign: 'center',
});

export const menuToggle = style({
  paddingInline: roundWithFallback('calc(var(--spacing-default) * 1)'),
  paddingBlock: roundWithFallback('calc(var(--spacing-default) * 0.75)'),
  border: '1px solid var(--color-primary)',
  backgroundColor: 'var(--color-secondary)',
  textAlign: 'center',
  fontWeight: 600,
  cursor: 'pointer',

  selectors: {
    '&[aria-pressed=true]': {
      backgroundColor: 'var(--color-primary)',
      color: 'var(--color-secondary)',
    },
  },
});
