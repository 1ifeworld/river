"use client";

import React, {useState} from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@river/design-system/src/components/DialogModal"

import Nav from "./Nav";
import SearchContainer from "./states/search/SearchContainer";



export function Container() {

  const [activeTab, setActiveTab] = useState("Search");

  return (
        <Dialog>
        <DialogTrigger className="border-red-500 border-2 w-fit justify-start">Open</DialogTrigger>
        <DialogContent className="flex flex-wrap border-2 border-red-500 w-fit h-[490px] p-4">
        
            <Nav activeTab={activeTab} setActiveTab={setActiveTab}></Nav>
            <>
            {activeTab === "Search" ? <SearchContainer/> : null}
            </>
            {/* <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
            </DialogDescription> */}
        </DialogContent>
        </Dialog>    
  )
}
