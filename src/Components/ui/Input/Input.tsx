import * as React from "react";
import classes from "./Input.module.css";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(({ className, type, ...props }, ref) => {
  return <input type={type} className={classes.input} ref={ref} {...props} />;
});

Input.displayName = "Input";

export default Input;
