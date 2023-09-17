import * as React from "react";
import { cn } from "../utils";
import { type SvgProps } from "./types";

export function RightPointer({
  width = "7",
  fill = "none",
  className,
}: SvgProps) {
  return (
    <svg
      width="7"
      height={Number(width) * 1.42}
      viewBox="0 0 7 10"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 1L5 5L1 9" stroke="#868686" stroke-width="1.75" />
    </svg>
  );
}
