'use client'

import { Typography } from 'design-system/components';
import React, { useEffect, useState, useRef } from 'react'
import Viewer from 'rich-markdown-editor'

interface MarkdownRendererProps {
  contentUrl: string
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ contentUrl }) => {
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)


  useEffect(() => {
    setIsLoading(true)
    fetch(contentUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.text()
      })
      .then((data) => {
        setContent(data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching Markdown content:', error)
        setIsLoading(false)
      })
  }, [contentUrl])

  const colors = {
    almostBlack: '#2F2F2F',
    lightBlack: '#2F3336',
    almostWhite: '#E6E6E6',
    white: '#FFF',
    white10: 'rgba(255, 255, 255, 0.1)',
    black: '#000',
    black10: 'rgba(0, 0, 0, 0.1)',
    primary: '#1AB6FF',
    greyLight: '#F4F7FA',
    grey: '#E8EBED',
    greyMid: '#C5CCD3',
    greyDark: '#DAE1E9',
  }
  
   const base = {
    ...colors,
    fontFamily:
      "",
    fontFamilyMono:
      "'SFMono-Regular',Consolas,'Liberation Mono', Menlo, Courier,monospace",
    fontWeight: 400,
    zIndex: 100,
    link: colors.primary,
    placeholder: '#B1BECC',
    textSecondary: '#4E5C6E',
    textLight: colors.white,
    textHighlight: '#b3e7ff',
    textHighlightForeground: colors.black,
    selected: colors.primary,
    codeComment: '#6a737d',
    codePunctuation: '#5e6687',
    codeNumber: '#d73a49',
    codeProperty: '#c08b30',
    codeTag: '#3d8fd1',
    codeString: '#032f62',
    codeSelector: '#6679cc',
    codeAttr: '#c76b29',
    codeEntity: '#22a2c9',
    codeKeyword: '#d73a49',
    codeFunction: '#6f42c1',
    codeStatement: '#22a2c9',
    codePlaceholder: '#3d8fd1',
    codeInserted: '#202746',
    codeImportant: '#c94922',

    lineHeight: 100, 

  
    blockToolbarBackground: colors.white,
    blockToolbarTrigger: colors.greyMid,
    blockToolbarTriggerIcon: colors.white,
    blockToolbarItem: colors.almostBlack,
    blockToolbarIcon: undefined,
    blockToolbarIconSelected: colors.black,
    blockToolbarText: colors.almostBlack,
    blockToolbarTextSelected: colors.black,
    blockToolbarSelectedBackground: colors.greyMid,
    blockToolbarHoverBackground: colors.greyLight,
    blockToolbarDivider: colors.greyMid,
  
    noticeInfoBackground: '#F5BE31',
    noticeInfoText: colors.almostBlack,
    noticeTipBackground: '#9E5CF7',
    noticeTipText: colors.white,
    noticeWarningBackground: '#FF5C80',
    noticeWarningText: colors.white,
  }
  
   const light = {
    ...base,
    background: colors.white,
    text: colors.almostBlack,
    code: colors.lightBlack,
    cursor: colors.black,
    divider: colors.greyMid,
  
    toolbarBackground: colors.lightBlack,
    toolbarHoverBackground: colors.black,
    toolbarInput: colors.white10,
    toolbarItem: colors.white,
  
    tableDivider: colors.greyMid,
    tableSelected: colors.primary,
    tableSelectedBackground: '#E5F7FF',
  
    quote: colors.greyDark,
    codeBackground: colors.greyLight,
    codeBorder: colors.grey,
    horizontalRule: colors.greyMid,
    imageErrorBackground: colors.greyLight,
  
    scrollbarBackground: colors.greyLight,
    scrollbarThumb: colors.greyMid,
  }


  return (
    <div ref={containerRef} className="flex flex-col leading items-center bg-white overflow-auto h-[95vh] px-2 py-10 sm:px-10">
      <div className="base max-w-2xl mx-auto" style={{ width: '90vw' }}>
        {isLoading ? (
          <Typography className="flex base font-mono justify-center items-center h-full">
            Loading...
          </Typography>
        ) : (
     
          <Viewer
            className="base"
            value={content}
            readOnly
            theme={light}
          />
        )}
      </div>
    </div>
  );
};

export default MarkdownRenderer;