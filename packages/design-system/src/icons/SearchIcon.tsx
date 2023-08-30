import * as React from "react";
import { cn } from "../utils";
import { type SvgProps } from "./types";

export function SearchIcon({
  width,
  fill,
  className,
}: SvgProps) {
  return (
    <svg
      width={width}
      height={width}
      viewBox="0 0 35 35"
      fill='none'
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M19.481 19.4811C19.761 19.2011 20.2149 19.2011 20.4948 19.4811L24.29 23.2763C24.57 23.5562 24.57 24.0101 24.29 24.2901C24.0101 24.57 23.5562 24.57 23.2762 24.2901L19.481 20.4949C19.2011 20.2149 19.2011 19.761 19.481 19.4811Z"
        // fill={fill}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16.1928 20.4518C18.545 20.4518 20.4518 18.545 20.4518 16.1928C20.4518 13.8406 18.545 11.9337 16.1928 11.9337C13.8406 11.9337 11.9337 13.8406 11.9337 16.1928C11.9337 18.545 13.8406 20.4518 16.1928 20.4518ZM16.1928 21.8856C19.3368 21.8856 21.8856 19.3368 21.8856 16.1928C21.8856 13.0487 19.3368 10.5 16.1928 10.5C13.0487 10.5 10.5 13.0487 10.5 16.1928C10.5 19.3368 13.0487 21.8856 16.1928 21.8856Z"
        // fill={fill}
      />
    </svg>
  );
}
