import { globalStyle } from '@vanilla-extract/css';

globalStyle(':root', {
  background: 'var(--color-primary)',
  color: 'var(--color-secondary)',

  vars: {
    '--color-primary': 'black',
    '--color-secondary': 'white',
  },
});

globalStyle('body', {
  minHeight: ['100vh', '100dvh'],
});
