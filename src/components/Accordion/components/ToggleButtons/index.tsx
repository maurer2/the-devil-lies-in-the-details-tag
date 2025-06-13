import { use, type PropsWithChildren } from 'react';

import AccordionStateContext from '../../contexts/StateContext';
import DispatchContext from '../../contexts/DispatchContext';
import Button from '../../../Button';

import { toggleButtonGroup } from './styles.css.ts';

type ToggleButtonsProps = PropsWithChildren;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ToggleButtons({ children }: ToggleButtonsProps) {
  const { accordionEntries, namesOfExpandedGroups } = use(AccordionStateContext);
  const dispatchAccordionAction = use(DispatchContext);

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
