import { createContext } from 'react';

import type { GroupName, AccordionEntry } from '../../../../types.ts';

type ContextType = {
  accordionEntries: AccordionEntry[];
  namesOfExpandedGroups: GroupName[];
};

const AccordionStateContext = createContext<ContextType>({
  accordionEntries: [],
  namesOfExpandedGroups: [],
});

export default AccordionStateContext;
