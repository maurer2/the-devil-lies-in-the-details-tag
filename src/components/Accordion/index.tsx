import { type MouseEvent } from 'react';

import { detailsWrapper, details, summary, content, debugString } from './styles.css.ts';
import type { GroupedEntry } from '../../types.ts';

type DetailsProps = {
  data: GroupedEntry[];
  onEntryToggle: (groupName: string) => void;
};

const listFormatter = new Intl.ListFormat('en-GB', {
  style: 'long',
  type: 'conjunction',
});

export default function Accordion({ data, onEntryToggle }: DetailsProps) {
  const handleToggle =
    (groupName: GroupedEntry['groupName']) => (event: MouseEvent<HTMLDetailsElement>) => {
      event.preventDefault();
      console.log(`${groupName} toggled`);

      onEntryToggle(groupName);
    };

  return (
    <div className={detailsWrapper}>
      {data.map(({ groupName, entries, isExpanded }) => (
        <details
          open={isExpanded}
          onClick={handleToggle(groupName)}
          key={groupName}
          className={details}
          name="accordion"
        >
          <summary className={summary}>
            {groupName} <span className={debugString}>{isExpanded ? 'open' : 'not open'}</span>
          </summary>
          <div className={content} onClick={(event) => event.stopPropagation()}>
            <span>{listFormatter.format(entries)}</span>
          </div>
        </details>
      ))}
    </div>
  );
}
