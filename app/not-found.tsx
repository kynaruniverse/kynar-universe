"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float, Stars } from "@react-three/drei";
import Link from "next/link";
import * as THREE from "three";

function BlackHole() {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    // Rotation adds to the "Swirling Void" effect
    meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.3;
  });

  return (
    <Float speed={3} rotationIntensity={1} floatIntensity={2}>
      {/* Reduced segments for mobile performance: 64x64 is the sweet spot */}
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={1.8}>
        <MeshDistortMaterial
          color="#050505" 
          speed={4}
          distort={0.6} 
          radius={1}
          metalness={1}
          roughness={0.1}
        />
      </Sphere>
    </Float>
  );
}

export default function NotFound() {
  return (
    <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#050505]">
      
      {/* 1. COSMIC BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <Canvas 
          camera={{ position: [0, 0, 5], fov: 75 }}
          dpr={[1, 2]} // High-res on mobile retina screens
        >
          <ambientLight intensity={0.1} />
          {/* Intense Rim Lighting to define the black hole shape */}
          <pointLight position={[5, 5, 5]} intensity={3} color="#8FB7FF" />
          <pointLight position={[-5, -5, 5]} intensity={2} color="#A88BFF" />
          
          <Stars 
            radius={100} 
            depth={50} 
            count={2500} // Reduced count for mobile smoothness
            factor={4} 
            saturation={0} 
            fade 
            speed={0.5} 
          />
          <BlackHole />
        </Canvas>
      </div>

      {/* 2. GLASS CONTENT CARD */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
        className="relative z-10 max-w-lg w-[88%] p-10 md:p-12 text-center rounded-[40px] bg-white/5 backdrop-blur-3xl border border-white/10 shadow-2xl will-change-transform"
      >
        <h1 className="text-7xl md:text-9xl font-bold font-sans text-white tracking-tighter mb-2 opacity-10">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
          Lost in the Void
        </h2>
        <p className="font-serif text-base md:text-lg text-white/50 italic leading-relaxed mb-10 px-4">
          You have drifted beyond the charted sectors of our universe. 
          Gravity is pulling you back to safety.
        </p>

        <Link 
          href="/"
          className="inline-block px-10 py-4 bg-white text-black rounded-full font-bold shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
        >
          Return to Universe
        </Link>
      </motion.div>
    </main>
  );
}
