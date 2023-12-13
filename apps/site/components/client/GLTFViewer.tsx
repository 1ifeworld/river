'use client'

import '@google/model-viewer'

interface GLTFViewerProps {
  src: string
}

const GLTFViewer: React.FC<GLTFViewerProps> = ({ src }) => {
  return (
    <model-viewer
      src={src}
      auto-rotate
      camera-controls
      style={{ width: '100%', height: '100%' }}
      ar
      ar-modes="webxr scene-viewer quick-look"
      environment-image="neutral"
    ></model-viewer>
  )
}

export default GLTFViewer
