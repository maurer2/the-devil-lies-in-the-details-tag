import { style, keyframes, createVar } from '@vanilla-extract/css';

import roundWithFallback from '../round-with-fallback/round-with-fallback';

const progressAsDeg = createVar({
  syntax: '<angle>',
  inherits: false,
  initialValue: '1deg',
});

const progressKeyframes = keyframes({
  from: {
    vars: {
      [progressAsDeg]: '1deg',
    },
  },
  to: {
    vars: {
      [progressAsDeg]: '360deg',
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
  isolation: 'isolate',
  borderRadius: '50%',
  backgroundColor: 'var(--color-tertiary)',
  width: roundWithFallback('calc(var(--spacing-default) * 2)'),
  color: 'var(--color-tertiary)',

  '@supports': {
    '(mask-composite: intersect) and (animation-timeline: scroll())': {
      display: 'block',
      animation: `${progressKeyframes} linear`,
      animationTimeline: 'scroll(root)',
      maskComposite: 'intersect',
      maskSize: '100%',

      // 1. mask center of circle
      // 2. mask border that is not filled yet
      // todo: remove magic numbers
      maskImage: `
    radial-gradient(circle at center, transparent 0, transparent 50%, currentColor 50%, currentColor 100%),
    conic-gradient(currentColor 0deg, currentColor ${progressAsDeg}, transparent ${progressAsDeg})`,
    },
  },
});
