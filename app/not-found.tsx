"use client";
import { motion } from "framer-motion";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float, Stars } from "@react-three/drei";
import Link from "next/link";
import * as THREE from "three";

function BlackHole() {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    // Subtle rotation of the distortion field
    meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.2;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      {/* 64x64 segments: Optimal balance between geometry detail and mobile GPU load */}
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={1.8}>
        <MeshDistortMaterial
          color="#000000" 
          speed={3}
          distort={0.5} 
          radius={1}
          metalness={1}
          roughness={0}
          emissive="#000000"
        />
      </Sphere>
    </Float>
  );
}

export default function NotFound() {
  return (
    <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#020202]">
      
      {/* 1. COSMIC BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0">
        <Canvas 
          camera={{ position: [0, 0, 5], fov: 75 }}
          dpr={[1, 2]} // Crisp rendering on Retina displays
          gl={{ antialias: true }}
        >
          <ambientLight intensity={0.05} />
          {/* Rim lights to create the "Event Horizon" glow */}
          <pointLight position={[5, 5, 5]} intensity={4} color="#A88BFF" />
          <pointLight position={[-5, -5, 5]} intensity={3} color="#8ED9A1" />
          
          <Stars 
            radius={100} 
            depth={50} 
            count={2000} 
            factor={4} 
            saturation={0} 
            fade 
            speed={1} 
          />
          <BlackHole />
        </Canvas>
      </div>

      {/* 2. KINETIC CONTENT CARD */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
        className="relative z-10 max-w-xl w-[90%] p-12 md:p-20 text-center rounded-[64px] bg-white/[0.03] backdrop-blur-3xl border border-white/10 shadow-2xl overflow-hidden"
      >
        {/* Decorative Internal Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <h1 className="text-8xl md:text-[12rem] font-black font-sans text-white tracking-tighter mb-4 opacity-10 leading-none select-none">
          404
        </h1>
        
        <div className="space-y-6">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none">
            Lost in <br/> the Void
          </h2>
          <p className="font-serif text-lg md:text-xl text-white/40 italic leading-relaxed max-w-sm mx-auto">
            You have drifted beyond the charted sectors of the Kynar Universe. 
          </p>
        </div>

        <div className="mt-12">
          <Link 
            href="/"
            className="inline-flex items-center px-16 py-6 bg-white text-black rounded-full text-xs font-black uppercase tracking-[0.3em] shadow-2xl hover:scale-105 active:scale-95 transition-all duration-500"
          >
            Re-Establish Presence
          </Link>
        </div>

        {/* Technical Footer */}
        <div className="mt-12 flex justify-center gap-4">
           <div className="w-1.5 h-1.5 rounded-full bg-tools-accent/30" />
           <div className="w-1.5 h-1.5 rounded-full bg-life-accent/30" />
           <div className="w-1.5 h-1.5 rounded-full bg-home-accent/30" />
        </div>
      </motion.div>
    </main>
  );
}
