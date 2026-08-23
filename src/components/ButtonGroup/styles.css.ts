import { style } from '@vanilla-extract/css';

import round from '../../helpers/round/round';

export const buttonGroup = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: round('calc(var(--spacing-default) * 1)'),
  marginBottom: round('calc(var(--spacing-default) * 1)'),
});
