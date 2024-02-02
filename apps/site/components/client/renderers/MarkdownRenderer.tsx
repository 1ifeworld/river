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
  const [editorHeight, setEditorHeight] = useState('calc(100vh - 100px)')

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
      // Calculate the available height for the editor
      const headerHeight = 40 // Replace with the actual header height if present
      const additionalPadding = 60 // Adjust as needed for additional spacing
      const adjustedHeight = window.innerHeight - headerHeight - additionalPadding
      setEditorHeight(`${adjustedHeight}px`)
    }

    // Set the height on component mount
    handleResize()

    // Update the height whenever the window is resized
    window.addEventListener('resize', handleResize)

    // Clean up the event listener when the component is unmounted
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

