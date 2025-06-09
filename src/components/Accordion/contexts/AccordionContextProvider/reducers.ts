import type { ContextType } from 'react';

import AccordionStateContext from '../AccordionStateContext';

import type { AccordionEntry } from '../../../../types.ts';

import type { AccordionReducerActions } from '.';

type AccordionStateContextType = ContextType<typeof AccordionStateContext>;

// todo: better approach for derived state
const getNamesOfExpandedAccordionEntries = (accordionEntries: AccordionEntry[]) =>
  accordionEntries.filter(({ isExpanded }) => isExpanded).map(({ name }) => name);

export const accordionReducer = (
  state: AccordionStateContextType,
  action: AccordionReducerActions,
): AccordionStateContextType => {
  const { accordionEntries } = state;
  const { type } = action;

  switch (type) {
    case 'EXPAND_ACCORDION_ENTRY': {
      const { name } = action.payload;

      const newAccordionEntries = accordionEntries.map((entry) =>
        entry.name === name
          ? {
              ...entry,
              isExpanded: true,
            }
          : entry,
      );
      const namesOfExpandedGroups = getNamesOfExpandedAccordionEntries(newAccordionEntries);

      return {
        ...state,
        accordionEntries: newAccordionEntries,
        namesOfExpandedGroups,
      };
    }
    case 'COLLAPSE_ACCORDION_ENTRY': {
      const { name } = action.payload;

      const newAccordionEntries = accordionEntries.map((entry) =>
        entry.name === name
          ? {
              ...entry,
              isExpanded: false,
            }
          : entry,
      );
      const namesOfExpandedGroups = getNamesOfExpandedAccordionEntries(newAccordionEntries);

      return {
        ...state,
        accordionEntries: newAccordionEntries,
        namesOfExpandedGroups,
      };
    }
    case 'TOGGLE_ACCORDION_ENTRY': {
      const { name, isExpanded } = action.payload;

      const newAccordionEntries = accordionEntries.map((entry) =>
        entry.name === name
          ? {
              ...entry,
              isExpanded,
            }
          : entry,
      );
      const namesOfExpandedGroups = getNamesOfExpandedAccordionEntries(newAccordionEntries);

      return {
        ...state,
        accordionEntries: newAccordionEntries,
        namesOfExpandedGroups,
      };
    }
    case 'EXPAND_ALL_ACCORDION_ENTRIES': {
      const newAccordionEntries = accordionEntries.map((entry) => ({
        ...entry,
        isExpanded: true,
      }));
      const namesOfExpandedGroups = getNamesOfExpandedAccordionEntries(newAccordionEntries);

      return {
        ...state,
        accordionEntries: newAccordionEntries,
        namesOfExpandedGroups,
      };
    }
    case 'COLLAPSE_ALL_ACCORDION_ENTRIES': {
      const newAccordionEntries = accordionEntries.map((entry) => ({
        ...entry,
        isExpanded: false,
      }));
      const namesOfExpandedGroups = getNamesOfExpandedAccordionEntries(newAccordionEntries);

      return {
        ...state,
        accordionEntries: newAccordionEntries,
        namesOfExpandedGroups,
      };
    }
    default: {
      return type satisfies never;
    }
  }
};
