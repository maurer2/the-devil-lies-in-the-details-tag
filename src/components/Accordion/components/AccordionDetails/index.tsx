import type { SyntheticEvent } from 'react';

import { detailsWrapper, details, summary, content, debugString } from './styles.css.ts';
import type { GroupedEntry, GroupName } from '../../../../types.ts';

type AccordionEntry = GroupedEntry & {
  isExpanded: boolean;
};

type DetailsProps = {
  accordionEntries: AccordionEntry[];
  namesOfExpandedGroups: GroupName[];
  onAccordionEntryToggle: (name: GroupName, isExpanded: boolean) => void;
};

const listFormatter = new Intl.ListFormat('en-GB', {
  style: 'long',
  type: 'conjunction',
});

export default function AccordionDetails({
  accordionEntries,
  namesOfExpandedGroups,
  onAccordionEntryToggle,
}: DetailsProps) {
  // Note: onToggle fires on mount for details elements that are expanded by default
  // ToggleEventHandler<HTMLDetailsElement> causes TS error
  const handleToggle =
    (name: GroupName) =>
    (event: SyntheticEvent<HTMLDetailsElement>): void => {
      event.preventDefault();

      const isExpanded = event.currentTarget.open;

      // ignore onToggle calls on mount for details elements that are expanded by default
      if (isExpanded && namesOfExpandedGroups.includes(name)) {
        return;
      }
      console.info(`${name} was toggled to`, isExpanded ? 'open' : 'not open');

      onAccordionEntryToggle(name, isExpanded);
    };

  return (
    <div className={detailsWrapper}>
      {accordionEntries.map(({ name, entries, isExpanded }) => (
        <details
          open={isExpanded}
          onToggle={handleToggle(name)}
          key={name}
          className={details}
          // name="accordion" // same name for all details tag to allow only one details tag to be expanded
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
