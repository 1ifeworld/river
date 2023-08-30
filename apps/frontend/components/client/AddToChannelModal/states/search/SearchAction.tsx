"use client";

// SearchAction.tsx
import React from "react";
import {SvgLoader} from "@river/design-system"

interface SearchActionProps {
  addReady: boolean;
  addTrigger: (() => void) | undefined;
  nameOfAdd?: string;
}

const SearchAction = ({
  addReady,
  addTrigger,
  nameOfAdd,
}: SearchActionProps) => {

  return (
    <button
      disabled={!addReady}
      onClick={addTrigger}
      className="rounded-[4px] mx-[18px] bg-[#3F8AE2] hover:bg-[#1456A4] text-white w-full p-2 mt-[22px]"
    >
      {nameOfAdd ? "Add " + `"${nameOfAdd}"` : "Add"}
    </button>
  );
};

export default SearchAction;
