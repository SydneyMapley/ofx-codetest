import { useLayoutEffect, useRef, useState } from "react";

import classes from "./ProgressBar.module.css";

const ProgressBar = (props: ProgressBar) => {
  const ref = useRef<HTMLDivElement>(null);

  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (ref.current) {
      setWidth(ref.current.offsetWidth);
    }
  }, []);

  return (
    <div data-testid="progress-bar" ref={ref} className={classes.base} style={props.style}>
      <div
        className={`${classes.progress} ${props.animationClass}`}
        style={{ transform: `translate(-${width * (1 - props.progress)}px)` }}
      ></div>
    </div>
  );
};

ProgressBar.displayName = "ProgressBar";

type ProgressBar = {
  style?: object;
  progress: number;
  animationClass?: string;
};

export default ProgressBar;
