'use client'

import React from 'react'
interface PDFViewerProps {
  file: string 
}

export const PdfViewer: React.FC<PDFViewerProps> = ({ file }) => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <iframe
        src={file}
        width="100%"
        height="100%"
        style={{ border: "none" }}
        allow="fullscreen"
      ></iframe>
    </div>
  )
}

