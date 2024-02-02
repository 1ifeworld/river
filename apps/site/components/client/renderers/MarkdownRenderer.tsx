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
  const [editorHeight, setEditorHeight] = useState('120vh')

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
      const headerHeight = 40 
      const additionalPadding = 60 
      const adjustedHeight = window.innerHeight - headerHeight - additionalPadding
      setEditorHeight(`${adjustedHeight}px`)
    }
        handleResize()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const editorStyle: React.CSSProperties = {
    width: '100%',
    height: editorHeight,
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

  return (
    <div ref={containerRef} className="flex justify-center items-center py-4">
      <div className="flex h-full w-full justify-center bg-white">
        {isLoading ? (
          <div style={loadingStyle}>Loading...</div>
        ) : (
          <Editor
            className="editor-body-text"
            style={editorStyle}
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

