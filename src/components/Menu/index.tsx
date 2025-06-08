import { use, type MouseEvent } from 'react';

import AccordionStateContext from '../Accordion/contexts/AccordionStateContext';
import AccordionDispatchContext from '../Accordion/contexts/AccordionDispatchContext';
import Button from '../Button/index.tsx';

import type { GroupName } from '../../types.ts';
import { menu } from './styles.css.ts';

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
    <div className={menu} role="group" aria-label="Accordion group toggle menu">
      {accordionEntries.map(({ name }) => {
        const isActive = namesOfExpandedGroups.includes(name);

        return (
          <Button
            key={name}
            state={isActive ? 'active' : 'default'}
            onClick={handleGroupToggleClick(name)}
            aria-pressed={isActive}
            type="button"
          >
            {name}
          </Button>
        );
      })}
    </div>
  );
}
