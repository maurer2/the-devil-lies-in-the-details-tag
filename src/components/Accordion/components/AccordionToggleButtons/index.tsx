import { use, type PropsWithChildren } from 'react';

import AccordionStateContext from '../../contexts/AccordionStateContext';
import AccordionDispatchContext from '../../contexts/AccordionDispatchContext';

import { toggleButtonGroup, toggleButton } from './styles.css.ts';

type AccordionToggleButtonsProps = PropsWithChildren;

export default function AccordionToggleButtons({ children }: AccordionToggleButtonsProps) {
  const { accordionEntries, namesOfExpandedGroups } = use(AccordionStateContext);
  const dispatchAccordionAction = use(AccordionDispatchContext);

  const hasCollapsibleEntries = Boolean(namesOfExpandedGroups.length);
  const hasExpandableEntries = namesOfExpandedGroups.length !== accordionEntries.length;

  const handleCollapseButtonClick = (): void => {
    if (!hasCollapsibleEntries) {
      return;
    }

    dispatchAccordionAction({
      type: 'COLLAPSE_ALL_ACCORDION_ENTRIES',
    });
  };

  const handleExpandButtonClick = (): void => {
    if (!hasExpandableEntries) {
      return;
    }

    dispatchAccordionAction({
      type: 'EXPAND_ALL_ACCORDION_ENTRIES',
    });
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
