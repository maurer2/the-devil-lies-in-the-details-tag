import type { PropsWithChildren, ComponentType } from 'react';

import { buttonGroup } from './styles.css.ts';

type ButtonGroupHTMLAttributesCustom = Omit<ComponentType<HTMLDivElement>, 'className'>;
// type ButtonGroupHTMLAttributesCustom = Omit<HTMLDivElement, 'className'>; // error

type ButtonGroupProps = PropsWithChildren<
  ButtonGroupHTMLAttributesCustom & {
    role?: string;
  }
>;

export default function ButtonGroup({ children, role, ...props }: ButtonGroupProps) {
  return (
    <div className={buttonGroup} role={role} {...props}>
      {children}
    </div>
  );
}
