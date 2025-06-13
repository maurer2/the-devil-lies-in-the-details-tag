import { useReducer, type PropsWithChildren, type ContextType } from 'react';
import type { Simplify } from 'type-fest';

import StateContext from '../StateContext';
import DispatchContext from '../DispatchContext';
import type { GroupedEntry, GroupName } from '../../../../types.ts';

import { accordionReducer } from './reducers.ts';

type ContextProviderProps = PropsWithChildren<{
  groupedEntries: GroupedEntry[];
  defaultExpandedGroupNames?: GroupName[];
}>;

type StateContextType = ContextType<typeof StateContext>;
// type AccordionDispatchContextType = ContextType<typeof AccordionDispatchContext>;

const reducerActionTypes = {
  EXPAND_ACCORDION_ENTRY: 'EXPAND_ACCORDION_ENTRY',
  COLLAPSE_ACCORDION_ENTRY: 'COLLAPSE_ACCORDION_ENTRY',
  TOGGLE_ACCORDION_ENTRY: 'TOGGLE_ACCORDION_ENTRY',
  EXPAND_ALL_ACCORDION_ENTRIES: 'EXPAND_ALL_ACCORDION_ENTRIES',
  COLLAPSE_ALL_ACCORDION_ENTRIES: 'COLLAPSE_ALL_ACCORDION_ENTRIES',
} as const;

type ReducerActionPayloads = {
  [reducerActionTypes.EXPAND_ACCORDION_ENTRY]: { name: string };
  [reducerActionTypes.COLLAPSE_ACCORDION_ENTRY]: { name: string };
  [reducerActionTypes.TOGGLE_ACCORDION_ENTRY]: { name: GroupName; isExpanded: boolean };
  [reducerActionTypes.EXPAND_ALL_ACCORDION_ENTRIES]: undefined;
  [reducerActionTypes.COLLAPSE_ALL_ACCORDION_ENTRIES]: undefined;
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

export default function ContextProvider({
  groupedEntries,
  defaultExpandedGroupNames = [],
  children,
}: ContextProviderProps) {
  // todo: https://tkdodo.eu/blog/use-state-vs-use-reducer#passing-props-to-reducers
  // todo: https://overreacted.io/a-complete-guide-to-useeffect/#why-usereducer-is-the-cheat-mode-of-hooks
  const [accordionState, dispatchAccordionAction] = useReducer(
    accordionReducer,
    undefined,
    (): StateContextType => {
      const accordionEntries = groupedEntries.map(({ name, entries }) => ({
        name,
        entries,
        isExpanded: defaultExpandedGroupNames.includes(name),
      }));

      const namesOfExpandedGroups = accordionEntries
        .filter(({ isExpanded }) => isExpanded)
        .map(({ name }) => name);

      return {
        accordionEntries,
        namesOfExpandedGroups,
      };
    },
  );

  return (
    <StateContext value={accordionState}>
      <DispatchContext value={dispatchAccordionAction}>{children}</DispatchContext>
    </StateContext>
  );
}
