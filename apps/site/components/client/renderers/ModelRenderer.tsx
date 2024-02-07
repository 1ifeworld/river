'use client'

import React, { useEffect } from "react"

interface ModelRendererProps {
  src: string
}

const ModelRenderer: React.FC<ModelRendererProps> = ({ src }) => {
  useEffect(() => {
    import("@google/model-viewer").catch(console.error)
  }, [])

  return (
    <>
      <model-viewer
        src={src}
        autoplay
        progress
        camera-controls
        touch-action="pan-y"
        style={{ width: "100%", height: "100%" }}
        // ios-src={src}
        // ios
        // ar
        // ar-modes="webxr scene-viewer"
        // loading ='eager'
        // preload
      ></model-viewer>
    </>
  )
}

export default ModelRenderer
