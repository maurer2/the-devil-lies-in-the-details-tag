import { use, type MouseEvent } from 'react';

import AccordionStateContext from '../../contexts/StateContext/index.tsx';
import DispatchContext from '../../contexts/DispatchContext/index.tsx';
import Button from '../../../Button/index.tsx';

import type { GroupName } from '../../../../types.ts';

import { menu } from './styles.css.ts';

export default function Menu() {
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
