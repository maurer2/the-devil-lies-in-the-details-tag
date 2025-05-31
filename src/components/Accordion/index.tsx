import { type MouseEvent } from 'react';

import { detailsWrapper, details, summary, content } from './styles.css.ts';

type GroupedEntry = {
  groupName: string;
  entries: string[];
  isExpanded: boolean;
};

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
          <summary className={summary}>{groupName}</summary>
          <div className={content} onClick={(event) => event.stopPropagation()}>
            <p>{listFormatter.format(entries)}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
