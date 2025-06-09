import { Fragment } from 'react';

import type { GroupedEntry } from '../../types.ts';

import { debugList, debugListKey, debugListValue } from './styles.css.ts';

type DebugListProps = {
  groupedEntries: GroupedEntry[];
};

export default function DebugList({ groupedEntries }: DebugListProps) {
  return (
    <dl className={debugList} inert>
      {/* "inert" attribute to exclude it from search */}
      {groupedEntries.map(({ name, entries }) => (
        <Fragment key={name}>
          <dt className={debugListKey}>{name}</dt>
          {entries.map((entryName) => (
            <dd className={debugListValue} key={entryName}>
              {entryName}
            </dd>
          ))}
        </Fragment>
      ))}
    </dl>
  );
}
