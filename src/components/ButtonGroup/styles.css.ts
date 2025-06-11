import { style } from '@vanilla-extract/css';

import roundWithFallback from '../../helpers/round-with-fallback/round-with-fallback';

export const buttonGroup = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: roundWithFallback('calc(var(--spacing-default) * 1)'),
  marginBottom: roundWithFallback('calc(var(--spacing-default) * 1)'),
});
