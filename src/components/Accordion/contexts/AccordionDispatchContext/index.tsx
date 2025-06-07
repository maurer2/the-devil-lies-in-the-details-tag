import { createContext, type ActionDispatch } from 'react';

import type { AccordionReducerActions } from '../AccordionContextProvider';

type AccordionDispatchContextType = ActionDispatch<[AccordionReducerActions]>;

const AccordionDispatchContext = createContext<AccordionDispatchContextType>(() => {});

export default AccordionDispatchContext;
