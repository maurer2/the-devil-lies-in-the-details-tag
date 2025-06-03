import {
  useState,
  /* type MouseEvent, */
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

// const getToggledEntries = (
//   entries: AccordionEntry[],
//   toggledEntryName: GroupName,
//   // keepStateOfNonToggledEntries = false,
// ) => {
//   return entries.map((entry) =>
//     entry.name === toggledEntryName
//       ? {
//           ...entry,
//           isExpanded: !entry.isExpanded,
//         }
//       : {
//           ...entry,
//           isExpanded: false,
//         },
//   );
// };

export default function Accordion({ groupedEntries }: DetailsProps) {
  const [entries, setEntries] = useState<AccordionEntry[]>(() =>
    groupedEntries.map(({ name, entries }, index) => ({
      name,
      entries,
      isExpanded: index === 1,
    })),
  );

  // const handleClick =
  //   (name: GroupName) =>
  //   (event: MouseEvent<HTMLDetailsElement>): void => {
  //     event.preventDefault();
  //     console.log(`${name} changed on click`);

  //     startTransition(() => {
  //       setEntries((prevEntries) =>
  //         prevEntries.map((entry) =>
  //           entry.name === name
  //             ? {
  //                 ...entry,
  //                 isExpanded: !entry.isExpanded,
  //               }
  //             : {
  //                 ...entry,
  //                 isExpanded: false,
  //               },
  //         ),
  //       );
  //     });
  //   };

  // Note: onToggle fires on mount for details elements that are expanded by default
  // ToggleEventHandler<HTMLDetailsElement> causes TS error
  const handleToggle =
    (name: GroupName) =>
    (event: SyntheticEvent<HTMLDetailsElement>): void => {
      event.preventDefault();

      const isExpanded = event.currentTarget.open;
      const nameOfOpenElements = entries
        .filter((entry) => entry.isExpanded)
        .map(({ name }) => name);

      // ignore onToggle calls on mount for elements that are expanded by default
      if (isExpanded && nameOfOpenElements.includes(name)) {
        return;
      }

      console.log(`${name} changed on toggle to`, isExpanded);

      setEntries((prevEntries) =>
        prevEntries.map((entry) =>
          entry.name === name
            ? {
                ...entry,
                isExpanded,
              }
            : entry,
        ),
      );
    };

  return (
    <div className={detailsWrapper}>
      {entries.map(({ name, entries, isExpanded }) => (
        <details
          open={isExpanded}
          // onClick={handleClick(name)}
          onToggle={handleToggle(name)}
          key={name}
          className={details}
          name="accordion" // same name for all details tag to allow only one details tag to be expanded
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
