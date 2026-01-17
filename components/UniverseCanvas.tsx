"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function AnimatedSphere({ activeColor }: { activeColor: string }) {
  const materialRef = useRef<any>(null);
  
  // Use a Color object for smooth transitions
  const targetColor = useMemo(() => new THREE.Color(activeColor), [activeColor]);

  useFrame(() => {
    if (materialRef.current) {
      // Smoothly blend the current color to the target color (lerp)
      // 0.05 provides a "Liquid" slow-motion feel
      materialRef.current.color.lerp(targetColor, 0.05);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
      <Sphere args={[1.2, 64, 64]}>
        <MeshDistortMaterial
          ref={materialRef}
          speed={2} // Subtler speed for premium feel
          distort={0.45}
          radius={1}
          metalness={0.6}
          roughness={0.2}
        />
      </Sphere>
    </Float>
  );
}

export default function UniverseCanvas({ activeColor = "#8FB7FF" }: { activeColor?: string }) {
  return (
    <div className="h-full w-full">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 45 }} // Tighter FOV for better focus
        dpr={[1, 2]} // Optimize for mobile screens
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color={activeColor} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        
        <AnimatedSphere activeColor={activeColor} />
      </Canvas>
    </div>
  );
}
