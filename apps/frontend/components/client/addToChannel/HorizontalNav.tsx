import React from 'react'
import { Body, Flex, cn } from '@river/estuary'

interface HorizontalNavProps {
  activeTab: string
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
}

export function HorizontalNav({ activeTab, setActiveTab }: HorizontalNavProps) {
  return (
    <Flex className="justify-center w-full gap-x-7">
      <button
        type="button"
        disabled
        onClick={() => setActiveTab('Upload')}
        className="focus:outline-none"
      >
        <Body
          className={cn(
            activeTab === 'Upload'
              ? 'text-label border-b-[2px] border-primary'
              : '',
            'text-[14px] font-medium text-label-faint cursor-not-allowed',
          )}
        >
          Upload
        </Body>
      </button>
      <button
        type="button"
        onClick={() => setActiveTab('Search')}
        className="focus:outline-none"
      >
        <Body
          className={cn(
            activeTab === 'Search'
              ? 'text-label border-b-[2px] border-primary'
              : '',
            'text-[14px] leading-[3rem] min-w-[64px] font-medium',
          )}
        >
          Search
        </Body>
      </button>
      <button
        type="button"
        disabled
        onClick={() => setActiveTab('Write')}
        className="focus:outline-none"
      >
        <Body
          className={cn(
            activeTab === 'Write'
              ? 'text-label border-b-[2px] border-primary'
              : '',
            'text-[14px] font-medium text-label-faint cursor-not-allowed',
          )}
        >
          Write
        </Body>
      </button>
    </Flex>
  )
}
