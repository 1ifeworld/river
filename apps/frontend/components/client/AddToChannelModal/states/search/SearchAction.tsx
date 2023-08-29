"use client";

// SearchAction.tsx
import React from 'react';

interface SearchActionProps {
    addReady: boolean;
    addTrigger: (() => void) | undefined;
  }
  

const SearchAction = ({addReady, addTrigger}: SearchActionProps) => {

    console.log("addReady in search action: ", addReady)

  return (
    <button disabled={!addReady} onClick={addTrigger} className="w-full p-2 mt-2 bg-gray-300">Add</button>
  );
};

export default SearchAction;
