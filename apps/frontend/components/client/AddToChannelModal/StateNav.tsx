import React from 'react';
import { Body, cn } from '@river/design-system';

interface StateNavProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export function StateNav({
  activeTab,
  setActiveTab,
  closeModal,
}: StateNavProps) {
  return (
    <div className='flex justify-center text-label-muted w-full gap-x-7'>
      <button
        disabled
        onClick={() => setActiveTab('Upload')}
        className='focus:outline-none'
      >
        <Body
          className={cn(
            activeTab === 'Upload'
              ? 'text-label border-b-[2px] border-river-accent'
              : '',
            'text-[14px]'
          )}
        >
          Upload
        </Body>
      </button>
      <button
        onClick={() => setActiveTab('Search')}
        className='focus:outline-none'
      >
        <Body
          className={cn(
            activeTab === 'Search'
              ? 'text-label border-b-[2px] border-river-accent'
              : '',
            'text-[14px] focus:outline-none leading-[3rem] min-w-[64px]'
          )}
        >
          Search
        </Body>
      </button>
      <button
        disabled
        onClick={() => setActiveTab('Text')}
        className='focus:outline-none'
      >
        <Body
          className={cn(
            activeTab === 'Text'
              ? 'text-label border-b-[2px] border-river-accent'
              : '',
            'text-[14px]'
          )}
        >
          Text
        </Body>
      </button>
    </div>
  );
}
