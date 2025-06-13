import { use, type ReactElement } from 'react';

import AccordionStateContext from '../../contexts/StateContext';
import DispatchContext from '../../contexts/DispatchContext';

type ToggleButtonsProps = {
  children({
    hasCollapsibleEntries,
    hasExpandableEntries,
    handleCollapseButtonClick,
    handleExpandButtonClick,
  }: {
    hasCollapsibleEntries: boolean;
    hasExpandableEntries: boolean;
    handleCollapseButtonClick: VoidFunction;
    handleExpandButtonClick: VoidFunction;
  }): ReactElement;
};

export default function ToggleButtonsFaaC({ children }: ToggleButtonsProps) {
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

  return children({
    hasCollapsibleEntries,
    hasExpandableEntries,
    handleCollapseButtonClick,
    handleExpandButtonClick,
  });
}
