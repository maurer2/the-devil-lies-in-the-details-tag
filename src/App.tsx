import { useState } from 'react';
import { catNames } from 'cat-names';
import { sampleSize, randomInt } from 'es-toolkit';

import Accordion from './components/Accordion';
import Menu from './components/Menu';
import DebugList from './components/DebugList';
import Button from './components/Button';

import { wrapper, pageTitle, buttonGroup } from './app.css.ts';
import type { GroupName, GroupedEntry } from './types.ts';

const hasEntriesInGroup = <T extends Array<unknown>>(
  entry: [PropertyKey, T | undefined],
): entry is [PropertyKey, T] => {
  return Boolean(entry[1]?.length);
};

const catNamesGroupedByFirstLetter = Object.entries(
  Object.groupBy(catNames, (name) => name[0].toUpperCase()),
).filter((entry) => hasEntriesInGroup(entry));

const groupedEntries: GroupedEntry[] = catNamesGroupedByFirstLetter.map(([name, entries]) => ({
  name,
  entries,
}));

export default function App() {
  const [defaultExpandedGroupNames, setDefaultExpandedGroupNames] = useState<GroupName[]>(() => [
    groupedEntries[1].name,
    groupedEntries[2].name,
    groupedEntries[3].name,
  ]);

  const handleButtonClick = () => {
    const numberOfEntries = randomInt(1, groupedEntries.length);
    const newDefaultExpandedGroupEntries = sampleSize(groupedEntries, numberOfEntries).map(
      ({ name }) => name,
    );

    setDefaultExpandedGroupNames(newDefaultExpandedGroupEntries);
  };

  // ensure that Accordion will be reset when defaultExpandedGroupNames are updated so that state initializer function is run again with current data
  const accordionComponentKey = JSON.stringify(defaultExpandedGroupNames);

  return (
    <main className={wrapper}>
      <h1 className={pageTitle}>Accordion</h1>

      <p>
        Searching for <span>Abby</span> when accordion is closed to see a state mismatch between
        component state and the DOM.
      </p>

      <div className={buttonGroup}>
        <Button onClick={handleButtonClick} type="button">
          Random default expanded elements
        </Button>
      </div>

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
