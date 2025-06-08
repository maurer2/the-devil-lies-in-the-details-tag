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

export const buttonGroup = style({
  marginBottom: roundWithFallback('calc(var(--spacing-default) * 1)'),
});
