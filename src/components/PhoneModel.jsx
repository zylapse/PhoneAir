/**
 * PhoneModel — Monochrome Edition.
 * Procedural 3D smartphone built with high-contrast materials:
 * Titanium silver, polished black chrome, and deep onyx glass.
 */
import { forwardRef, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';

const PhoneModel = forwardRef(function PhoneModel({ idleFloat = false }, ref) {
  const groupRef = useRef(null);
  const clock = useRef(0);

  // Assign ref to group
  const setRefs = (el) => {
    groupRef.current = el;
    if (typeof ref === 'function') ref(el);
    else if (ref) ref.current = el;
  };

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (idleFloat) {
      clock.current += delta;
      groupRef.current.position.y =
        Math.sin(clock.current * 0.5) * 0.08;
      groupRef.current.rotation.y += 0.003;
    }
  });

  // Materials (Monochrome Palette)
  const bodyMat = new THREE.MeshPhysicalMaterial({
    color: '#050505', // Deep Onyx
    metalness: 0.9,
    roughness: 0.1,
    reflectivity: 1.0,
    clearcoat: 1.0,
  });

  const frameMat = new THREE.MeshPhysicalMaterial({
    color: '#D1D1D1', // Titanium Silver
    metalness: 1.0,
    roughness: 0.15,
    clearcoat: 0.5,
  });

  const buttonMat = new THREE.MeshPhysicalMaterial({
    color: '#FFFFFF',
    metalness: 1.0,
    roughness: 0.05,
  });

  const camLensMat = new THREE.MeshPhysicalMaterial({
    color: '#000000',
    metalness: 0.5,
    roughness: 0.0,
    clearcoat: 1.0,
  });

  // Screen Texture (Monochrome)
  const screenCanvas = document.createElement('canvas');
  screenCanvas.width = 256;
  screenCanvas.height = 512;
  const ctx = screenCanvas.getContext('2d');
  
  // Dark Background
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, 256, 512);
  
  // Minimal Text
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 24px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('AIR', 128, 256);
  
  ctx.strokeStyle = 'rgba(255,255,255,0.1)';
  ctx.lineWidth = 1;
  ctx.strokeRect(20, 20, 216, 472);
  
  const screenTex = new THREE.CanvasTexture(screenCanvas);

  const screenMat = new THREE.MeshStandardMaterial({
    map: screenTex,
    roughness: 0.1,
    metalness: 0.1,
  });

  return (
    <group ref={setRefs}>
      <Environment preset="studio" />

      {/* Main Body */}
      <mesh material={bodyMat} castShadow>
        <boxGeometry args={[1.1, 2.2, 0.1]} />
      </mesh>

      {/* Titanium Frame */}
      <mesh material={frameMat}>
        <boxGeometry args={[1.12, 2.22, 0.105]} />
      </mesh>

      {/* Screen (Front) */}
      <mesh material={screenMat} position={[0, 0, 0.054]}>
        <planeGeometry args={[1.0, 2.1]} />
      </mesh>

      {/* Camera Module (Rear) */}
      <mesh material={bodyMat} position={[-0.28, 0.8, -0.06]}>
        <boxGeometry args={[0.3, 0.35, 0.04]} />
      </mesh>

      {/* Lenses */}
      {[-0.1, 0, 0.1].map((offset, i) => (
        <mesh key={i} material={camLensMat} position={[-0.28, 0.8 - offset, -0.08]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.02, 32]} />
        </mesh>
      ))}

      {/* Side Buttons */}
      <mesh material={buttonMat} position={[0.56, 0.2, 0]}>
        <boxGeometry args={[0.02, 0.15, 0.04]} />
      </mesh>
      <mesh material={buttonMat} position={[-0.56, 0.4, 0]}>
        <boxGeometry args={[0.02, 0.1, 0.04]} />
      </mesh>
      <mesh material={buttonMat} position={[-0.56, 0.2, 0]}>
        <boxGeometry args={[0.02, 0.1, 0.04]} />
      </mesh>

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#FFFFFF" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#FFFFFF" />
      <spotLight position={[0, 5, 0]} intensity={2} angle={0.3} penumbra={1} color="#FFFFFF" castShadow />
    </group>
  );
});

export default PhoneModel;
