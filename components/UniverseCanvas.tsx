"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import { useRef } from "react";

function MuseSphere() {
  const materialRef = useRef<any>(null);

  useFrame((state) => {
    if (materialRef.current) {
      // 1. LIQUID MOTION: Slower, organic breathing cycle
      const time = state.clock.getElapsedTime();
      const pulse = Math.sin(time * 0.2) * 0.01;
      materialRef.current.distort = 0.2 + pulse;
    }
  });

  return (
    <>
      {/* 2. SOFT AMBIENT LIGHTING: Removing harsh shadows */}
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#ffffff" />
      
      <Float speed={0.4} rotationIntensity={0.1} floatIntensity={0.2}>
        <Sphere args={[1.5, 64, 64]}>
          <MeshDistortMaterial
            ref={materialRef}
            speed={0.3}          // LUSH SLOWNESS: 0.3 for barely-there motion
            distort={0.2}       // CALM GEOMETRY: Minimal distortion
            radius={1}
            metalness={0.05}     // ORGANIC: Low metalness for a ceramic/soft feel
            roughness={0.8}      // DIFFUSE: High roughness to catch light softly
            transparent={true}   
            opacity={0.08}       // SPACE AS LUXURY: Reduced to 8% visibility
            color="#1C1C1C"      // BRAND COLOR: Matches brand-text
            depthWrite={false}   
          />
        </Sphere>
      </Float>
    </>
  );
}

export default function UniverseCanvas() {
  return (
    <div className="h-full w-full pointer-events-none transition-opacity duration-[2s]">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 40 }}
        dpr={[1, 1.5]} 
        gl={{ 
          antialias: true, 
          alpha: true,
        }}
      >
        <ambientLight intensity={0.8} />
        <MuseSphere />
      </Canvas>
    </div>
  );
}
