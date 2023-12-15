
'use client'
import React, { useState } from 'react'
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
  const [pageNumber, setPageNumber] = useState(1)

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
  }

  return (
    <div className="flex flex-col items-center my-4">
      <div className="pdf-container overflow-auto mb-4" style={{ height: '70vh' }}>
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} scale={1.4}/>
        </Document>
      </div>
    </div>
  )
}

export default PDFViewer


// 'use client'
// import { Document, Page, pdfjs } from 'react-pdf'
// import React, { useState } from 'react'

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.js',
//   import.meta.url,
// ).toString()

// interface PDFViewerProps {
//   file: string
// }

// const PDFViewer: React.FC<PDFViewerProps> = ({ file }) => {
//   const [numPages, setNumPages] = useState(0)

//   const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
//     setNumPages(numPages)
//   }

//   return (
//     <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
//       {Array.from(new Array(numPages), (el, index) => (
//         <Page key={`page_${index + 1}`} pageNumber={index + 1} />
//       ))}
//     </Document>
//   )
// }

// export default PDFViewer