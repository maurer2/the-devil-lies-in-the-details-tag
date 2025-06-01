import { style, globalStyle } from '@vanilla-extract/css';

export const wrapper = style({
  marginInline: 'auto',
  width: 'min(100vw, 1024px)',
  minHeight: '100svh',
  padding: ['2rlh', 'round(to-zero, 2rlh, 1px)'],
  backgroundColor: 'var(--color-secondary)',
  color: 'var(--color-primary)',
});

export const pageTitle = style({
  marginTop: 0,
  marginBottom: ['2rlh', 'round(to-zero, 2rlh, 1px)'],
});

export const debugList = style({
  marginTop: 0,
  marginBottom: ['2rlh', 'round(to-zero, 2rlh, 1px)'],
  position: 'relative',
});

export const debugListKey = style({
  marginTop: 0,
  fontWeight: 'bold',
  position: 'sticky',
  top: 0,
  background: 'var(--color-secondary)',

  selectors: {
    '&:not(:first-of-type)': {
      marginTop: ['2rlh', 'round(to-zero, 2rlh, 1px)'],
    },
  },
});

export const debugListValue = style({
  marginTop: 0,
  marginLeft: ['3rlh', 'round(to-zero, 3rlh, 1px)'],

  selectors: {
    '&:not(:last-of-type)': {
      marginBottom: ['2rlh', 'round(to-zero, 1rlh, 1px)'],
    },
  },
});

export const groupNav = style({
  display: 'grid',
  marginBottom: ['2rlh', 'round(to-zero, 2rlh, 1px)'],
  gridTemplateColumns: 'repeat(auto-fit, minmax(25px, 1fr))',
  gap: '1rem',
  textAlign: 'center',
});

globalStyle(`${groupNav} > button`, {
  padding: 0,
  border: '1px solid var(--color-primary)',
  cursor: 'pointer',
  backgroundColor: 'var(--color-secondary)',
});
