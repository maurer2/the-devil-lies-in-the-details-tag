import { useReducer, type PropsWithChildren, type ContextType } from 'react';
import type { Simplify } from 'type-fest';

import AccordionStateContext from '../AccordionStateContext';
import AccordionDispatchContext from '../AccordionDispatchContext';

import type { GroupedEntry, GroupName } from '../../../../types.ts';

import { accordionReducer } from './reducers.ts';

type AccordionContextProviderProps = PropsWithChildren<{
  groupedEntries: GroupedEntry[];
  defaultExpandedGroupNames?: GroupName[];
}>;

type AccordionStateContextType = ContextType<typeof AccordionStateContext>;
// type AccordionDispatchContextType = ContextType<typeof AccordionDispatchContext>;

const accordionReducerActionTypes = {
  EXPAND_ACCORDION_ENTRY: 'EXPAND_ACCORDION_ENTRY',
  COLLAPSE_ACCORDION_ENTRY: 'COLLAPSE_ACCORDION_ENTRY',
  TOGGLE_ACCORDION_ENTRY: 'TOGGLE_ACCORDION_ENTRY',
  EXPAND_ALL_ACCORDION_ENTRIES: 'EXPAND_ALL_ACCORDION_ENTRIES',
  COLLAPSE_ALL_ACCORDION_ENTRIES: 'COLLAPSE_ALL_ACCORDION_ENTRIES',
} as const;

type AccordionReducerActionPayloads = {
  [accordionReducerActionTypes.EXPAND_ACCORDION_ENTRY]: { name: string };
  [accordionReducerActionTypes.COLLAPSE_ACCORDION_ENTRY]: { name: string };
  [accordionReducerActionTypes.TOGGLE_ACCORDION_ENTRY]: { name: GroupName; isExpanded: boolean };
  [accordionReducerActionTypes.EXPAND_ALL_ACCORDION_ENTRIES]: undefined;
  [accordionReducerActionTypes.COLLAPSE_ALL_ACCORDION_ENTRIES]: undefined;
};

type AccordionReducerActionNames = Simplify<keyof AccordionReducerActionPayloads>;

export type AccordionReducerActions = {
  [K in AccordionReducerActionNames]: AccordionReducerActionPayloads[K] extends undefined
    ? {
        type: K;
      }
    : {
        type: K;
        payload: AccordionReducerActionPayloads[K];
      };
}[AccordionReducerActionNames];

export default function AccordionContextProvider({
  groupedEntries,
  defaultExpandedGroupNames = [],
  children,
}: AccordionContextProviderProps) {
  // todo: https://tkdodo.eu/blog/use-state-vs-use-reducer#passing-props-to-reducers
  // todo: https://overreacted.io/a-complete-guide-to-useeffect/#why-usereducer-is-the-cheat-mode-of-hooks
  const [accordionState, dispatchAccordionAction] = useReducer(
    accordionReducer,
    undefined,
    (): AccordionStateContextType => {
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
    <AccordionStateContext value={accordionState}>
      <AccordionDispatchContext value={dispatchAccordionAction}>
        {children}
      </AccordionDispatchContext>
    </AccordionStateContext>
  );
}
