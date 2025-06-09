import { use, type SyntheticEvent, type PropsWithChildren } from 'react';

import AccordionStateContext from '../../contexts/AccordionStateContext';
import AccordionDispatchContext from '../../contexts/AccordionDispatchContext';

import type { GroupName } from '../../../../types.ts';

import { detailsWrapper, details, summary, content, debugString } from './styles.css.ts';

type AccordionDetailsProps = PropsWithChildren;

const listFormatter = new Intl.ListFormat('en-GB', {
  style: 'long',
  type: 'conjunction',
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function AccordionDetails({ children }: AccordionDetailsProps) {
  const { accordionEntries, namesOfExpandedGroups } = use(AccordionStateContext);
  const dispatchAccordionAction = use(AccordionDispatchContext);

  // Note: onToggle fires on mount for details elements that are expanded by default
  // ToggleEventHandler<HTMLDetailsElement> causes TS error
  const handleToggle =
    (name: GroupName) =>
    (event: SyntheticEvent<HTMLDetailsElement>): void => {
      event.preventDefault();

      const shouldNowBeExpanded = event.currentTarget.open;

      // ignore toggle calls when open attribute is changed programmatically, e.g. on load or through state changes
      if (
        (shouldNowBeExpanded && namesOfExpandedGroups.includes(name))
        || (!shouldNowBeExpanded && !namesOfExpandedGroups.includes(name))
      ) {
        return;
      }

      console.info(`${name} was toggled to`, shouldNowBeExpanded ? 'expanded' : 'collapsed');

      dispatchAccordionAction({
        type: 'TOGGLE_ACCORDION_ENTRY',
        payload: {
          name,
          isExpanded: shouldNowBeExpanded,
        },
      });
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
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
          <div
            className={content}
            onClick={(event) => event.stopPropagation()}
            onKeyDown={(event) => event.stopPropagation()}
          >
            <span>{listFormatter.format(entries)}</span>
          </div>
        </details>
      ))}
    </div>
  );
}
