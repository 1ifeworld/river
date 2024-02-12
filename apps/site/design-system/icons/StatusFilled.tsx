import * as React from "react";
import { cn } from "../utils";
import { type SvgProps } from "./iconTypes";

export function StatusFilled({
  width = 14,
  fill,
  stroke,
  className,
}: SvgProps) {
  return (
    <svg
      width={width}
      height={width}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="7" cy="7" r="6.25" stroke="#404040" stroke-width="1.5" />
      <circle cx="6.94531" cy="6.94336" r="3.88281" fill="#404040" />
    </svg>
  );
}
