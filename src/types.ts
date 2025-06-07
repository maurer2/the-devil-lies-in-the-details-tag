import type { Simplify } from 'type-fest';
export type GroupedEntry = {
  name: string;
  entries: string[];
};

export type GroupName = GroupedEntry['name'];

export type AccordionEntry = Simplify<
  GroupedEntry & {
    isExpanded: boolean;
  }
>;
