"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function AnimatedSphere({ activeColor }: { activeColor: any }) {
  const materialRef = useRef<any>(null);
  const targetColor = useMemo(() => new THREE.Color(), []);

  useFrame((state) => {
    // 1. Get the color value safely
    const colorValue = typeof activeColor === 'string' ? activeColor : activeColor.get();
    targetColor.set(colorValue);

    if (materialRef.current) {
      // 2. SLOW COLOR LERP: Very gradual transition
      materialRef.current.color.lerp(targetColor, 0.02);
      
      // 3. SUBTLE DISTORTION: Reduced from 0.45 to 0.25 for a calmer vibe
      // The speed is controlled by the speed prop, but the "pulse" here is now tiny
      const pulse = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.02;
      materialRef.current.distort = 0.25 + pulse;
    }
  });

  return (
    <>
      {/* Softening the light to avoid harsh dark shadows */}
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
      
      <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.5}>
        <Sphere args={[1.2, 64, 64]}>
          <MeshDistortMaterial
            ref={materialRef}
            speed={0.5}          // DRASTICALLY SLOWED: From 2.5 to 0.5
            distort={0.25}       // CALMER SHAPE: From 0.45 to 0.25
            radius={1}
            metalness={0.1}      // REMOVED CHROME: From 0.8 to 0.1 for a soft look
            roughness={0.4}      // SOFTER SURFACE: From 0.1 to 0.4
            transparent={true}   // ENABLED TRANSPARENCY
            opacity={0.35}       // OPAQUE FIX: Set to 35% so text is visible
            depthWrite={false}   // Helps with transparency layering
          />
        </Sphere>
      </Float>
    </>
  );
}

export default function UniverseCanvas({ activeColor = "#ffffff" }: { activeColor?: any }) {
  return (
    <div className="h-full w-full pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]} 
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance" 
        }}
      >
        {/* Brightening the scene globally */}
        <ambientLight intensity={1.2} />
        <AnimatedSphere activeColor={activeColor} />
      </Canvas>
    </div>
  );
}
