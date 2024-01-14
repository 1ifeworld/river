'use client'

import React, { useEffect, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString()

interface PDFViewerProps {
  file: string
}
const PDFViewer: React.FC<PDFViewerProps> = ({ file }) => {
  const [numPages, setNumPages] = useState(0)
  const [pageWidth, setPageWidth] = useState(0)

  const calculatePageWidth = () => {
    return Math.min(window.innerWidth * 0.8, 1200) // 800px as max width, adjust as needed
  }

  useEffect(() => {
    const handleResize = () => {
      setPageWidth(calculatePageWidth()) 
    }

    window.addEventListener('resize', handleResize)
    handleResize() 

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
    setPageWidth(calculatePageWidth()) 
  }

  return (
    <div className="flex flex-col items-center my-4">
      <div className="overflow-auto max-h-[80vh] w-full">
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from({ length: numPages }, (_, index) => (
            <div key={`page_${index + 1}`} className="flex justify-center my-2">
              <Page
                pageNumber={index + 1}
                width={pageWidth}
                renderAnnotationLayer={false}
                renderTextLayer={false}
                renderMode='canvas'
                className='shadow-md'
              />
            </div>
          ))}
        </Document>
      </div>
    </div>
  )
}

export default PDFViewer