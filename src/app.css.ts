import { style } from '@vanilla-extract/css';

import roundWithFallback from './helpers/round-with-fallback/round-with-fallback';

export const wrapper = style({
  marginInline: 'auto',
  padding: roundWithFallback('calc(var(--spacing-default) * 2)'),
  width: 'min(100vw, 1024px)',
  minHeight: '100svh',
  backgroundColor: 'var(--color-secondary)',
  color: 'var(--color-primary)',
});

export const pageTitle = style({
  marginTop: 0,
  marginBottom: roundWithFallback('calc(var(--spacing-default) * 2)'),
});

export const groupToggles = style({
  display: 'grid',
  marginBottom: roundWithFallback('calc(var(--spacing-default) * 2)'),
  gridTemplateColumns: 'repeat(auto-fit, minmax(50px, 1fr))',
  gap: roundWithFallback('calc(var(--spacing-default) * 0.75)'),
  textAlign: 'center',
});

export const groupToggle = style({
  paddingInline: roundWithFallback('calc(var(--spacing-default) * 1)'),
  paddingBlock: roundWithFallback('calc(var(--spacing-default) * 0.75)'),
  border: '1px solid var(--color-primary)',
  backgroundColor: 'var(--color-secondary)',
  cursor: 'pointer',
  textAlign: 'center',

  selectors: {
    '&[aria-pressed=true]': {
      backgroundColor: 'var(--color-tertiary)',
      border: '1px solid var(--color-tertiary)',
    },
  },
});
