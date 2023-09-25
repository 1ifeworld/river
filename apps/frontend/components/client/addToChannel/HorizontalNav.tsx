import React from 'react'
import { Body, Flex, cn } from '@river/estuary'

interface HorizontalNavProps {
  activeTab: string
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
}

export function HorizontalNav({ activeTab, setActiveTab }: HorizontalNavProps) {
  return (
    <Flex className="justify-start w-full gap-x-7">
      <button
        type="button"
        onClick={() => setActiveTab('Search')}
        className="focus:outline-none"
      >
        <Body
          className={cn(
            activeTab === 'Search' ? 'text-label' : '',
            'text-[14px] leading-[3rem] min-w-[64px] font-medium',
          )}
        >
          Search
        </Body>
      </button>
    </Flex>
  )
}
