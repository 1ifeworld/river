// HeaderNav.tsx
import React from 'react';

interface NavProps {
    activeTab: string;
    setActiveTab: React.Dispatch<React.SetStateAction<string>>;
    closeModal: React.Dispatch<React.SetStateAction<boolean>>;
  }

const Nav = ({ closeModal, activeTab, setActiveTab }: NavProps) => {
  return (
    <div className='flex justify-between items-center'>
      <div></div>
      <div className="flex justify-center text-[#C2C2C2] w-full h-[47px] space-x-[18px]">
        <button
          disabled
          className={`${activeTab === "Upload" ? "text-[#272727] border-b-[1.5px] border-[#287EFF]" : ""}`}
          onClick={() => setActiveTab("Upload")}
        >
          Upload
        </button>
        <button
          className={`${activeTab === "Search" ? "text-[#272727] border-b-[1.5px] border-[#287EFF]" : ""}`}
          onClick={() => setActiveTab("Search")}
        >
          Search
        </button>
        <button
          disabled
          className={`${activeTab === "Text" ? "text-[#272727] border-b-[1.5px] border-[#287EFF]" : ""}`}
          onClick={() => setActiveTab("Text")}
        >
          Text
        </button>
      </div>
      <button onClick={() => closeModal(false)} className='flex h-fit mr-2.5 bg-[#BEBEBE] hover:bg-[#A06060] hover:text-[#A06060] text-[#BEBEBE] rounded-full w-5 h-5 justify-center text-[13px]'>
        {"X"}
      </button>
    </div>
  );
};


export default Nav;
