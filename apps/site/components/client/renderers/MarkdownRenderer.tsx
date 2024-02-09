'use client'

import React, { useEffect, useState, useRef } from 'react'
import Viewer from 'rich-markdown-editor'
import { light as customTheme } from '../../../styles/editorTheme'

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

  const editorStyles = {
    padding: '3vw 5vh', 
    backgroundColor: '#FFFFFF', 
    color: '#333',
    maxWidth: 'calc(100% - 80px)', 
    margin: 'auto'
  }

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center my-4 bg-gray-100 overflow-auto"
      style={{ height: '98%' }}
    >
      <div style={editorStyles}>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <Viewer
            className="text-secondary-foreground font-mono text-base w-full"
            value={content}
            readOnly
            theme={customTheme}
          />
        )}
      </div>
    </div>
  )
}

export default MarkdownRenderer