import { style, keyframes, createVar } from '@vanilla-extract/css';

import roundWithFallback from '../../helpers/round-with-fallback/round-with-fallback';
import { htmlContainer } from '../../global.css';

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
  aspectRatio: '1',
  position: 'fixed',
  zIndex: 10,
  top: roundWithFallback('calc(var(--spacing-default) * 1)'),
  right: roundWithFallback('calc(var(--spacing-default) * 1)'),
  display: 'none',
  transition: 'filter 0.5s',
  filter: 'contrast(0)',
  borderRadius: '50%',
  background: 'var(--color-secondary)',
  width: roundWithFallback('calc(var(--spacing-default) * 2)'),
  color: 'var(--color-tertiary)',

  '@supports': {
    '(mask-composite: intersect) and (animation-timeline: scroll())': {
      '@container': {
        [`${htmlContainer} scroll-state(scrollable: top)`]: { filter: 'contrast(100%)' },
      },
      '@media': {
        '(prefers-reduced-motion: no-preference)': {
          display: 'block',
          maskComposite: 'intersect',
          maskSize: '100% 100%',

          // 1. mask centre of circle
          maskImage: `
            radial-gradient(circle at center, transparent 0, transparent 50%, currentColor 50%, currentColor 100%)`,
        },
      },
    },
  },
});

export const progressIndicatorMask = style({
  position: 'absolute',
  inset: 0,
  backgroundColor: 'var(--color-tertiary)',

  '@supports': {
    '(mask-composite: intersect) and (animation-timeline: scroll())': {
      '@media': {
        '(prefers-reduced-motion: no-preference)': {
          animation: `${zeroTo360Animation} linear`,
          animationTimeline: 'scroll(root)',
          maskComposite: 'intersect',
          maskSize: '100% 100%',

          // 2. unmask part of background that is already filled
          maskImage: `conic-gradient(currentColor 0deg, currentColor ${angleVar}, transparent ${angleVar})`,
        },
      },
    },
  },
});
