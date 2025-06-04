// import type { MouseEvent } from 'react';
import { catNames } from 'cat-names';

import { wrapper, pageTitle, groupToggles, groupToggle } from './app.css.ts';
import Accordion from './components/Accordion';
import DebugList from './components/DebugList';
import type { GroupedEntry, GroupName } from './types.ts';

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

  // const handleGroupToggleClick =
  //   (name: GroupName) =>
  //   (event: MouseEvent<HTMLButtonElement>): void => {
  //     event.preventDefault();

  //     if (selectedGroups.includes(name)) {
  //       const newSelectedGroups = selectedGroups.filter((groupEntry) => groupEntry !== name);

  //       return setSelectedGroups(newSelectedGroups);
  //     }

  //     return setSelectedGroups(selectedGroups.concat(name));
  //   };

  // ensure that Accordion will be reset when selectedGroups are updated so that usesState initializer function is run again with current data
  const groupedEntriesKey = JSON.stringify(groupedEntries);

  return (
    <main className={wrapper}>
      <h1 className={pageTitle}>Accordion</h1>

      <p>
        Searching for <span>Abby</span> when accordion is closed to see a state mismatch between
        component state and the DOM.
      </p>

      <div className={groupToggles} role="group" aria-label="Accordion group toggles">
        {groupedEntries.map(({ name }) => (
          <button
            key={name}
            className={groupToggle}
            // onClick={handleGroupToggleClick(name)}
            // aria-pressed={selectedGroups.includes(name)}
          >
            {name}
          </button>
        ))}
      </div>

      <Accordion
        groupedEntries={groupedEntries}
        key={groupedEntriesKey}
        defaultExpandedGroupNames={['B']}
      />

      <hr />

      <DebugList groupedEntries={groupedEntries} />
    </main>
  );
}

export default App;
