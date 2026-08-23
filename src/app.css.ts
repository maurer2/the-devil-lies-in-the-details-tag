import { style } from '@vanilla-extract/css';

import round from './helpers/round/round';

export const wrapper = style({
  marginInline: 'auto',
  backgroundColor: 'var(--color-secondary)',
  padding: round('calc(var(--spacing-default) * 2)'),
  // https://www.smashingmagazine.com/2023/12/new-css-viewport-units-not-solve-classic-scrollbar-problem/#avoiding-the-classic-scrollbar-problem
  width: ['min(100%, 1024px)', 'min(100cqw, 1024px)'],
  minHeight: '100svh',
  color: 'var(--color-primary)',
});

export const pageTitle = style({
  marginTop: 0,
  marginBottom: round('calc(var(--spacing-default) * 2)'),
});

export const buttonGroup = style({
  marginBottom: round('calc(var(--spacing-default) * 1)'),
});
