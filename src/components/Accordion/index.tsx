import type { PropsWithChildren } from 'react';

import type { GroupedEntry, GroupName } from '../../types.ts';

import Details from './components/Details/index.tsx';
import ToggleButtons from './components/ToggleButtons/index.tsx';
import ContextProvider from './contexts/ContextProvider';
import Menu from './components/Menu';

import { wrapper } from './styles.css.ts';

type AccordionProps = PropsWithChildren<{
  groupedEntries: GroupedEntry[];
  defaultExpandedGroupNames?: GroupName[];
}>;

function Accordion({ groupedEntries, defaultExpandedGroupNames = [], children }: AccordionProps) {
  return (
    <ContextProvider
      groupedEntries={groupedEntries}
      defaultExpandedGroupNames={defaultExpandedGroupNames}
    >
      <div className={wrapper}>{children}</div>
    </ContextProvider>
  );
}

Accordion.Details = Details;
Accordion.ToggleButtons = ToggleButtons;
Accordion.Menu = Menu;

export default Accordion;
