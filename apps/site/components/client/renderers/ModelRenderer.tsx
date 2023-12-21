'use client'

import React, { Suspense, useRef, useEffect } from 'react'
import {
  useGLTF,
  Environment,
  OrbitControls,
  PerspectiveCamera,
  useProgress,
  Html,
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

      modelRef.current.rotation.set(0, 0, 0)

      modelRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material.roughness = 0.5
        }
      })
    }
  }, [src])

  return <primitive object={gltf.scene} ref={modelRef} dispose={null} />
}

const ModelViewer: React.FC<ModelProps> = ({ src }) => {
  const { progress } = useProgress()

  return (
    <Canvas>
      <Suspense fallback={<Html center>Loading {Math.round(progress)}%</Html>}>
        <PerspectiveCamera makeDefault position={[0, 1, 2]} />
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <Model src={src} />
        <OrbitControls />
      </Suspense>
    </Canvas>
  )
}

export default ModelViewer
