'use client'

import React, { useEffect, useState, useRef } from 'react'
import Editor from 'rich-markdown-editor'
import { light as customTheme } from '../../../styles/editorTheme'

type Props = {
  contentUrl: string
}

const MarkdownRenderer: React.FC<Props> = ({ contentUrl }) => {
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  const calculateContentHeight = () => {
    const headerHeight = 40 
    const additionalPadding = 60 
    return `calc(100vh - ${headerHeight}px - ${additionalPadding}px)`
  }

  const editorStyle: React.CSSProperties = {
    width: '100%',
    minHeight: calculateContentHeight(), 
    overflowY: 'auto', 
    padding: '1.5rem',
    backgroundColor: 'white',
    fontFamily: customTheme.fontFamilyMono,
    fontSize: customTheme.fontSize,
    lineHeight: customTheme.lineHeight,
  }

  const loadingStyle = {
    ...editorStyle,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }

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

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        containerRef.current.style.minHeight = calculateContentHeight()
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="flex flex-col md:flex-row py-4 w-full">
      <div className="flex-1 overflow-auto bg-white p-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">Loading...</div>
        ) : (
          <Editor
            className="prose max-w-none" 
            value={content}
            readOnly
            theme={customTheme}
          />
        )}
      </div>
      <div className="w-full md:w-1/4 bg-gray-100 p-6 mt-4 md:mt-0 md:ml-4">
      </div>
    </div>
  )
}

export default MarkdownRenderer
