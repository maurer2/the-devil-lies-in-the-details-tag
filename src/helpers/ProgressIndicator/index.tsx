import { progressIndicator } from './styles.css.ts';

type ProgressIndicatorProps = {
  test?: string;
};

export default function ProgressIndicator({}: ProgressIndicatorProps) {
  return <div className={progressIndicator}></div>;
}
