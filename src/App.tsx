import { Fragment, useState, useCallback, type ComponentPropsWithRef } from 'react';
import { catNames } from 'cat-names';

import { wrapper, pageTitle, debugList, debugListKey, debugListValue } from './app.css.ts';
import Accordion from './components/Accordion/index.tsx';

type AccordionProps = ComponentPropsWithRef<typeof Accordion>;
type GroupName = AccordionProps['data'][number]['groupName'];

const hasEntriesInGroup = <T extends Array<unknown>>(
  entry: [PropertyKey, T | undefined],
): entry is [PropertyKey, T] => {
  return Boolean(entry[1]?.length);
};

const catNamesGroupedByFirstLetter = Object.entries(
  Object.groupBy(catNames, (name) => name[0].toUpperCase()),
).filter((entry) => hasEntriesInGroup(entry));

function App() {
  const [entries, setEntries] = useState<AccordionProps['data']>(() =>
    catNamesGroupedByFirstLetter.map(([groupName, entries]) => ({
      groupName,
      entries,
      isExpanded: false,
    })),
  );

  const handleEntryToggle = useCallback(
    (groupName: GroupName) => {
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

      <Accordion data={entries} onEntryToggle={handleEntryToggle} />

      <hr />

      <dl className={debugList}>
        {catNamesGroupedByFirstLetter.map(([groupName, groupEntries]) => (
          <Fragment key={groupName}>
            <dt className={debugListKey}>{groupName}</dt>
            {groupEntries.map((entryName) => (
              <dd className={debugListValue} key={entryName}>
                {entryName}
              </dd>
            ))}
          </Fragment>
        ))}
      </dl>
    </main>
  );
}

export default App;
