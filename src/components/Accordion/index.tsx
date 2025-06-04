import { useState, useMemo, createContext } from 'react';

import AccordionDetails from './components/AccordionDetails';
import { detailsWrapper, toggleButtonGroup, toggleButton } from './styles.css.ts';
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

  const collapseAllEntries = (): void => {
    if (!hasCollapsibleEntries) {
      return;
    }
    setEntries((prevEntries) =>
      prevEntries.map((entry) => ({
        ...entry,
        isExpanded: false,
      })),
    );
  };

  const expandAllEntries = (): void => {
    if (!hasExpandableEntries) {
      return;
    }
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

  const hasCollapsibleEntries = Boolean(namesOfExpandedGroups.length);
  const hasExpandableEntries = namesOfExpandedGroups.length !== entries.length;

  return (
    <AccordionContext.Provider value={accordionContextValues}>
      <div className={detailsWrapper}>
        <div className={toggleButtonGroup} role="group" aria-label="Collapse and Expand buttons">
          <button
            type="button"
            className={toggleButton}
            onClick={collapseAllEntries}
            aria-disabled={!hasCollapsibleEntries}
            aria-label="Collapse all entries"
          >
            Collapse
          </button>
          <button
            type="button"
            className={toggleButton}
            onClick={expandAllEntries}
            aria-disabled={!hasExpandableEntries}
            aria-label="Expand all entries"
          >
            Expand
          </button>
        </div>

        <AccordionDetails
          accordionEntries={entries}
          onAccordionEntryToggle={handleAccordionEntryToggle}
        />
      </div>
    </AccordionContext.Provider>
  );
}
