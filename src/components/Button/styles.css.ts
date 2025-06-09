import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';
import { createVar } from '@vanilla-extract/css';

import roundWithFallback from '../../helpers/round-with-fallback/round-with-fallback';

export const varButtonFlexBasis = createVar();

export const button = recipe({
  base: {
    border: '1px solid var(--color-primary)',
    paddingBlock: roundWithFallback('calc(var(--spacing-default) * 0.75)'),
    paddingInline: roundWithFallback('calc(var(--spacing-default) * 1)'),
    fontWeight: 600,
  },
  variants: {
    state: {
      default: {
        opacity: 1,
        backgroundColor: 'var(--color-secondary)',
        cursor: 'pointer',
        color: 'var(--primary)',
      },
      active: { backgroundColor: 'var(--color-primary)', color: 'var(--color-secondary)' },
      disabled: {
        opacity: 0.25,
        backgroundColor: 'var(--color-secondary)',
        cursor: 'not-allowed',
        color: 'var(--primary)',
      },
    },
    size: {
      // eslint-disable-next-line vanilla-extract/no-empty-style-blocks
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
