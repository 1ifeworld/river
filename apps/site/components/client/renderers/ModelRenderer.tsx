'use client'

import React, { useEffect } from "react"
import Script from "next/script"
interface ModelRendererProps {
  src: string;
}

const ModelRenderer: React.FC<ModelRendererProps> = ({ src }) => {
  // useEffect(() => {
  //   import('@google/model-viewer').catch(console.error)
  // }, [])

  <Script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js"></Script>

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
