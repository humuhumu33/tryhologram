"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { cn } from "@/lib/utils";

interface HolographicTorusProps {
  className?: string;
}

// Holographic scan lines effect
function ScanLines() {
  const scanLines = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => (
        <ScanLine key={i} offset={i * 0.4} />
      )),
    []
  );

  return <>{scanLines}</>;
}

function ScanLine({ offset }: { offset: number }) {
  const scanLineRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (scanLineRef.current) {
      // Moving scan line effect
      const y = Math.sin(clock.elapsedTime * 2 + offset) * 2;
      scanLineRef.current.position.y = y;
      const opacity = Math.max(0, Math.sin(clock.elapsedTime * 2 + offset) * 0.15);
      if (scanLineRef.current.material instanceof THREE.Material) {
        (scanLineRef.current.material as THREE.MeshBasicMaterial).opacity = opacity;
      }
    }
  });

  return (
    <mesh ref={scanLineRef} position={[0, 0, 0]}>
      <planeGeometry args={[10, 0.05]} />
      <meshBasicMaterial
        color="#00ffff"
        transparent
        opacity={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Detailed holographic torus
function HolographicTorus() {
  const torusRef = useRef<THREE.Mesh>(null);
  const innerTorusRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (torusRef.current) {
      // Slow rotation
      torusRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.1) * 0.2;
      torusRef.current.rotation.y = clock.elapsedTime * 0.15;
    }
    if (innerTorusRef.current) {
      innerTorusRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.1) * 0.2;
      innerTorusRef.current.rotation.y = clock.elapsedTime * 0.15;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.1) * 0.2;
      wireframeRef.current.rotation.y = clock.elapsedTime * 0.15;
    }
    if (glowRef.current) {
      glowRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.1) * 0.2;
      glowRef.current.rotation.y = clock.elapsedTime * 0.15;
      
      // Pulsing glow
      const pulse = Math.sin(clock.elapsedTime * 1.5) * 0.1 + 1;
      glowRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group>
      {/* Outer glow layer */}
      <mesh ref={glowRef}>
        <torusGeometry args={[3.2, 1.3, 32, 100]} />
        <meshBasicMaterial
          color="#00ffff"
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Main torus with holographic distortion */}
      <mesh ref={torusRef}>
        <torusGeometry args={[3, 1.2, 64, 120]} />
        <MeshDistortMaterial
          color="#00ffff"
          transparent
          opacity={0.3}
          distort={0.1}
          speed={0.5}
          roughness={0}
        />
      </mesh>

      {/* Inner torus layer for depth */}
      <mesh ref={innerTorusRef}>
        <torusGeometry args={[2.8, 1, 64, 120]} />
        <meshBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.25}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Detailed wireframe overlay */}
      <mesh ref={wireframeRef}>
        <torusGeometry args={[3, 1.2, 48, 80]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.6}
          wireframe={true}
        />
      </mesh>

      {/* Additional wireframe for more detail */}
      <mesh ref={wireframeRef}>
        <torusGeometry args={[2.8, 1, 32, 60]} />
        <meshBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.4}
          wireframe={true}
        />
      </mesh>

      {/* Holographic edge highlights */}
      <mesh ref={torusRef}>
        <torusGeometry args={[3.05, 1.22, 64, 120]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.3}
          wireframe={true}
        />
      </mesh>
    </group>
  );
}

// Holographic particles/glitches
function HolographicParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => {
        const angle = (i / 30) * Math.PI * 2;
        const radius = 3.5 + Math.random() * 0.5;
        return {
          position: [
            Math.cos(angle) * radius,
            Math.sin(angle * 2) * 0.3,
            Math.sin(angle) * radius,
          ] as [number, number, number],
          delay: Math.random() * 2,
        };
      }),
    []
  );

  return (
    <>
      {particles.map((particle, i) => (
        <HolographicParticle
          key={i}
          position={particle.position}
          delay={particle.delay}
        />
      ))}
    </>
  );
}

function HolographicParticle({
  position,
  delay,
}: {
  position: [number, number, number];
  delay: number;
}) {
  const particleRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (particleRef.current) {
      const time = clock.elapsedTime - delay;
      if (time > 0) {
        // Glitch effect - appear and disappear
        const glitch = Math.sin(time * 5) > 0.5;
        particleRef.current.visible = glitch;
        
        // Flicker
        const flicker = Math.random() > 0.3;
        if (particleRef.current.material instanceof THREE.Material) {
          (particleRef.current.material as THREE.MeshBasicMaterial).opacity = flicker ? 0.8 : 0.2;
        }
      }
    }
  });

  return (
    <mesh ref={particleRef} position={position} visible={false}>
      <sphereGeometry args={[0.03, 8, 8]} />
      <meshBasicMaterial
        color="#00ffff"
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

// Volumetric lighting for holographic effect
function HolographicLighting() {
  return (
    <>
      <ambientLight intensity={0.4} color="#ffffff" />
      <pointLight
        position={[0, 0, 0]}
        intensity={3}
        color="#00ffff"
        distance={10}
        decay={2}
      />
      <pointLight
        position={[4, 4, 4]}
        intensity={2}
        color="#06b6d4"
        distance={8}
        decay={2}
      />
      <pointLight
        position={[-4, -4, -4]}
        intensity={1.5}
        color="#8b5cf6"
        distance={8}
        decay={2}
      />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#ffffff" />
    </>
  );
}

// Camera with subtle movement
function CameraController() {
  useFrame(({ camera, clock }) => {
    // Gentle camera orbit
    const radius = 8;
    const angle = clock.elapsedTime * 0.03;
    camera.position.x = Math.cos(angle) * radius;
    camera.position.z = Math.sin(angle) * radius;
    camera.position.y = Math.sin(clock.elapsedTime * 0.02) * 0.5;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// Main scene
function HolographicTorusScene() {
  return (
    <>
      <HolographicLighting />
      <HolographicTorus />
      <HolographicParticles />
      <ScanLines />
      <CameraController />
    </>
  );
}

export function HolographicTorusHero({
  className = "",
}: HolographicTorusProps) {
  return (
    <div className={cn("relative w-full h-full", className)}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true, premultipliedAlpha: false }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["transparent"]} />
        <HolographicTorusScene />
      </Canvas>
    </div>
  );
}

