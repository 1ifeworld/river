'use client'
import React, { useState, useEffect } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString()

interface PDFViewerProps {
  file: string
}

const PdfViewer: React.FC<PDFViewerProps> = ({ file }) => {
  const [numPages, setNumPages] = useState(0)
  const [pageWidth, setPageWidth] = useState(0)

  useEffect(() => {
    // Adjust the page width based on the window size
    const handleResize = () => {
      setPageWidth(window.innerWidth * 0.8) // Adjust the width to 80% of the window width
    }

    window.addEventListener('resize', handleResize)
    handleResize() // Initial call

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
  }

  return (
    <div className="flex justify-center items-center my-4">
      <div
        className="overflow-auto"
        style={{ height: '70vh', maxWidth: '100vw' }}
      >
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from(new Array(numPages), (el, index) => (
            <div
              className="flex justify-center page-container"
              key={`page_${index + 1}`}
            >
              <Page
                pageNumber={index + 1}
                width={pageWidth}
                renderAnnotationLayer={false}
                renderTextLayer={false}
              />
            </div>
          ))}
        </Document>
      </div>
      <style jsx global>{`
        .react-pdf__Page {
          margin: 0 !important
          padding: 0 !important
        }
        .page-container {
          margin-bottom: 10px /* Minimal margin between pages */
        }
      `}</style>
    </div>
  )
}

export default PdfViewer
