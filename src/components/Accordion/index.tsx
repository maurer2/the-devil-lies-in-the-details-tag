import { useState, useMemo, createContext, type PropsWithChildren } from 'react';
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
  setAccordionEntries: (entries: AccordionEntry[]) => void;
}>;

export const AccordionContext = createContext<AccordionContextState>({
  accordionEntries: [],
  defaultExpandedGroupNames: [],
  setAccordionEntries: () => {},
});

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
