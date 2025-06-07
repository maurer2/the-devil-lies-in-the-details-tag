import { useState, useMemo, createContext, useReducer, type PropsWithChildren } from 'react';
import type { Simplify } from 'type-fest';

import AccordionDetails from './components/AccordionDetails';
import AccordionToggleButtons from './components/AccordionToggleButtons';
import { detailsWrapper } from './styles.css.ts';
import type { GroupedEntry, GroupName } from '../../types.ts';

type AccordionProps = PropsWithChildren<{
  groupedEntries: GroupedEntry[];
  defaultExpandedGroupNames?: GroupName[];
}>;

type AccordionEntry = Simplify<
  GroupedEntry & {
    isExpanded: boolean;
  }
>;

type AccordionContextState = Simplify<{
  accordionEntries: AccordionEntry[];
  defaultExpandedGroupNames: GroupName[];
  namesOfExpandedGroups: string[];
}>;

export const AccordionContext = createContext<AccordionContextState>({
  accordionEntries: [],
  defaultExpandedGroupNames: [],
  namesOfExpandedGroups: [],
});

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

type ReducerActions = {
  [K in ReducerActionNames]: ReducerActionPayloads[K] extends undefined
    ? {
        type: K;
      }
    : {
        type: K;
        payload: ReducerActionPayloads[K];
      };
}[ReducerActionNames];

const accordionReducer =
  // ({ defaultExpandedGroupNames, groupedEntries }: AccordionProps) =>
  (state: AccordionContextState, action: ReducerActions): AccordionContextState => {
    switch (action.type) {
      case 'TOGGLE_ACCORDION_ENTRY': {
        const { payload } = action;
        return {
          ...state,
        };
      }
      case 'EXPAND_ALL_ACCORDION_ENTRIES': {
        // const { payload } = action; // error
        return {
          ...state,
        };
      }
      case 'COLLAPSE_ALL_ACCORDION_ENTRIES': {
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

export default function Accordion({
  groupedEntries,
  defaultExpandedGroupNames = [],
  children,
}: AccordionProps) {
  // https://tkdodo.eu/blog/use-state-vs-use-reducer#passing-props-to-reducers
  // https://overreacted.io/a-complete-guide-to-useeffect/#why-usereducer-is-the-cheat-mode-of-hooks
  const [accordionState, accordionDispatch] = useReducer(
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

  // const handleCollapseButtonClick = (): void => {
  //   setAccordionEntries((prevEntries) =>
  //     prevEntries.map((entry) => ({
  //       ...entry,
  //       isExpanded: false,
  //     })),
  //   );
  // };

  // const handleExpandButtonClick = (): void => {
  //   setAccordionEntries((prevEntries) =>
  //     prevEntries.map((entry) => ({
  //       ...entry,
  //       isExpanded: true,
  //     })),
  //   );
  // };

  // const handleAccordionEntryToggle = (name: GroupName, isExpanded: boolean): void => {
  //   setAccordionEntries((prevEntries) =>
  //     prevEntries.map((entry) =>
  //       entry.name === name
  //         ? {
  //             ...entry,
  //             isExpanded,
  //           }
  //         : entry,
  //     ),
  //   );
  // };

  const accordionContextValues = useMemo<AccordionContextState>(
    () => accordionState,
    [accordionState],
  );

  return (
    <AccordionContext value={accordionContextValues}>
      <div className={detailsWrapper}>
        <AccordionToggleButtons />
        <AccordionDetails />
      </div>
    </AccordionContext>
  );
}
