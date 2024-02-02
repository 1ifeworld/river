// 'use client'

// import React, { useEffect, useState, useRef } from 'react'
// import Editor from 'rich-markdown-editor'
// import { light as customTheme } from '../../../styles/editorTheme'

// type Props = {
//   contentUrl: string
// }

// const MarkdownRenderer: React.FC<Props> = ({ contentUrl }) => {
//   const [content, setContent] = useState('')
//   const [isLoading, setIsLoading] = useState(true)
//   const [editorWidth, setEditorWidth] = useState(0)
//   const [editorPadding, setEditorPadding] = useState('0 15px') 

//   const editorContentStyle = {
//     width: '100%', 
//     maxWidth: '40vw', 
//     fontFamily: "'SFMono-Regular'",
//     fontSize: '16px', 
//     lineHeight: '17px',
//     backgroundColor: 'white',
//     padding: '0 15px', 
//   }
  
//   const containerRef = useRef<HTMLDivElement>(null)
  
//   useEffect(() => {
//     const updateStyle = () => {
//       const containerWidth = containerRef.current?.offsetWidth || 0
      
//       setEditorWidth(containerWidth) 
//       setEditorPadding(containerWidth < 768 ? '0 15px' : '1.5rem') 
//     }
  
//     updateStyle()
  
//     window.addEventListener('resize', updateStyle)
  
//     return () => window.removeEventListener('resize', updateStyle)
//   }, [])
  
//   const editorStyle = {
//     ...editorContentStyle,
//     width: `${editorWidth}px`, 
//     maxHeight: '70vh',
//     overflow: 'auto',
//     padding: editorPadding, 
//     marginTop: '40px', 
//   }
  
//   const loadingStyle = {
//     ...editorContentStyle,
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '70vh', 
//   }

//   return (
//     <div ref={containerRef} className="flex justify-center items-center py-4">
//       <div className="flex h-full w-full justify-center bg-white">
//         {isLoading ? (
//           <div style={loadingStyle}>Loading...</div>
//         ) : (
//           <Editor
//             className="editor-body-text"
//             style={editorStyle}
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
  const containerRef = useRef<HTMLDivElement>(null)
  const [editorWidth, setEditorWidth] = useState(0)



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
        const newWidth = Math.min(entries[0].contentRect.width * 0.8, 1200) 
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
    height: 'calc(100% - 40px)', 
    maxHeight: '90vh',
    width: '80%', 
    overflow: 'auto',
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
