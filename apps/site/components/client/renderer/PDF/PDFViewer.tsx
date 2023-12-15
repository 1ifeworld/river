'use client'
import React, { useState } from 'react'
import { Document, Page, pdfjs } from 'react-Pdf'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'Pdfjs-dist/build/Pdf.worker.min.js',
  import.meta.url,
).toString()

interface PdfViewerProps {
  file: string
}

const PdfViewer: React.FC<PdfViewerProps> = ({ file }) => {
  const [numPages, setNumPages] = useState(0)
  const [pageNumber, setPageNumber] = useState(1)

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
  }

  return (
    <div className="flex flex-col items-center my-4">
      <div className="Pdf-container overflow-auto mb-4 h-[70vh]">
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} scale={1.4} />
        </Document>
      </div>
    </div>
  )
}

export default PdfViewer
