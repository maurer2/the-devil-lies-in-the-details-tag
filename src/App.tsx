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
  const groupedEntries: GroupedEntry[] = catNamesGroupedByFirstLetter.map(([name, entries]) => ({
    name,
    entries,
  }));

  // ensure that Accordion would be reset/remounted if groupedEntries were to be made dynamic so that usesState initializer function is run again with current data
  const groupedEntriesKey = JSON.stringify(groupedEntries);

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

      <Accordion groupedEntries={groupedEntries} key={groupedEntriesKey} />

      <hr />

      <DebugList groupedEntries={groupedEntries} />
    </main>
  );
}

export default App;
