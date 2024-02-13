'use client'

import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Typography } from 'design-system/components'
import './markdownStyles.css'

interface MarkdownRendererProps {
  contentUrl: string
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ contentUrl }) => {
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(true)

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
    <div className="flex flex-col leading bg-white items-center overflow-auto h-full px-2 py-10 sm:px-10">
      <div className="base max-w-2xl mx-auto" style={{ width: '90vw' }}>
        {isLoading ? (
          <Typography className="flex base justify-center items-center h-full">
            Loading...
          </Typography>
        ) : (
      <ReactMarkdown className="markdown"  remarkPlugins={[remarkGfm]} children={content} />
        )}
      </div>
    </div>
  )
}

export default MarkdownRenderer
