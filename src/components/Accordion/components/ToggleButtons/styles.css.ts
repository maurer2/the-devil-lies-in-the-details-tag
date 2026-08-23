import { style } from '@vanilla-extract/css';

import round from '../../../../helpers/round/round';
import { detailsWrapperContainer } from '../../styles.css.ts';
import { varButtonFlexBasis } from '../../../Button/styles.css.ts';

export const toggleButtonGroup = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: round('calc(var(--spacing-default) * 1)'),
  marginBottom: round('calc(var(--spacing-default) * 1)'),

  // size prop needs to be set to "dynamic"
  vars: {
    [varButtonFlexBasis]: '100%',
  },

  '@container': {
    [`${detailsWrapperContainer} (width > 384px)`]: {
      vars: { [varButtonFlexBasis]: 'auto' },
    },
  },
});
