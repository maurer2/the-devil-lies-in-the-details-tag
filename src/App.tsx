import { useState, useCallback } from 'react';
import { catNames } from 'cat-names';

import { wrapper, pageTitle, groupNav } from './app.css.ts';
import Accordion from './components/Accordion';
import DebugList from './components/DebugList';
import type { GroupedEntry } from './types.ts';

const hasEntriesInGroup = <T extends Array<unknown>>(
  entry: [PropertyKey, T | undefined],
): entry is [PropertyKey, T] => {
  return Boolean(entry[1]?.length);
};

const catNamesGroupedByFirstLetter = Object.entries(
  Object.groupBy(catNames, (name) => name[0].toUpperCase()),
).filter((entry) => hasEntriesInGroup(entry));

function App() {
  const [entries, setEntries] = useState<GroupedEntry[]>(() =>
    catNamesGroupedByFirstLetter.map(([groupName, entries]) => ({
      groupName,
      entries,
      isExpanded: false,
    })),
  );

  const handleEntryToggle = useCallback(
    (groupName: GroupedEntry['groupName']) => {
      setEntries((prevEntries) =>
        prevEntries.map((entry) =>
          entry.groupName === groupName ? { ...entry, isExpanded: !entry.isExpanded } : entry,
        ),
      );
    },
    [setEntries],
  );

  return (
    <main className={wrapper}>
      <h1 className={pageTitle}>Accordion</h1>

      <nav className={groupNav} aria-label="Accordion groups">
        {catNamesGroupedByFirstLetter.map(([groupName]) => (
          <button key={groupName} onClick={() => {}}>
            {groupName}
          </button>
        ))}
      </nav>

      <p>
        Searching for <span>Abby</span> when accordion is closed to see a state mismatch between
        component state and the DOM.
      </p>

      <Accordion data={entries} onEntryToggle={handleEntryToggle} />

      <hr />

      <DebugList data={entries} />
    </main>
  );
}

export default App;
