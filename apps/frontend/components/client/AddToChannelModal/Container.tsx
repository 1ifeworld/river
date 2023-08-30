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

import Nav from "./StateNav";
import SearchContainer from "./states/search/SearchContainer";

export function Container() {
  const [activeTab, setActiveTab] = useState("Search");
  
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={true} onOpenChange={setOpen}>
      {/* Replace with `Button` component */}
      <DialogTrigger className="bg-[#3F8AE2] hover:bg-[#1456A4] text-white py-[4px] px-4 text-[13px] w-fit rounded-[4px] ">
        + Add
      </DialogTrigger>
      <DialogContent className="flex flex-col border-[0.5px] rounded-[14px] border-light-gray w-[488px] h-[438px] ">
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
