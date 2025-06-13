import { use, type MouseEvent, type ContextType, type ReactNode } from 'react';

import AccordionStateContext from '../../contexts/StateContext/index.tsx';
import DispatchContext from '../../contexts/DispatchContext/index.tsx';

import type { GroupName } from '../../../../types.ts';

import { menu } from './styles.css.ts';

type AccordionStateContextType = ContextType<typeof AccordionStateContext>;

type MenuRenderProps = {
  renderMenuEntries: ({
    accordionEntries,
    namesOfExpandedGroups,
    handleGroupToggleClick,
  }: AccordionStateContextType & {
    handleGroupToggleClick: (name: GroupName) => (event: MouseEvent<HTMLButtonElement>) => void;
  }) => ReactNode;
};

export default function MenuRenderProps({ renderMenuEntries }: MenuRenderProps) {
  const { accordionEntries, namesOfExpandedGroups } = use(AccordionStateContext);
  const dispatchAccordionAction = use(DispatchContext);

  const handleGroupToggleClick =
    (name: GroupName) =>
    (event: MouseEvent<HTMLButtonElement>): void => {
      event.preventDefault();

      if (namesOfExpandedGroups.includes(name)) {
        return dispatchAccordionAction({
          type: 'COLLAPSE_ACCORDION_ENTRY',
          payload: {
            name,
          },
        });
      }

      return dispatchAccordionAction({
        type: 'EXPAND_ACCORDION_ENTRY',
        payload: {
          name,
        },
      });
    };

  return (
    <div className={menu} role="group" aria-label="Accordion group toggle menu">
      {renderMenuEntries({ accordionEntries, namesOfExpandedGroups, handleGroupToggleClick })}
    </div>
  );
}
