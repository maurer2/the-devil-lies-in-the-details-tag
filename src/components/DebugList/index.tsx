import { Fragment } from 'react';

import { debugList, debugListKey, debugListValue } from './styles.css.ts';
import type { GroupedEntry } from '../../types.ts';

type DebugListProps = {
  data: GroupedEntry[];
};

export default function DebugList({ data }: DebugListProps) {
  return (
    <dl className={debugList} inert>
      {/* "inert" attribute to exclude it from search */}
      {data.map(({ groupName, entries }) => (
        <Fragment key={groupName}>
          <dt className={debugListKey}>{groupName}</dt>
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
