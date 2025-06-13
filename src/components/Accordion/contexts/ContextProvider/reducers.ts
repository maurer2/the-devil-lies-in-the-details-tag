import type { ContextType } from 'react';

import AccordionStateContext from '../StateContext/index.tsx';

import type { AccordionEntry } from '../../../../types.ts';

import type { ReducerActions } from '.';

type AccordionStateContextType = ContextType<typeof AccordionStateContext>;

const getNamesOfExpandedAccordionEntries = (accordionEntries: AccordionEntry[]) =>
  accordionEntries.filter(({ isExpanded }) => isExpanded).map(({ name }) => name);

export const accordionReducer = (
  state: AccordionStateContextType,
  action: ReducerActions,
): AccordionStateContextType => {
  const { accordionEntries } = state;
  const { type } = action;

  const newState = (() => {
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

        return {
          ...state,
          accordionEntries: newAccordionEntries,
          namesOfExpandedGroups: null, // force type error if calculations for derived state are omitted
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

        return {
          ...state,
          accordionEntries: newAccordionEntries,
          namesOfExpandedGroups: null,
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

        return {
          ...state,
          accordionEntries: newAccordionEntries,
          namesOfExpandedGroups: null,
        };
      }
      case 'EXPAND_ALL_ACCORDION_ENTRIES': {
        const newAccordionEntries = accordionEntries.map((entry) => ({
          ...entry,
          isExpanded: true,
        }));

        return {
          ...state,
          accordionEntries: newAccordionEntries,
          namesOfExpandedGroups: null,
        };
      }
      case 'COLLAPSE_ALL_ACCORDION_ENTRIES': {
        const newAccordionEntries = accordionEntries.map((entry) => ({
          ...entry,
          isExpanded: false,
        }));

        return {
          ...state,
          accordionEntries: newAccordionEntries,
          namesOfExpandedGroups: null,
        };
      }
      default: {
        return type satisfies never;
      }
    }
  })();

  const newDerivedState = {
    namesOfExpandedGroups: getNamesOfExpandedAccordionEntries(newState.accordionEntries),
  };

  return {
    ...newState,
    ...newDerivedState,
  };
};
