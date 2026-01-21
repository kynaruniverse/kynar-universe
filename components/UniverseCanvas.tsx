"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import { useRef, useMemo, useEffect, Suspense } from "react"; // ✅ FIX 1: Added Suspense import
import { useSearchParams } from "next/navigation";
import * as THREE from "three";
// 1. Import theme utility (Verified in Step 8)
import { getCategoryTheme } from "../lib/theme";

/** ============================
 * AMBIENT ELEMENT
 * Handles dynamic color, distortion, and floating animation
 * ============================ */
function AmbientElement() {
  // ✅ FIX 2: Changed generic to 'any' to prevent TypeScript build errors with Drei libraries
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null); 
  const searchParams = useSearchParams();
  
  /** --------------------------
   * THEME & COLOR
   * -------------------------- */
  const activeCategory = searchParams.get("category") || undefined;
  
  // Map categories to softer Three.js colors
  const targetColor = useMemo(() => {
    switch (activeCategory) {
      case "Tools":
        return new THREE.Color("#4A5D4E"); // Matches brand-accent
      case "Life":
        return new THREE.Color("#9B94B0"); // Matches accent-lavender
      case "Home":
        return new THREE.Color("#D97E6E"); // Matches accent-thermal
      default:
        return new THREE.Color("#D7C4B7"); // Default surface color
    }
  }, [activeCategory]);
  
  /** --------------------------
   * MOBILE OPTIMIZATION
   * -------------------------- */
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const distortionSpeed = isMobile ? 0.1 : 0.3;
  const distortionAmount = isMobile ? 0.1 : 0.2;
  const colorLerpSpeed = isMobile ? 0.01 : 0.02;
  
  /** --------------------------
   * ANIMATION LOOP
   * -------------------------- */
  useFrame((state) => {
    if (!materialRef.current) return;
    
    const elapsed = state.clock.getElapsedTime();
    const pulse = Math.sin(elapsed * 0.2) * (isMobile ? 0.005 : 0.01);
    
    // Smoothly interpolate distortion and color
    materialRef.current.distort = distortionAmount + pulse;
    materialRef.current.color.lerp(targetColor, colorLerpSpeed);
  });
  
  /** --------------------------
   * CLEANUP ON UNMOUNT
   * -------------------------- */
  useEffect(() => {
    return () => {
      materialRef.current?.dispose();
      meshRef.current?.geometry.dispose();
      // Safe check before disposing map
      if (materialRef.current?.map) materialRef.current.map.dispose();
    };
  }, []);
  
  /** --------------------------
   * RENDER
   * -------------------------- */
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

/** ============================
 * UNIVERSE CANVAS
 * Wrapper component for 3D scene
 * ============================ */
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
        {/* ✅ FIX 3: Wrapped in Suspense because usage of useSearchParams() requires it */}
        <Suspense fallback={null}>
          <AmbientElement />
        </Suspense>
      </Canvas>
    </div>
  );
}
