import AccordionDetails from './components/AccordionDetails';
import AccordionToggleButtons from './components/AccordionToggleButtons';
import AccordionContextProvider from './contexts/AccordionContextProvider';

import { detailsWrapper } from './styles.css.ts';
import type { GroupedEntry, GroupName } from '../../types.ts';

type AccordionProps = {
  groupedEntries: GroupedEntry[];
  defaultExpandedGroupNames?: GroupName[];
};

export default function Accordion({
  groupedEntries,
  defaultExpandedGroupNames = [],
}: AccordionProps) {
  return (
    <AccordionContextProvider
      groupedEntries={groupedEntries}
      defaultExpandedGroupNames={defaultExpandedGroupNames}
    >
      <div className={detailsWrapper}>
        <AccordionToggleButtons />
        <AccordionDetails />
      </div>
    </AccordionContextProvider>
  );
}
