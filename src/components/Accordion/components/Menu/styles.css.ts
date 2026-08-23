import { style } from '@vanilla-extract/css';

import round from '../../../../helpers/round/round';

export const menu = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(50px, 1fr))',
  gap: round('calc(var(--spacing-default) * 0.75)'),
  marginBottom: round('calc(var(--spacing-default) * 1)'),
  textAlign: 'center',
});
