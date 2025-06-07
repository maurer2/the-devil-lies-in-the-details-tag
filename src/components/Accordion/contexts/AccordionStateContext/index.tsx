import { createContext } from 'react';
import type { Simplify } from 'type-fest';

import type { GroupName, AccordionEntry } from '../../../../types.ts';

type AccordionStateContextType = Simplify<{
  accordionEntries: AccordionEntry[];
  defaultExpandedGroupNames: GroupName[];
  namesOfExpandedGroups: string[];
}>;

const AccordionStateContext = createContext<AccordionStateContextType>({
  accordionEntries: [],
  defaultExpandedGroupNames: [],
  namesOfExpandedGroups: [],
});

export default AccordionStateContext;
