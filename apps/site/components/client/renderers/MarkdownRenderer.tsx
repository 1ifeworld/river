'use client'

import React, { useEffect, useState } from 'react'
import Editor from 'rich-markdown-editor'
import { light as customTheme} from '../../../../styles/editorTheme'


type Props = {
  contentUrl: string
}

const MarkdownRenderer: React.FC<Props> = ({ contentUrl }) => {
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
      <div className="flex justify-center py-4">
          <div className="w-full max-w-4xl mx-4 overflow-auto bg-white" style={{ maxHeight: '60vh' }}>
              {isLoading ? (
                  <div>Loading...</div>
              ) : (
                  <Editor
                      className="editor-body-text w-full px-4 py-2"
                      // disableExtensions={['container_notice']}
                      value={content}
                      readOnly
                      // theme={customTheme}
                  />
              )}
          </div>
      </div>
  )
}

export default MarkdownRenderer
