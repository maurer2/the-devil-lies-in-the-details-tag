import { use, type SyntheticEvent, type PropsWithChildren } from 'react';

import AccordionStateContext from '../../contexts/StateContext/index.tsx';
import DispatchContext from '../../contexts/DispatchContext/index.tsx';
import type { GroupName } from '../../../../types.ts';

import { detailsWrapper, details, summary, content, debugString } from './styles.css.ts';

type DetailSingleProps = PropsWithChildren<{
  name: string;
  shouldBeOpenByDefault: boolean;
  accordionName?: string;
}>;

export default function DetailSingle({ children, shouldBeOpenByDefault, name }: DetailSingleProps) {
  const { namesOfExpandedGroups } = use(AccordionStateContext);
  const dispatchAccordionAction = use(DispatchContext);

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
      <details
        open={shouldBeOpenByDefault}
        onToggle={handleToggle(name)}
        className={details}
        // name={accordionName} // same name for all details tag to allow only one details tag to be expanded
      >
        <summary className={summary}>
          {name} <span className={debugString}>{shouldBeOpenByDefault ? 'open' : 'not open'}</span>
        </summary>
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <div
          className={content}
          onClick={(event) => event.stopPropagation()}
          onKeyDown={(event) => event.stopPropagation()}
        >
          {children}
        </div>
      </details>
    </div>
  );
}
