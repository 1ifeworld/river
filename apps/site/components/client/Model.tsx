// 'use client'
// import React, { useEffect, useState } from 'react';
// import '@google/model-viewer';
// import { ModelViewerElement } from "@google/model-viewer";

// interface GLTFViewerProps {
//   src: string;
// }

// const GLTFViewer: React.FC<GLTFViewerProps> = ({ src }) => {

//   return (
//  <model-viewer
//     src={src}
//     camera-controls
//     auto-rotate
//     ar
//   ></model-viewer>    // React.createElement('model-viewer', {
//     //   src,
//     //   'auto-rotate': true,
//     //   'camera-controls': true,
//     //   ar: true,
//     //   'ar-modes': "webxr scene-viewer quick-look",
//     //   'environment-image': "neutral"
//     // } as Partial<ModelViewerElement>)
//   );
// }

// export default GLTFViewer;
'use client'
import React from "react";
import { useGLTF, OrbitControls} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { GLTF as GLTFThree } from "three/examples/jsm/loaders/GLTFLoader";

interface ModelProps {
  src: string
}

const Model: React.FC<ModelProps> = ({ src }) => {
  const gltf = useGLTF(src, true) as GLTFThree 
  gltf.scene.scale.set(1, 1, 1); // Adjust the scale as needed.

  return (
    <Canvas>
      <ambientLight intensity={1} />
      <directionalLight position={[0, 5, 5]} intensity={2} />
      <directionalLight position={[5, 5, 5]} intensity={3} />

      <primitive object={gltf.scene} dispose={null} />
      <OrbitControls />

    </Canvas>
  );
};

export default Model