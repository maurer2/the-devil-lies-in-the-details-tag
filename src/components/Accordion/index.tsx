import {
  useState,
  type MouseEvent,
  type SyntheticEvent,
  /* type ToggleEventHandler, */
} from 'react';

import { detailsWrapper, details, summary, content, debugString } from './styles.css.ts';
import type { GroupedEntry } from '../../types.ts';

type DetailsProps = {
  groupedEntries: GroupedEntry[];
};

type AccordionEntry = GroupedEntry & {
  isExpanded: boolean;
};

type GroupName = GroupedEntry['name'];

const listFormatter = new Intl.ListFormat('en-GB', {
  style: 'long',
  type: 'conjunction',
});

export default function Accordion({ groupedEntries }: DetailsProps) {
  const [entries, setEntries] = useState<AccordionEntry[]>(() =>
    groupedEntries.map(({ name, entries }, index) => ({
      name,
      entries,
      isExpanded: index === 1,
    })),
  );

  const handleClick = (name: GroupName) => (event: MouseEvent<HTMLDetailsElement>) => {
    event.preventDefault();
    console.log(`${name} changed on click`);

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

  // ToggleEventHandler<HTMLDetailsElement> doesn't work
  const handleToggle = (name: GroupName) => (event: SyntheticEvent<HTMLDetailsElement>) => {
    // Note: onToggle fires on mount for details elements that are expanded by default
    console.log(`${name} changed on toggle`, event.currentTarget.open);

    // todo: move setEntries logic to handleToggle to avoid state mismatch when search function triggers toggle
  };

  return (
    <div className={detailsWrapper}>
      {entries.map(({ name, entries, isExpanded }) => (
        <details
          open={isExpanded}
          onClick={handleClick(name)}
          onToggle={handleToggle(name)}
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
