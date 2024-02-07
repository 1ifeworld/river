'use client'

// import Script from "next/script"
// import React from "react"

// interface ModelRendererProps {
//   src: string
// }

// const ModelRenderer: React.FC<ModelRendererProps> = ({ src }) => {
//   return (
//     <>
//       <Script 
//         src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js"
//         type="module"
//       />
//       <model-viewer
//         src={src}
//         ios-src={src}
//         ios
//         ar
//         autoplay  
//         ar-modes="webxr scene-viewer" 
//         progress
//         camera-controls 
//         preload
//         touch-action="pan-y" 
//         style={{ width: '100%', height: '100%' }}
//       ></model-viewer>
//     </>
//   )
// }

// export default ModelRenderer

import Script from "next/script";
import React, { useEffect } from "react";

interface ModelRendererProps {
  src: string;
}

const ModelRenderer: React.FC<ModelRendererProps> = ({ src }) => {
  useEffect(() => {
    // Dynamically import @google/model-viewer after component mounts
    import('@google/model-viewer').catch(console.error);
  }, []); // Run only once on component mount

  return (
    <>
      <model-viewer
        src={src}
        ios-src={src}
        ios
        ar
        autoplay  
        ar-modes="webxr scene-viewer" 
        progress
        camera-controls 
        preload
        touch-action="pan-y" 
        style={{ width: '100%', height: '100%' }}
      ></model-viewer>
    </>
  );
};

export default ModelRenderer;
