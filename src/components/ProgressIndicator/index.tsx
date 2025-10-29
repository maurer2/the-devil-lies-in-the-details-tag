import { progressIndicator, progressIndicatorMask } from './styles.css.ts';

type ProgressIndicatorProps = {
  test?: string;
};

export default function ProgressIndicator({}: ProgressIndicatorProps) {
  return (
    <div className={progressIndicator} aria-hidden>
      <div className={progressIndicatorMask}></div>
    </div>
  );
}
