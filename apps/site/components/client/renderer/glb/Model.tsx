'use client'
import React, { Suspense, useRef, useEffect } from 'react'
import {
  useGLTF,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'
import { GLTF as GLTFThree } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'

interface ModelProps {
  src: string
}

const Model: React.FC<ModelProps> = ({ src }) => {
  const gltf = useGLTF(src, true) as GLTFThree
  const modelRef = useRef<THREE.Object3D>(null)

  useEffect(() => {
    if (modelRef.current) {
      const box = new THREE.Box3().setFromObject(modelRef.current)
      const size = box.getSize(new THREE.Vector3())
      const maxDimension = Math.max(size.x, size.y, size.z)
      modelRef.current.scale.setScalar(0.8 / maxDimension)
    }
  }, [src])

  return <primitive object={gltf.scene} ref={modelRef} dispose={null} />
}

const ModelViewer: React.FC<ModelProps> = ({ src }) => {
  return (
    // we can create a fall back loading component if we wish
    <Canvas>
      <Suspense>
        <PerspectiveCamera makeDefault position={[0, 1, 2]} />
        <ambientLight position={[0, 0, 5]} intensity={1} />
        <ambientLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[10, 10, 5]} intensity={2} />
        <directionalLight position={[-10, -10, -5]} intensity={2} />
        <Model src={src} />
        <OrbitControls />
      </Suspense>
    </Canvas>
  )
}

export default ModelViewer
