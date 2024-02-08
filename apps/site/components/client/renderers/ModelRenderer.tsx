'use client'

import React, { useEffect, CSSProperties } from "react"
import { ModelViewerElement } from '@google/model-viewer'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': Partial<ModelViewerElement>
    }
  }
}

interface ModelRendererProps {
  src: string
}

const ModelRenderer: React.FC<ModelRendererProps> = ({ src }) => {
  useEffect(() => {
    import('@google/model-viewer').catch(console.error)
  }, [])

  const style: CSSProperties = {
    width: '100%',
    height: '100%',
  }

  return (
    <>
      <model-viewer
        src={src}
        autoplay
        camera-controls 
        touch-action="pan-y"
        style={{ width: '100%', height: '100%' } as any}
        ></model-viewer>
    </>
  )
}

export default ModelRenderer
