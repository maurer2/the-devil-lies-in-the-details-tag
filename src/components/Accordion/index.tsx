import { useState, useMemo, createContext } from 'react';

import AccordionDetails from './components/AccordionDetails';
import AccordionToggleButtons from './components/AccordionToggleButtons';
import { detailsWrapper } from './styles.css.ts';
import type { GroupedEntry, GroupName } from '../../types.ts';

type DetailsProps = {
  groupedEntries: GroupedEntry[];
  defaultExpandedGroupNames?: GroupName[];
};

type AccordionEntry = GroupedEntry & {
  isExpanded: boolean;
};

export type AccordionContextState = {
  groupedEntries: AccordionEntry[];
  defaultExpandedGroupNames: GroupName[];
  selectedGroups: GroupName[];
  setGroupedEntries: (entries: AccordionEntry[]) => void;
};

const AccordionContext = createContext<AccordionContextState>({
  groupedEntries: [],
  selectedGroups: [],
  defaultExpandedGroupNames: [],
  setGroupedEntries: () => {},
});

export default function Accordion({
  groupedEntries,
  defaultExpandedGroupNames = [],
}: DetailsProps) {
  const [entries, setEntries] = useState<AccordionEntry[]>(() =>
    groupedEntries.map(({ name, entries }) => ({
      name,
      entries,
      isExpanded: defaultExpandedGroupNames.includes(name),
    })),
  );
  const accordionContextValues = useMemo<AccordionContextState>(
    () => ({
      groupedEntries: entries,
      selectedGroups: [],
      defaultExpandedGroupNames: [],
      setGroupedEntries: setEntries,
    }),
    [entries, setEntries],
  );
  const namesOfExpandedGroups = useMemo(
    () => entries.filter(({ isExpanded }) => isExpanded).map(({ name }) => name),
    [entries],
  );

  const handleCollapseButtonClick = (): void => {
    setEntries((prevEntries) =>
      prevEntries.map((entry) => ({
        ...entry,
        isExpanded: false,
      })),
    );
  };

  const handleExpandButtonClick = (): void => {
    setEntries((prevEntries) =>
      prevEntries.map((entry) => ({
        ...entry,
        isExpanded: true,
      })),
    );
  };

  const handleAccordionEntryToggle = (name: GroupName, isExpanded: boolean) => {
    setEntries((prevEntries) =>
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

  return (
    <AccordionContext.Provider value={accordionContextValues}>
      <div className={detailsWrapper}>
        <AccordionToggleButtons
          accordionEntries={entries}
          namesOfExpandedGroups={namesOfExpandedGroups}
          onExpandButtonClick={handleExpandButtonClick}
          onCollapseButtonClick={handleCollapseButtonClick}
        />

        <AccordionDetails
          accordionEntries={entries}
          namesOfExpandedGroups={namesOfExpandedGroups}
          onAccordionEntryToggle={handleAccordionEntryToggle}
        />
      </div>
    </AccordionContext.Provider>
  );
}
