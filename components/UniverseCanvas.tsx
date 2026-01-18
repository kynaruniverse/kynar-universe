"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import { useRef } from "react";

function AmbientElement() {
  const materialRef = useRef<any>(null);

  useFrame((state) => {
    if (materialRef.current) {
      // 1. ANIMATION LOOP: Subtle organic breathing cycle
      const time = state.clock.getElapsedTime();
      const pulse = Math.sin(time * 0.2) * 0.01;
      materialRef.current.distort = 0.2 + pulse;
    }
  });

  return (
    <>
      {/* 2. LIGHTING CONFIGURATION: Soft ambient setup to avoid harsh shadows */}
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#ffffff" />
      
      <Float speed={0.4} rotationIntensity={0.1} floatIntensity={0.2}>
        <Sphere args={[1.5, 64, 64]}>
          <MeshDistortMaterial
            ref={materialRef}
            speed={0.3}          // Motion speed for background subtlety
            distort={0.2}        // Geometric distortion level
            radius={1}
            metalness={0.05}     // Matte texture for a soft, ceramic feel
            roughness={0.8}      // High roughness for diffuse light catching
            transparent={true}   
            opacity={0.08}       // Low opacity for background integration
            color="#1C1C1C"      // Primary brand color
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
        <AmbientElement />
      </Canvas>
    </div>
  );
}
