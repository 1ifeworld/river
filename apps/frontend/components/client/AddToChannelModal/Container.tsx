"use client";

import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@river/design-system/src/components/DialogModal";

import Nav from "./Nav";
import SearchContainer from "./states/search/SearchContainer";

export function Container() {
  const [activeTab, setActiveTab] = useState("Search");

  return (
    <Dialog>
      <DialogTrigger className="border-red-500 border-2 w-fit justify-center">
        Open
      </DialogTrigger>
      <DialogContent className="flex flex-wrap border-2 border-red-500 w-[490px] h-[490px] ">
        <Nav activeTab={activeTab} setActiveTab={setActiveTab}></Nav>
        <>
          {activeTab === "Search" ? <SearchContainer /> : null}
          {/* {activeTab === "Update" ? <UpdateContainer/> : null}
          {activeTab === "Text" ? <TextContainer/> : null} */}
        </>
      </DialogContent>
    </Dialog>
  );
}
