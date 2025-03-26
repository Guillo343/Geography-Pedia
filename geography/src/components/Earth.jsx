import React, { useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

export const Earth = () => {
  const meshRef = useRef();
  const colorMap = useLoader(TextureLoader, '/assets/earth-texture.jpg');

  return (
    <mesh ref={meshRef} scale={2.5}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial 
        map={colorMap}
        roughness={0.7}
        metalness={0.2}
      />
    </mesh>
  );
};