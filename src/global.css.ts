import { globalStyle } from '@vanilla-extract/css';

globalStyle(':root', {
  background: 'var(--color-primary)',
  color: 'var(--color-secondary)',

  vars: {
    '--color-primary': 'black',
    '--color-secondary': 'white',
    '--color-tertiary': 'fuchsia',

    '--spacing-default': '1rlh',
  },
});

globalStyle('body', {
  minHeight: ['100vh', '100dvh'],
});

globalStyle('p', {
  marginTop: 0,
});
