import { style, createContainer } from '@vanilla-extract/css';

import roundWithFallback from '../../helpers/round-with-fallback/round-with-fallback';

export const detailsWrapperContainer = createContainer();

export const detailsWrapper = style({
  marginBottom: roundWithFallback('calc(var(--spacing-default) * 2)'),
  containerName: detailsWrapperContainer,
  containerType: 'inline-size',
});
