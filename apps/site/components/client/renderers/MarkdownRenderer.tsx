'use client'

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


return (
<div ref={containerRef} className="flex flex-col items-center bg-white overflow-auto h-[95vh] px-12 sm:px-12 py-8">
    <div className="w-full max-w-2xl mx-auto">
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-12 w-10 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <Viewer
        className="max-w-none"
        value={content}
          readOnly
        />
      )}
    </div>
  </div>
)
}

export default MarkdownRenderer


