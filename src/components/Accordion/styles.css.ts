import { style, createContainer } from '@vanilla-extract/css';

import round from '../../helpers/round/round';

export const detailsWrapperContainer = createContainer();

export const wrapper = style({
  marginBottom: round('calc(var(--spacing-default) * 2)'),
  containerName: detailsWrapperContainer,
  containerType: 'inline-size',
});
