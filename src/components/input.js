/* eslint-disable react/display-name */

import { forwardRef } from "react";

export const TextInput = forwardRef((props, ref) => (
  <input
    ref={ref}
    {...props}
    className={`border-2 ring-1 
                ring-offset-1 hover:shadow-primary900 focus:outline-none 
                focus:ring-offset-2 transition duration-200 ring-primary 
                border-primary px-3 py-2 text-muted rounded w-full ${props.className}`}
  />
));

export const TextAreaInput = forwardRef((props, ref) => (
  <textarea
    ref={ref}
    {...props}
    className={`border-2 ring-1 
        min-h-32
                ring-offset-1 hover:shadow-primary900 focus:outline-none 
                focus:ring-offset-2 transition duration-200 ring-primary 
                border-primary px-3 py-2 text-muted rounded w-full ${props.className}`}
  />
));

export const TimeInput = forwardRef((props, ref) => (
  <div className="flex">
    <input
      type="time"
      {...props}
      className={`border-2 ring-1 
        ring-offset-1 hover:shadow-primary900 focus:outline-none 
        focus:ring-offset-2 w-fit transition duration-200 ring-primary 
        ${props.className}`}
    />
    <p>-</p>
    <input
      type="time"
      {...props}
      className={`border-2 ring-1 
        ring-offset-1 hover:shadow-primary900 focus:outline-none 
        focus:ring-offset-2 w-fit transition duration-200 ring-primary 
        ${props.className}`}
    />
  </div>
));
