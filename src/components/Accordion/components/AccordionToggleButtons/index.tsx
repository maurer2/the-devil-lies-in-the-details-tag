import { use, type PropsWithChildren } from 'react';

import AccordionStateContext from '../../contexts/AccordionStateContext';
import AccordionDispatchContext from '../../contexts/AccordionDispatchContext';
import Button from '../../../Button';

import { toggleButtonGroup } from './styles.css.ts';

type AccordionToggleButtonsProps = PropsWithChildren;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      <Button
        type="button"
        state={!hasCollapsibleEntries ? 'disabled' : 'default'}
        size="dynamic"
        onClick={handleCollapseButtonClick}
        aria-disabled={!hasCollapsibleEntries}
        aria-label="Collapse all entries"
      >
        Collapse
      </Button>
      <Button
        type="button"
        state={!hasExpandableEntries ? 'disabled' : 'default'}
        size="dynamic"
        onClick={handleExpandButtonClick}
        aria-disabled={!hasExpandableEntries}
        aria-label="Expand all entries"
      >
        Expand
      </Button>
    </div>
  );
}
