import type { MouseEvent, ButtonHTMLAttributes, PropsWithChildren } from 'react';

import { button, type ButtonVariants } from './styles.css.ts';

type ButtonHTMLAttributesAll = ButtonHTMLAttributes<HTMLButtonElement>;
type ButtonHTMLAttributesCustom = Omit<ButtonHTMLAttributesAll, 'type' | 'className'>;

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributesCustom & {
    type: ButtonHTMLAttributesAll['type']; // make type prop mandatory
    state?: NonNullable<ButtonVariants>['state'];
    size?: NonNullable<ButtonVariants>['size'];
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  }
>;

export default function Button({ children, type, state, size, onClick, ...props }: ButtonProps) {
  const buttonClassName = button({ state, size });

  return (
    <button className={buttonClassName} onClick={onClick} type={type} {...props}>
      {children}
    </button>
  );
}
