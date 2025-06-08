import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';
import { createVar } from '@vanilla-extract/css';

import roundWithFallback from '../../helpers/round-with-fallback/round-with-fallback';

export const varButtonFlexBasis = createVar();

export const button = recipe({
  base: {
    paddingInline: roundWithFallback('calc(var(--spacing-default) * 1)'),
    paddingBlock: roundWithFallback('calc(var(--spacing-default) * 0.75)'),
    border: '1px solid var(--color-primary)',
    fontWeight: 600,
  },
  variants: {
    state: {
      default: {
        backgroundColor: 'var(--color-secondary)',
        color: 'var(--primary)',
        opacity: 1,
        cursor: 'pointer',
      },
      active: { backgroundColor: 'var(--color-primary)', color: 'var(--color-secondary)' },
      disabled: {
        backgroundColor: 'var(--color-secondary)',
        color: 'var(--primary)',
        opacity: 0.25,
        cursor: 'not-allowed',
      },
    },
    size: {
      default: {},
      dynamic: {
        flexBasis: varButtonFlexBasis,
      },
    },
  },
  defaultVariants: {
    state: 'default',
    size: 'default',
  },
});

export type ButtonVariants = RecipeVariants<typeof button>;
