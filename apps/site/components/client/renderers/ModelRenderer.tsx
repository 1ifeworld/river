'use client'

import { ModelViewerElement } from '@google/model-viewer'
import React, { CSSProperties, useEffect } from 'react'

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
        // biome-ignore lint:
        style={{ width: '100%', height: '100%' } as any}
      />
    </>
  )
}

export default ModelRenderer
