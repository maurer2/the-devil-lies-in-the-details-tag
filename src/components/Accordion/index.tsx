import type { PropsWithChildren } from 'react';

import AccordionDetails from './components/AccordionDetails';
import AccordionToggleButtons from './components/AccordionToggleButtons';
import AccordionContextProvider from './contexts/AccordionContextProvider';

import { detailsWrapper } from './styles.css.ts';
import type { GroupedEntry, GroupName } from '../../types.ts';

type AccordionProps = PropsWithChildren<{
  groupedEntries: GroupedEntry[];
  defaultExpandedGroupNames?: GroupName[];
}>;

export default function Accordion({
  groupedEntries,
  defaultExpandedGroupNames = [],
  children,
}: AccordionProps) {
  return (
    <AccordionContextProvider
      groupedEntries={groupedEntries}
      defaultExpandedGroupNames={defaultExpandedGroupNames}
    >
      {children}
      <div className={detailsWrapper}>
        <AccordionToggleButtons />
        <AccordionDetails />
      </div>
    </AccordionContextProvider>
  );
}
