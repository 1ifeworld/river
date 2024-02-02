// 'use client'

// import React, { useEffect, useState } from 'react'
// import Editor from 'rich-markdown-editor'
// import { light as customTheme } from '../../../styles/editorTheme'

// type Props = {
//   contentUrl: string
// }

// const MarkdownRenderer: React.FC<Props> = ({ contentUrl }) => {
//   const [content, setContent] = useState('')
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     setIsLoading(true)
//     fetch(contentUrl)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok')
//         }
//         return response.text()
//       })
//       .then((data) => {
//         setContent(data)
//         setIsLoading(false)
//       })
//       .catch((error) => {
//         console.error('Error fetching Markdown content:', error)
//         setIsLoading(false)
//       })
//   }, [contentUrl])

//   return (
//     <div className="flex justify-center items-center py-4">
//       <div
//         className="flex h-full w-full justify-center"
//         // style={{ height: '90vh', maxWidth: '55vw' }}
//       >
//         {isLoading ? (
//           <div>Loading...</div>
//         ) : (
//           <Editor
//             className=" editor-body-text w-[620px]"
//             // disableExtensions={['container_notice']}
//             value={content}
//             readOnly
//             theme={customTheme}
//           />
//         )}
//       </div>
//     </div>
//   )
// }

// export default MarkdownRenderer

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
  const [editorWidth, setEditorWidth] = useState(0)
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

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      if (entries[0].target) {
        const newWidth = Math.min(entries[0].contentRect.width * 0.8, 1200) // Adjust the 0.8 if you want different padding
        setEditorWidth(newWidth)
      }
    })

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [])

  const editorStyle = {
    width: `${editorWidth}px`,
    maxHeight: '70vh', 
    overflow: 'auto'  
  };

  return (
    <div ref={containerRef} className="flex justify-center items-center py-4">
      <div className="flex h-full w-full justify-center">
        {isLoading ? (
          <div>Loading...</div>
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