import { catNames } from 'cat-names';
import { Fragment } from 'react';
import { wrapper, pageTitle, debugList, debugListKey, debugListValue } from './app.css.ts';

const catNamesGroupedByFirstLetter = Object.entries(
  Object.groupBy(catNames, (name) => name[0].toUpperCase()),
).filter((entry, _): entry is [string, string[]] => Boolean(entry));

function App() {
  const catNamesGroupedByFirstLetterCount = catNamesGroupedByFirstLetter.length;
  console.dir(catNamesGroupedByFirstLetterCount, catNamesGroupedByFirstLetter);

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
