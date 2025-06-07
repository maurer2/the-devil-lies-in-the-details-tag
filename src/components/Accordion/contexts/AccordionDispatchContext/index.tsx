import { createContext, type ActionDispatch } from 'react';

import type { ReducerActions } from '../AccordionContextProvider';

type AccordionDispatchContextType = ActionDispatch<[action: ReducerActions]>; // todo type

const AccordionDispatchContext = createContext<AccordionDispatchContextType>(() => {});

export default AccordionDispatchContext;
