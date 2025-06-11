import { createContext, type ActionDispatch } from 'react';

import type { ReducerActions } from '../ContextProvider';

type DispatchContextType = ActionDispatch<[ReducerActions]>;

const DispatchContext = createContext<DispatchContextType>(() => {});

export default DispatchContext;
