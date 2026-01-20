"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import { useRef, useMemo, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import * as THREE from 'three';
// 1. Import the unified theme utility
import { getCategoryTheme } from '../lib/theme';

function AmbientElement() {
  const materialRef = useRef<any>(null);
  const searchParams = useSearchParams();
  
  // 2. Detect the active theme color from the URL
  const activeCategory = searchParams.get('category') || undefined;
  const theme = getCategoryTheme(activeCategory);
  
  // Convert Tailwind-style hex or name to a Three.js color object
  // We pull the "text" color but soften it for the background
  const targetColor = useMemo(() => {
    switch(activeCategory) {
      case 'Tools': return new THREE.Color("#4A5D4E");
      case 'Life': return new THREE.Color("#9B94B0");
      case 'Home': return new THREE.Color("#D97E6E");
      default: return new THREE.Color("#D7C4B7"); // Default surface color
    }
  }, [activeCategory]);

  // 4. MOBILE OPTIMIZATION: Reduce complexity for smaller screens
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const distortionSpeed = isMobile ? 0.1 : 0.3;
  const distortionAmount = isMobile ? 0.1 : 0.2;

  useFrame((state) => {
    if (materialRef.current) {
      const time = state.clock.getElapsedTime();
      const pulse = Math.sin(time * 0.2) * (isMobile ? 0.005 : 0.01);
      materialRef.current.distort = distortionAmount + pulse;
      
      // 3. SMOOTH COLOR TRANSITION: Lerp the color for a "liquid" feel
      materialRef.current.color.lerp(targetColor, isMobile ? 0.01 : 0.02);
    }
  });
  const meshRef = useRef<any>(null);
  
  useEffect(() => {
    return () => {
      if (materialRef.current) {
        materialRef.current.dispose();
      }
      if (meshRef.current?.geometry) {
        meshRef.current.geometry.dispose();
      }
      // Clear textures if any
      if (materialRef.current?.map) materialRef.current.map.dispose();
    };
  }, []);

  return (
    <>
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#ffffff" />
      
      <Float speed={0.4} rotationIntensity={0.1} floatIntensity={0.2}>
        <Sphere ref={meshRef} args={[1.5, 64, 64]}>
          <MeshDistortMaterial
            ref={materialRef}
            speed={0.3}
            distort={0.2}
            radius={1}
            metalness={0.05}
            roughness={0.8}
            transparent={true}   
            opacity={0.12}       // Slightly increased opacity for color visibility
            depthWrite={false}   
          />
        </Sphere>
      </Float>
    </>
  );
}

export default function UniverseCanvas() {
  return (
    <div className="h-full w-full pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 40 }}
        dpr={[1, 1.5]} 
        gl={{ 
          antialias: true, 
          alpha: true,
        }}
      >
        <ambientLight intensity={1.2} />
        <AmbientElement />
      </Canvas>
    </div>
  );
}
