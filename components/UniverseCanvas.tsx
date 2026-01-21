"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import { useRef, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import * as THREE from "three";
import { getCategoryTheme } from "../lib/theme";

/** ============================
 * AMBIENT ELEMENT
 * Handles dynamic color, distortion, and floating animation
 * ============================ */
function AmbientElement() {
  const meshRef = useRef < THREE.Mesh > (null);
  const materialRef = useRef < THREE.MeshDistortMaterial > (null);
  const searchParams = useSearchParams();
  
  const activeCategory = searchParams.get("category") || undefined;
  
  const targetColor = useMemo(() => {
    switch (activeCategory) {
      case "Tools":
        return new THREE.Color("#4A5D4E");
      case "Life":
        return new THREE.Color("#9B94B0");
      case "Home":
        return new THREE.Color("#D97E6E");
      default:
        return new THREE.Color("#D7C4B7");
    }
  }, [activeCategory]);
  
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const distortionSpeed = isMobile ? 0.1 : 0.3;
  const distortionAmount = isMobile ? 0.1 : 0.2;
  const colorLerpSpeed = isMobile ? 0.01 : 0.02;
  
  useFrame((state) => {
    if (materialRef.current && meshRef.current) {
      const elapsed = state.clock.getElapsedTime();
      const pulse = Math.sin(elapsed * 0.2) * (isMobile ? 0.005 : 0.01);
      
      materialRef.current.distort = distortionAmount + pulse;
      materialRef.current.color.lerp(targetColor, colorLerpSpeed);
    }
  });
  
  useEffect(() => {
    return () => {
      if (materialRef.current) {
        materialRef.current.dispose();
      }
      if (meshRef.current) {
        meshRef.current.geometry.dispose();
      }
    };
  }, []);
  
  return (
    <>
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#ffffff" />
      <Float speed={0.4} rotationIntensity={0.1} floatIntensity={0.2}>
        <Sphere ref={meshRef} args={[1.5, 64, 64]}>
          <MeshDistortMaterial
            ref={materialRef}
            speed={distortionSpeed}
            distort={distortionAmount}
            radius={1}
            metalness={0.05}
            roughness={0.8}
            transparent
            opacity={0.12}
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
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.2} />
        <Suspense fallback={null}>
          <AmbientElement />
        </Suspense>
      </Canvas>
    </div>
  );
}