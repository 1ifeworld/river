'use client'

// import React, { useEffect } from "react"
// import Script from "next/script"
// interface ModelRendererProps {
//   src: string;
// }

// const ModelRenderer: React.FC<ModelRendererProps> = ({ src }) => {
//   // useEffect(() => {
//   //   import('@google/model-viewer').catch(console.error)
//   // }, [])


//   return (
//     <>
//       <Script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js" />

//       <model-viewer
//         src={src}
//         ios-src={src}
//         ios
//         // ar
//         autoplay  
//         // ar-modes="webxr scene-viewer" 
//         progress
//         camera-controls 
//         loading ='eager'
//         // preload
//         touch-action="pan-y" 
//         style={{ width: '100%', height: '100%' }}
//       ></model-viewer>
//     </>
//   )
// }

// export default ModelRenderer


import Script from "next/script"
import React from "react"

interface ModelRendererProps {
  src: string
}

const ModelRenderer: React.FC<ModelRendererProps> = ({ src }) => {
  const dracoDecoderLocation = './'
  return (
    <>
      <Script 
        src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js"
        type="module"
        onLoad={() => {
          const scriptContent = `
            self.ModelViewerElement = self.ModelViewerElement || {}
            self.ModelViewerElement.dracoDecoderLocation = '${dracoDecoderLocation}'
          `
          if (typeof window !== "undefined") {
            const script = document.createElement('script')
            script.textContent = scriptContent
            document.head.appendChild(script)
          }
        }}
      />
      <model-viewer
        src={src}
        autoplay  
        camera-controls 
        touch-action="pan-y" 
        style={{ width: '100%', height: '100%' }}
      ></model-viewer>
    </>
  )
}

export default ModelRenderer