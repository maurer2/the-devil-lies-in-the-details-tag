import { style } from '@vanilla-extract/css';

import roundWithFallback from '../../../../helpers/round-with-fallback/round-with-fallback';

export const menu = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(50px, 1fr))',
  gap: roundWithFallback('calc(var(--spacing-default) * 0.75)'),
  marginBottom: roundWithFallback('calc(var(--spacing-default) * 1)'),
  textAlign: 'center',
});
