'use client'
import React, { useEffect, useState, useRef } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString()

interface PDFViewerProps {
  file: string
}

interface DocumentLoadSuccess {
  numPages: number
}

const PDFViewer: React.FC<PDFViewerProps> = ({ file }) => {
  const [numPages, setNumPages] = useState(0)
  const [pageWidth, setPageWidth] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      if (entries[0].target) {
        const newWidth = Math.min(entries[0].contentRect.width * 0.8, 1200)
        setPageWidth(newWidth)
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

  const onDocumentLoadSuccess = ({ numPages }: DocumentLoadSuccess) => {
    setNumPages(numPages)
    if (containerRef.current) {
      const newWidth = Math.min(containerRef.current.clientWidth * 0.8, 1200)
      setPageWidth(newWidth)
    }
  }

  return (
    <div ref={containerRef} className="flex flex-col items-center my-4 bg-gray-100">
      <div className="my-2 p-4">
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from({ length: numPages }, (_, index) => (
            <div key={`page_${index + 1}`} className="flex justify-center my-2">
              <Page
                pageNumber={index + 1}
                width={pageWidth}
                renderAnnotationLayer={false}
                renderTextLayer={false}
                renderMode='canvas'
              />
            </div>
          ))}
        </Document>
      </div>
    </div>
  )
}

export default PDFViewer
