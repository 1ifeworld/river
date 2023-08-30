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
  
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="bg-[#3F8AE2] hover:bg-[#1456A4] text-white py-[2px] px-4 text-[13px] w-fit rounded-[4px] ">
        + Add
      </DialogTrigger>
      <DialogContent className="flex flex-col border-[0.7px] rounded-[13.92px] border-[#D2D2D2] w-[490px] h-[438px] ">
        <Nav closeModal={setOpen} activeTab={activeTab} setActiveTab={setActiveTab}></Nav>
        <>
          {activeTab === "Search" ? <SearchContainer /> : null}
          {/* {activeTab === "Update" ? <UpdateContainer/> : null}
          {activeTab === "Text" ? <TextContainer/> : null} */}
        </>
      </DialogContent>
    </Dialog>
  );
}
