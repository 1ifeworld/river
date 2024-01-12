'use client'
import React, { Suspense, useEffect, useRef } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import {
  Html,
  OrbitControls,
  PerspectiveCamera,
  useGLTF,
  useProgress,
} from '@react-three/drei'
import * as THREE from 'three'
import { GLTF as GLTFThree } from 'three/examples/jsm/loaders/GLTFLoader'

interface ModelProps {
  src: string
}

const Model: React.FC<ModelProps> = ({ src }) => {
  const gltf = useGLTF(src, true) as GLTFThree
  const modelRef = useRef<THREE.Object3D>(null)
  const { camera } = useThree()

  useEffect(() => {
    if (modelRef.current) {
      // Compute the bounding box to understand the model's size and center
      const box = new THREE.Box3().setFromObject(modelRef.current)
      const center = box.getCenter(new THREE.Vector3())
      const size = box.getSize(new THREE.Vector3())

      // Set the camera's distance from the model based on its size
      const maxDimension = Math.max(size.x, size.y, size.z)
      camera.position.z = maxDimension * 3 // Camera distance from model adjust as necessary

      // Set the model's scale to be within a normalized range
      const desiredScale = 1.0 // Desired scale adjust as needed
      modelRef.current.scale.setScalar(desiredScale / maxDimension)

      // Adjust the model's position to be centered in the view
      modelRef.current.position.sub(center)

      // Optionally, set the model to face the camera directly
      modelRef.current.rotation.y = Math.PI // Rotate the model to face the camera

      // Normalize material properties for a consistent aesthetic
      modelRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material.roughness = 1 // Adjust for aesthetic preference
          // Apply additional material properties as needed
        }
      })
    }
  }, [src, camera])

  return <primitive object={gltf.scene} ref={modelRef} dispose={null} />
}

const ModelViewer: React.FC<ModelProps> = ({ src }) => {
  const { progress } = useProgress()

  return (
    <Canvas>
      <Suspense fallback={<Html center>Loading {Math.round(progress)}%</Html>}>
        <PerspectiveCamera makeDefault fov={50} />
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <Model src={src} />
        <OrbitControls />
      </Suspense>
    </Canvas>
  )
}

export default ModelViewer
