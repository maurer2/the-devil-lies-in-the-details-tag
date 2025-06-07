import { catNames } from 'cat-names';

import Accordion from './components/Accordion';
import Menu from './components/Menu';
import DebugList from './components/DebugList';

import { wrapper, pageTitle } from './app.css.ts';
import type { GroupedEntry } from './types.ts';

const hasEntriesInGroup = <T extends Array<unknown>>(
  entry: [PropertyKey, T | undefined],
): entry is [PropertyKey, T] => {
  return Boolean(entry[1]?.length);
};

const catNamesGroupedByFirstLetter = Object.entries(
  Object.groupBy(catNames, (name) => name[0].toUpperCase()),
).filter((entry) => hasEntriesInGroup(entry));

const defaultExpandedGroupNames = ['B', 'C', 'F'];

export default function App() {
  const groupedEntries: GroupedEntry[] = catNamesGroupedByFirstLetter.map(([name, entries]) => ({
    name,
    entries,
  }));

  // ensure that Accordion will be reset when defaultExpandedGroupNames are updated so that state initializer function is run again with current data
  const accordionComponentKey = JSON.stringify(defaultExpandedGroupNames);

  return (
    <main className={wrapper}>
      <h1 className={pageTitle}>Accordion</h1>

      <p>
        Searching for <span>Abby</span> when accordion is closed to see a state mismatch between
        component state and the DOM.
      </p>

      <Accordion
        groupedEntries={groupedEntries}
        key={accordionComponentKey}
        defaultExpandedGroupNames={defaultExpandedGroupNames}
      >
        <Menu />
      </Accordion>

      <hr />

      <DebugList groupedEntries={groupedEntries} />
    </main>
  );
}
