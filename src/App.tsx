import { useState } from 'react';
import { catNames } from 'cat-names';
import { sampleSize, randomInt } from 'es-toolkit';

import Accordion from './components/Accordion';
import DebugList from './components/DebugList';
import Button from './components/Button';
import ButtonGroup from './components/ButtonGroup';
import ProgressIndicator from './helpers/ProgressIndicator/index.tsx';
import { wrapper, pageTitle, buttonGroup } from './app.css.ts';
import type { GroupName, GroupedEntry } from './types.ts';

const hasEntriesInGroup = <T extends Array<unknown>>(
  entry: [PropertyKey, T | undefined],
): entry is [PropertyKey, T] => Boolean(entry[1]?.length);

const catNamesGroupedByFirstLetter = Object.entries(
  Object.groupBy(catNames, (name) => name[0].toUpperCase()),
).filter((entry) => hasEntriesInGroup(entry));

const groupedEntries: GroupedEntry[] = catNamesGroupedByFirstLetter.map(([name, entries]) => ({
  name,
  entries,
}));

export default function App() {
  const [defaultExpandedGroupNames, setDefaultExpandedGroupNames] = useState<GroupName[]>(() => [
    groupedEntries[1].name,
    groupedEntries[2].name,
    groupedEntries[3].name,
  ]);

  const handleButtonClick = () => {
    const numberOfEntries = randomInt(1, groupedEntries.length);
    const newDefaultExpandedGroupEntries = sampleSize(groupedEntries, numberOfEntries).map(
      ({ name }) => name,
    );

    setDefaultExpandedGroupNames(newDefaultExpandedGroupEntries);
  };

  // ensure that Accordion will be reset when defaultExpandedGroupNames are updated so that state initializer function is run again with current data
  const accordionComponentKey = JSON.stringify(defaultExpandedGroupNames);

  return (
    <main className={wrapper}>
      <h1 className={pageTitle}>Accordion</h1>
      <ProgressIndicator />

      <p>
        Searching for <span>Abby</span> when accordion is closed to see a state mismatch between
        component state and the DOM.
      </p>

      <div className={buttonGroup}>
        <Button onClick={handleButtonClick} type="button">
          Random default expanded elements
        </Button>
      </div>

      <Accordion
        groupedEntries={groupedEntries}
        key={accordionComponentKey}
        defaultExpandedGroupNames={defaultExpandedGroupNames}
      >
        <Accordion.MenuRenderProps
          renderMenuEntries={({
            accordionEntries,
            namesOfExpandedGroups,
            handleGroupToggleClick,
          }) =>
            accordionEntries.map(({ name }) => {
              const isActive = namesOfExpandedGroups.includes(name);

              return (
                <>
                  <Button
                    key={name}
                    state={isActive ? 'active' : 'default'}
                    onClick={handleGroupToggleClick(name)}
                    aria-pressed={isActive}
                    type="button"
                  >
                    {name}
                  </Button>
                </>
              );
            })
          }
        />
        <Accordion.ToggleButtonsFaaC>
          {({
            hasCollapsibleEntries,
            hasExpandableEntries,
            handleCollapseButtonClick,
            handleExpandButtonClick,
          }) => (
            <ButtonGroup role="group" aria-label="Collapse and Expand buttons">
              <Button
                type="button"
                state={!hasCollapsibleEntries ? 'disabled' : 'default'}
                onClick={handleCollapseButtonClick}
                aria-disabled={!hasCollapsibleEntries}
                aria-label="Collapse all entries"
              >
                Collapse
              </Button>
              <Button
                type="button"
                state={!hasExpandableEntries ? 'disabled' : 'default'}
                onClick={handleExpandButtonClick}
                aria-disabled={!hasExpandableEntries}
                aria-label="Expand all entries"
              >
                Expand
              </Button>
            </ButtonGroup>
          )}
        </Accordion.ToggleButtonsFaaC>
        <Accordion.Details />
      </Accordion>

      <hr />

      <DebugList groupedEntries={groupedEntries} />
    </main>
  );
}
