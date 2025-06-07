import { use, type MouseEvent } from 'react';

import AccordionStateContext from '../Accordion/contexts/AccordionStateContext';
import AccordionDispatchContext from '../Accordion/contexts/AccordionDispatchContext';

import type { GroupName } from '../../types.ts';
import { menu, menuToggle } from './styles.css.ts';

export default function Menu() {
  const { accordionEntries, namesOfExpandedGroups } = use(AccordionStateContext);
  const dispatchAccordionAction = use(AccordionDispatchContext);

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

      dispatchAccordionAction({
        type: 'EXPAND_ACCORDION_ENTRY',
        payload: {
          name,
        },
      });
    };

  return (
    <div className={menu} role="group" aria-label="Accordion group toggles">
      {accordionEntries.map(({ name }) => (
        <button
          key={name}
          className={menuToggle}
          onClick={handleGroupToggleClick(name)}
          aria-pressed={namesOfExpandedGroups.includes(name)}
        >
          {name}
        </button>
      ))}
    </div>
  );
}
