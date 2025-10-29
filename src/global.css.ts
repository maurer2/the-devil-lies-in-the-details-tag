import { globalStyle, createContainer } from '@vanilla-extract/css';

export const htmlContainer = createContainer();
export const bodyContainer = createContainer();

globalStyle(':root', {
  background: 'var(--color-primary)',
  scrollbarGutter: 'stable',
  color: 'var(--color-secondary)',

  containerType: 'scroll-state',
  containerName: htmlContainer,

  vars: {
    '--color-primary': 'black',
    '--color-secondary': 'white',
    '--color-tertiary': 'fuchsia',

    '--spacing-default': '1rlh',
  },
});

globalStyle('body', {
  minHeight: ['100vh', '100dvh'],
  containerName: bodyContainer,
  containerType: 'inline-size',
});

globalStyle('p', {
  marginTop: 0,
});
