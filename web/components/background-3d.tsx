"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Image, Float, Environment, Stars } from "@react-three/drei";
import * as THREE from "three";

interface FloatingPosterProps {
  url: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

function FloatingPoster({ url, position, rotation = [0, 0, 0], scale = 1 }: FloatingPosterProps) {
  const ref = useRef<THREE.Group>(null);
  const [hovered, hover] = useState(false);

  useFrame((state, delta) => {
    if (ref.current) {
      // Subtle extra movement on hover or just continuous
      ref.current.position.y += Math.sin(state.clock.elapsedTime) * 0.001;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group
        ref={ref}
        position={position as any}
        rotation={rotation as any}
        scale={hovered ? scale * 1.1 : scale}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
      >
        <Image url={url} transparent opacity={0.9} scale={[3, 2]} />
      </group>
    </Float>
  );
}

export function Background3D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 40 }}>
        <color attach="background" args={["#050505"]} />
        <fog attach="fog" args={["#050505", 5, 20]} />

        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />

        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        {/* Center - SciFi (Blade Runner 2049) */}
        <FloatingPoster
          url="https://image.tmdb.org/t/p/original/ilRyASD8ybpJORWdmkC9NJn0p8a.jpg"
          position={[0, 0, 0]}
          scale={1.5}
        />

        {/* Left - Noir (The Godfather) */}
        <FloatingPoster
          url="https://image.tmdb.org/t/p/original/rPZT06Nn1TMjV5yS3eHqPuxfL.jpg"
          position={[-4, 1, -2]}
          rotation={[0, 0.3, 0]}
        />

        {/* Right - Western (The Good, the Bad and the Ugly) */}
        <FloatingPoster
          url="https://image.tmdb.org/t/p/original/xM8o4gC40G6eB96N3xG20z0zR2T.jpg"
          position={[4, -1, -2]}
          rotation={[0, -0.3, 0]}
        />

        {/* Top/Back - Fantasy (LOTR: Fellowship) */}
        <FloatingPoster
          url="https://image.tmdb.org/t/p/original/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg"
          position={[0, 3, -5]}
          rotation={[0.1, 0, 0]}
        />

        <Environment preset="city" />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60" />
    </div>
  );
}
