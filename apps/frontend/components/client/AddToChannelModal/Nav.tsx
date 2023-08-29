// HeaderNav.tsx
import React from 'react';

interface NavProps {
    activeTab: string;
    setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  }

const Nav = ({ activeTab, setActiveTab }: NavProps) => {
  return (
    <div className="border-2 border-blue-500 flex justify-between text-gray-500 w-full h-[47px]">
      <button
        disabled
        className={`mx-4 ${activeTab === "Upload" ? "text-bold text-black" : ""}`}
        onClick={() => setActiveTab("Upload")}
      >
        Upload
      </button>
      <button
        className={`mx-4 ${activeTab === "Search" ? "text-bold text-black" : ""}`}
        onClick={() => setActiveTab("Search")}
      >
        Search
      </button>
      <button
        disabled
        className={`mx-4 ${activeTab === "Text" ? "text-bold text-black" : ""}`}
        onClick={() => setActiveTab("Text")}
      >
        Text
      </button>
    </div>
  );
};


export default Nav;
