import { use, type PropsWithChildren } from 'react';
// import type { Simplify } from 'type-fest';

import { AccordionContext } from '../../index.tsx';
import { toggleButtonGroup, toggleButton } from './styles.css.ts';
import type { GroupedEntry, GroupName } from '../../../../types.ts';

// type AccordionEntry = Simplify<
//   GroupedEntry & {
//     isExpanded: boolean;
//   }
// >;

type AccordionToggleButtonsProps = PropsWithChildren;
// onExpandButtonClick: VoidFunction;
// onCollapseButtonClick: VoidFunction;

export default function AccordionToggleButtons({ children }: AccordionToggleButtonsProps) {
  const { accordionEntries, namesOfExpandedGroups } = use(AccordionContext);

  const hasCollapsibleEntries = Boolean(namesOfExpandedGroups.length);
  const hasExpandableEntries = namesOfExpandedGroups.length !== accordionEntries.length;

  const handleCollapseButtonClick = (): void => {
    if (!hasCollapsibleEntries) {
      return;
    }

    // onCollapseButtonClick();
  };

  const handleExpandButtonClick = (): void => {
    if (!hasExpandableEntries) {
      return;
    }

    // onExpandButtonClick();
  };

  return (
    <div className={toggleButtonGroup} role="group" aria-label="Collapse and Expand buttons">
      <button
        type="button"
        className={toggleButton}
        onClick={handleCollapseButtonClick}
        aria-disabled={!hasCollapsibleEntries}
        aria-label="Collapse all entries"
      >
        Collapse
      </button>
      <button
        type="button"
        className={toggleButton}
        onClick={handleExpandButtonClick}
        aria-disabled={!hasExpandableEntries}
        aria-label="Expand all entries"
      >
        Expand
      </button>
    </div>
  );
}
