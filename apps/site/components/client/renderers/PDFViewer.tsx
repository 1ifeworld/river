'use client'

const PdfViewer = ({ file }: {file: string}) => {
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

export default PdfViewer