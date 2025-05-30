import { catNames } from 'cat-names';
import { Fragment } from 'react';
import { wrapper, pageTitle, debugList, debugListKey, debugListValue } from './app.css.ts';

const hasEntriesInGroup = <T extends Array<unknown>>(
  entry: [PropertyKey, T | undefined],
): entry is [PropertyKey, T] => {
  return Boolean(entry[1]?.length);
};

const catNamesGroupedByFirstLetter = Object.entries(
  Object.groupBy(catNames, (name) => name[0].toUpperCase()),
).filter((entry) => hasEntriesInGroup(entry));

function App() {
  console.log(catNamesGroupedByFirstLetter.length);
  console.dir(catNamesGroupedByFirstLetter);

  return (
    <main className={wrapper}>
      <h1 className={pageTitle}>Accordion</h1>
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
