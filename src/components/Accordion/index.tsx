import { useState, type MouseEvent } from 'react';

import { detailsWrapper, details, summary, content, debugString } from './styles.css.ts';
import type { GroupedEntry } from '../../types.ts';

type AccordionEntry = GroupedEntry & {
  isExpanded: boolean;
};

type DetailsProps = {
  groupedEntries: GroupedEntry[];
};

type GroupName = GroupedEntry['name'];

const listFormatter = new Intl.ListFormat('en-GB', {
  style: 'long',
  type: 'conjunction',
});

export default function Accordion({ groupedEntries }: DetailsProps) {
  const [entries, setEntries] = useState<AccordionEntry[]>(() =>
    groupedEntries.map(({ name, entries }) => ({
      name,
      entries,
      isExpanded: false,
    })),
  );

  const handleToggle = (name: GroupName) => (event: MouseEvent<HTMLDetailsElement>) => {
    event.preventDefault();
    console.log(`${name} toggled`);

    setEntries((prevEntries) =>
      prevEntries.map((entry) =>
        entry.name === name
          ? {
              ...entry,
              isExpanded: !entry.isExpanded,
            }
          : {
              ...entry,
              isExpanded: false,
            },
      ),
    );
  };

  return (
    <div className={detailsWrapper}>
      {entries.map(({ name, entries, isExpanded }) => (
        <details
          open={isExpanded}
          onClick={handleToggle(name)}
          key={name}
          className={details}
          name="accordion"
        >
          <summary className={summary}>
            {name} <span className={debugString}>{isExpanded ? 'open' : 'not open'}</span>
          </summary>
          <div className={content} onClick={(event) => event.stopPropagation()}>
            <span>{listFormatter.format(entries)}</span>
          </div>
        </details>
      ))}
    </div>
  );
}
