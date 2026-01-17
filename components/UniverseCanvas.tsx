"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";

function AnimatedSphere({ activeColor }: { activeColor: any }) {
  const materialRef = useRef<any>(null);
  const lightRef = useRef<any>(null);
  
  // Create a stable target color object
  const targetColor = useMemo(() => new THREE.Color(), []);

  useFrame((state) => {
    // 1. Handle incoming color (Supports both hex strings and Framer Motion values)
    const colorValue = typeof activeColor === 'string' ? activeColor : activeColor.get();
    targetColor.set(colorValue);

    if (materialRef.current) {
      // 2. Liquid Color Transition (0.05 lerp factor)
      materialRef.current.color.lerp(targetColor, 0.05);
      
      // 3. Subtle Pulse Effect
      // Makes the sphere feel like it is "breathing"
      const pulse = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05;
      materialRef.current.distort = 0.45 + pulse;
    }

    if (lightRef.current) {
      lightRef.current.color.lerp(targetColor, 0.05);
    }
  });

  return (
    <>
      <pointLight ref={lightRef} position={[10, 10, 10]} intensity={2.5} />
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={1.2}>
        <Sphere args={[1.2, 64, 64]}>
          <MeshDistortMaterial
            ref={materialRef}
            speed={2.5} 
            distort={0.45}
            radius={1}
            metalness={0.8} // Increased for a more "Chrome" premium look
            roughness={0.1}
            emissive={new THREE.Color("#000000")} // Helps with depth on dark backgrounds
          />
        </Sphere>
      </Float>
    </>
  );
}

export default function UniverseCanvas({ activeColor = "#8FB7FF" }: { activeColor?: any }) {
  return (
    <div className="h-full w-full pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 42 }}
        dpr={[1, 1.5]} // Capped at 1.5 for mobile performance (prevents overheating)
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance" 
        }}
      >
        <ambientLight intensity={0.8} />
        <spotLight position={[-10, 10, 10]} angle={0.25} penumbra={1} intensity={2} />
        
        <AnimatedSphere activeColor={activeColor} />
      </Canvas>
    </div>
  );
}
