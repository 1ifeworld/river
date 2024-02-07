'use client'

import React, { useEffect } from "react";

interface ModelRendererProps {
  src: string;
}

const ModelRenderer: React.FC<ModelRendererProps> = ({ src }) => {
  useEffect(() => {
    import('@google/model-viewer').catch(console.error)
  }, [])

  return (
    <>
      <model-viewer
        src={src}
        ios-src={src}
        ios
        // ar
        autoplay  
        // ar-modes="webxr scene-viewer" 
        progress
        camera-controls 
        loading ='eager'
        // preload
        touch-action="pan-y" 
        style={{ width: '100%', height: '100%' }}
      ></model-viewer>
    </>
  );
};

export default ModelRenderer
