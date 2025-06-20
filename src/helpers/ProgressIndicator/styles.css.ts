import { style, keyframes, createVar } from '@vanilla-extract/css';

import roundWithFallback from '../round-with-fallback/round-with-fallback';

const angleVar = createVar({
  syntax: '<angle>',
  inherits: false,
  initialValue: '0rad',
});

const zeroTo360Animation = keyframes({
  from: {
    vars: {
      [angleVar]: '0rad',
    },
  },
  to: {
    vars: {
      [angleVar]: `${Math.PI * 2}rad`,
    },
  },
});

export const progressIndicator = style({
  aspectRatio: '1 / 1',
  position: 'fixed',
  zIndex: 10,
  top: roundWithFallback('calc(var(--spacing-default) * 1)'),
  right: roundWithFallback('calc(var(--spacing-default) * 1)'),
  display: 'none',
  borderRadius: '50%',
  backgroundColor: 'var(--color-tertiary)',
  width: roundWithFallback('calc(var(--spacing-default) * 2)'),
  color: 'var(--color-tertiary)',

  '@supports': {
    '(mask-composite: intersect) and (animation-timeline: scroll())': {
      '@media': {
        '(prefers-reduced-motion: no-preference)': {
          display: 'block',
          animation: `${zeroTo360Animation} linear`,
          animationTimeline: 'scroll(root)',
          maskComposite: 'intersect',
          maskSize: '100% 100%',

          // 1. mask centre of circle
          // 2. mask border that is not filled yet
          // todo: remove magic numbers
          maskImage: `
            radial-gradient(circle at center, transparent 0, transparent 50%, currentColor 50%, currentColor 100%),
            conic-gradient(currentColor 0deg, currentColor ${angleVar}, transparent ${angleVar})`,
        },
      },
    },
  },
});
