import { useMemo, useReducer, type PropsWithChildren, type ContextType } from 'react';
import type { Simplify } from 'type-fest';

import AccordionStateContext from '../AccordionStateContext';
import AccordionDispatchContext from '../AccordionDispatchContext';

import type { GroupedEntry, GroupName } from '../../../../types.ts';

type AccordionContextProviderProps = PropsWithChildren<{
  groupedEntries: GroupedEntry[];
  defaultExpandedGroupNames?: GroupName[];
}>;

type AccordionStateContextType = ContextType<typeof AccordionStateContext>;
// type AccordionDispatchContextType = ContextType<typeof AccordionDispatchContext>;

const reducerActionTypes = {
  TOGGLE_ACCORDION_ENTRY: 'TOGGLE_ACCORDION_ENTRY',
  EXPAND_ALL_ACCORDION_ENTRIES: 'EXPAND_ALL_ACCORDION_ENTRIES',
  COLLAPSE_ALL_ACCORDION_ENTRIES: 'COLLAPSE_ALL_ACCORDION_ENTRIES',
  EXPAND_ACCORDION_ENTRY: 'EXPAND_ACCORDION_ENTRY',
  COLLAPSE_ACCORDION_ENTRY: 'COLLAPSE_ACCORDION_ENTRY',
} as const;

type ReducerActionPayloads = {
  [reducerActionTypes.TOGGLE_ACCORDION_ENTRY]: { name: string };
  [reducerActionTypes.EXPAND_ALL_ACCORDION_ENTRIES]: undefined;
  [reducerActionTypes.COLLAPSE_ALL_ACCORDION_ENTRIES]: undefined;
  [reducerActionTypes.EXPAND_ACCORDION_ENTRY]: { name: string; name2: boolean };
  [reducerActionTypes.COLLAPSE_ACCORDION_ENTRY]: { name: string };
};

type ReducerActionNames = Simplify<keyof ReducerActionPayloads>;

export type ReducerActions = {
  [K in ReducerActionNames]: ReducerActionPayloads[K] extends undefined
    ? {
        type: K;
      }
    : {
        type: K;
        payload: ReducerActionPayloads[K];
      };
}[ReducerActionNames];

const accordionReducer = (
  state: AccordionStateContextType,
  action: ReducerActions,
): AccordionStateContextType => {
  switch (action.type) {
    case 'TOGGLE_ACCORDION_ENTRY': {
      const { payload } = action;
      return {
        ...state,
      };
    }
    case 'EXPAND_ALL_ACCORDION_ENTRIES': {
      console.log('EXPAND_ALL_ACCORDION_ENTRIES');
      // const { payload } = action; // error
      return {
        ...state,
      };
    }
    case 'COLLAPSE_ALL_ACCORDION_ENTRIES': {
      console.log('COLLAPSE_ALL_ACCORDION_ENTRIES');
      // const { payload } = action; // error
      return {
        ...state,
      };
    }
    case 'EXPAND_ACCORDION_ENTRY': {
      const { payload } = action;
      return {
        ...state,
      };
    }
    case 'COLLAPSE_ACCORDION_ENTRY': {
      const { payload } = action;
      return {
        ...state,
      };
    }
    default: {
      return state;
    }
  }
};

export default function AccordionContextProvider({
  groupedEntries,
  defaultExpandedGroupNames = [],
  children,
}: AccordionContextProviderProps) {
  // https://tkdodo.eu/blog/use-state-vs-use-reducer#passing-props-to-reducers
  // https://overreacted.io/a-complete-guide-to-useeffect/#why-usereducer-is-the-cheat-mode-of-hooks
  const [accordionState, dispatchAccordionAction] = useReducer(
    accordionReducer,
    {
      accordionEntries: [],
      defaultExpandedGroupNames: [],
      namesOfExpandedGroups: [],
    },
    (initialAccordionState) => {
      const accordionEntries = groupedEntries.map(({ name, entries }) => ({
        name,
        entries,
        isExpanded: defaultExpandedGroupNames.includes(name),
      }));

      return {
        accordionEntries,
        defaultExpandedGroupNames: initialAccordionState.defaultExpandedGroupNames,
        namesOfExpandedGroups: initialAccordionState.namesOfExpandedGroups,
      };
    },
  );

  const accordionStateContextValues = useMemo<AccordionStateContextType>(
    () => accordionState,
    [accordionState],
  );

  return (
    <AccordionStateContext value={accordionStateContextValues}>
      <AccordionDispatchContext value={dispatchAccordionAction}>
        {children}
      </AccordionDispatchContext>
    </AccordionStateContext>
  );
}
