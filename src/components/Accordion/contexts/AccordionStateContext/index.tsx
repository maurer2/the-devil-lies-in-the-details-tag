import { createContext } from 'react';
import type { Simplify } from 'type-fest';

import type { GroupName, AccordionEntry } from '../../../../types.ts';

type AccordionStateContextType = Simplify<{
  accordionEntries: AccordionEntry[];
  namesOfExpandedGroups: GroupName[];
}>;

const AccordionStateContext = createContext<AccordionStateContextType>({
  accordionEntries: [],
  namesOfExpandedGroups: [],
});

export default AccordionStateContext;
