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
}>;

export const AccordionContext = createContext<AccordionContextState>({
  accordionEntries: [],
  defaultExpandedGroupNames: [],
});

const reducerActionTypes = {
  TOGGLE_ACCORDION_ENTRY: 'TOGGLE_ACCORDION_ENTRY',
  EXPAND_ALL_ACCORDION_ENTRIES: 'EXPAND_ALL_ACCORDION_ENTRIES',
  COLLAPSE_ALL_ACCORDION_ENTRIES: 'COLLAPSE_ALL_ACCORDION_ENTRIES',
  EXPAND_ACCORDION_ENTRY: 'EXPAND_ACCORDION_ENTRY',
  COLLAPSE_ACCORDION_ENTRY: 'COLLAPSE_ACCORDION_ENTRY',
} as const;

type ReducerPayloads = {
  [reducerActionTypes.TOGGLE_ACCORDION_ENTRY]: { name: string };
  [reducerActionTypes.EXPAND_ALL_ACCORDION_ENTRIES]: undefined;
  [reducerActionTypes.COLLAPSE_ALL_ACCORDION_ENTRIES]: undefined;
  [reducerActionTypes.EXPAND_ACCORDION_ENTRY]: { name: string; name2: boolean };
  [reducerActionTypes.COLLAPSE_ACCORDION_ENTRY]: { name: string };
};

type ReducerActionNames = Simplify<keyof ReducerPayloads>;

type ReducerActions = {
  [K in ReducerActionNames]: ReducerPayloads[K] extends undefined
    ? {
        type: K;
      }
    : {
        type: K;
        payload: ReducerPayloads[K];
      };
}[ReducerActionNames];

const acccordionReducer = (
  state: AccordionContextState,
  action: ReducerActions,
): AccordionContextState => {
  switch (action.type) {
    case 'TOGGLE_ACCORDION_ENTRY': {
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
    case 'EXPAND_ALL_ACCORDION_ENTRIES': {
      // const { payload } = action; // error

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
  const [accordionEntries, setAccordionEntries] = useState<AccordionEntry[]>(() =>
    groupedEntries.map(({ name, entries }) => ({
      name,
      entries,
      isExpanded: defaultExpandedGroupNames.includes(name),
    })),
  );
  const namesOfExpandedGroups = useMemo(
    () => accordionEntries.filter(({ isExpanded }) => isExpanded).map(({ name }) => name),
    [accordionEntries],
  );

  const handleCollapseButtonClick = (): void => {
    setAccordionEntries((prevEntries) =>
      prevEntries.map((entry) => ({
        ...entry,
        isExpanded: false,
      })),
    );
  };

  const handleExpandButtonClick = (): void => {
    setAccordionEntries((prevEntries) =>
      prevEntries.map((entry) => ({
        ...entry,
        isExpanded: true,
      })),
    );
  };

  const handleAccordionEntryToggle = (name: GroupName, isExpanded: boolean): void => {
    setAccordionEntries((prevEntries) =>
      prevEntries.map((entry) =>
        entry.name === name
          ? {
              ...entry,
              isExpanded,
            }
          : entry,
      ),
    );
  };

  const accordionContextValues = useMemo<AccordionContextState>(
    () => ({
      accordionEntries,
      defaultExpandedGroupNames: [],
      setAccordionEntries,
    }),
    [accordionEntries, setAccordionEntries],
  );

  return (
    <AccordionContext value={accordionContextValues}>
      <div className={detailsWrapper}>
        <AccordionToggleButtons
          accordionEntries={accordionEntries}
          namesOfExpandedGroups={namesOfExpandedGroups}
          onExpandButtonClick={handleExpandButtonClick}
          onCollapseButtonClick={handleCollapseButtonClick}
        />

        <AccordionDetails
          accordionEntries={accordionEntries}
          namesOfExpandedGroups={namesOfExpandedGroups}
          onAccordionEntryToggle={handleAccordionEntryToggle}
        />
      </div>
    </AccordionContext>
  );
}
