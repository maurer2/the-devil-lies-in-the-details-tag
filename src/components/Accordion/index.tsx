import {
  useState,
  useMemo,
  type SyntheticEvent,
  /* type ToggleEventHandler, */
} from 'react';

import {
  detailsWrapper,
  details,
  summary,
  content,
  debugString,
  toggleButtonGroup,
  toggleButton,
} from './styles.css.ts';
import type { GroupedEntry } from '../../types.ts';

type DetailsProps = {
  groupedEntries: GroupedEntry[];
};

type AccordionEntry = GroupedEntry & {
  isExpanded: boolean;
};

type GroupName = GroupedEntry['name'];

const listFormatter = new Intl.ListFormat('en-GB', {
  style: 'long',
  type: 'conjunction',
});

// const getToggledEntries = (
//   entries: AccordionEntry[],
//   toggledEntryName: GroupName,
//   // keepStateOfNonToggledEntries = false,
// ) => {
//   return entries.map((entry) =>
//     entry.name === toggledEntryName
//       ? {
//           ...entry,
//           isExpanded: !entry.isExpanded,
//         }
//       : {
//           ...entry,
//           isExpanded: false,
//         },
//   );
// };

export default function Accordion({ groupedEntries }: DetailsProps) {
  const [entries, setEntries] = useState<AccordionEntry[]>(() =>
    groupedEntries.map(({ name, entries }, index) => ({
      name,
      entries,
      isExpanded: index === 1,
    })),
  );
  const namesOfOpenEntries = useMemo(
    () => entries.filter(({ isExpanded }) => isExpanded).map(({ name }) => name),
    [entries],
  );

  // Note: onToggle fires on mount for details elements that are expanded by default
  // ToggleEventHandler<HTMLDetailsElement> causes TS error
  const handleToggle =
    (name: GroupName) =>
    (event: SyntheticEvent<HTMLDetailsElement>): void => {
      event.preventDefault();

      const isExpanded = event.currentTarget.open;

      // ignore onToggle calls on mount for elements that are expanded by default
      if (isExpanded && namesOfOpenEntries.includes(name)) {
        return;
      }
      console.log(`${name} was toggled to`, isExpanded ? 'open' : 'not open');

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

  const hasCollapsibleEntries = Boolean(namesOfOpenEntries.length);
  const hasExpandableEntries = namesOfOpenEntries.length !== entries.length;

  return (
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

      {entries.map(({ name, entries, isExpanded }) => (
        <details
          open={isExpanded}
          onToggle={handleToggle(name)}
          key={name}
          className={details}
          // name="accordion" // same name for all details tag to allow only one details tag to be expanded
        >
          <summary className={summary}>
            {name} <span className={debugString}>{isExpanded ? 'open' : 'not open'}</span>
          </summary>
          <div className={content} onClick={(event) => event.stopPropagation()}>
            <span>{listFormatter.format(entries)}</span>
          </div>
        </details>
      ))}
    </div>
  );
}
