"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Trail, MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { cn } from "@/lib/utils";

interface HolographicCoreProps {
  className?: string;
}

// Particle stream that flows around the core
function ParticleStream({ index, total }: { index: number; total: number }) {
  const particleRef = useRef<THREE.Mesh>(null);
  const trailTargetRef = useRef<THREE.Mesh>(null);

  const radius = 2.5;
  const height = 1.5;
  const speed = 0.2;
  const phase = (index / total) * Math.PI * 2;

  useFrame(({ clock }) => {
    if (particleRef.current && trailTargetRef.current) {
      const time = clock.elapsedTime * speed;
      const angle = (time + phase) % (Math.PI * 2);
      
      // Create smooth looping path around toroidal structure
      const x = radius * Math.cos(angle);
      const y = height * Math.sin(angle * 2) * 0.5;
      const z = radius * Math.sin(angle);

      particleRef.current.position.set(x, y, z);
      trailTargetRef.current.position.set(x, y, z);
      
      // Subtle pulsing
      const pulse = Math.sin(clock.elapsedTime * 2 + phase) * 0.1 + 1;
      particleRef.current.scale.setScalar(pulse * 0.4);
    }
  });

  return (
    <group>
      <Trail
        width={0.15}
        length={2}
        color={new THREE.Color("#06b6d4")}
        attenuation={(t) => t * t}
      >
        <mesh ref={trailTargetRef}>
          <sphereGeometry args={[0.01, 8, 8]} />
          <meshBasicMaterial color="#06b6d4" transparent opacity={0} />
        </mesh>
      </Trail>
      <mesh ref={particleRef}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
}

// Holographic geometric core - toroidal field structure
function HolographicCore() {
  const coreRef = useRef<THREE.Group>(null);
  const innerPlaneRef = useRef<THREE.Mesh>(null);
  const outerTorusRef = useRef<THREE.Mesh>(null);
  const particleCount = 50;

  useFrame(({ clock }) => {
    if (coreRef.current) {
      // Slow, meditative rotation
      coreRef.current.rotation.y = clock.elapsedTime * 0.1;
      coreRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.05) * 0.1;
    }
    if (innerPlaneRef.current) {
      // Subtle pulsing of inner plane
      const pulse = Math.sin(clock.elapsedTime * 0.8) * 0.1 + 1;
      innerPlaneRef.current.scale.setScalar(pulse);
      innerPlaneRef.current.rotation.z = clock.elapsedTime * 0.2;
    }
  });

  const particles = useMemo(
    () =>
      Array.from({ length: particleCount }, (_, i) => (
        <ParticleStream key={i} index={i} total={particleCount} />
      )),
    [particleCount]
  );

  return (
    <group ref={coreRef}>
      {/* Inner 2D plane - folded information plane */}
      <mesh ref={innerPlaneRef}>
        <circleGeometry args={[1.2, 64]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Glowing edge of the plane */}
      <mesh ref={innerPlaneRef}>
        <ringGeometry args={[1.15, 1.2, 64]} />
        <meshBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Outer toroidal field */}
      <mesh ref={outerTorusRef}>
        <torusGeometry args={[2.5, 0.8, 32, 100]} />
        <MeshDistortMaterial
          color="#14b8a6"
          transparent
          opacity={0.25}
          distort={0.15}
          speed={0.5}
          roughness={0}
        />
      </mesh>

      {/* Additional geometric layers for depth */}
      <mesh>
        <torusGeometry args={[2.3, 0.6, 32, 100]} />
        <meshBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Particle streams */}
      {particles}
    </group>
  );
}

// Background gradient and subtle elements
function BackgroundElements() {
  return (
    <>
      {/* Background is transparent - site background shows through */}

      {/* Faint geometric nodes in background */}
      {Array.from({ length: 20 }, (_, i) => {
        const angle = (i / 20) * Math.PI * 2;
        const radius = 4 + Math.random() * 2;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle) * radius,
              -3,
            ]}
          >
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshBasicMaterial
              color="#6b21a8"
              transparent
              opacity={0.15}
            />
          </mesh>
        );
      })}
    </>
  );
}

// Camera controller with subtle movement
function CameraController() {
  useFrame(({ camera, clock }) => {
    // Gentle camera drift
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
function HolographicScene() {
  return (
    <>
      {/* Volumetric lighting */}
      <ambientLight intensity={0.5} />
      <pointLight
        position={[0, 0, 0]}
        intensity={2.5}
        color="#06b6d4"
        distance={10}
        decay={2}
      />
      <pointLight
        position={[3, 3, 3]}
        intensity={1}
        color="#14b8a6"
        distance={8}
        decay={2}
      />
      <pointLight
        position={[-3, -3, -3]}
        intensity={0.8}
        color="#8b5cf6"
        distance={8}
        decay={2}
      />
      <directionalLight position={[5, 5, 5]} intensity={0.3} color="#ffffff" />

      {/* Scene elements */}
      <BackgroundElements />
      <HolographicCore />
      <CameraController />
    </>
  );
}

export function HolographicCoreHero({ className = "" }: HolographicCoreProps) {
  return (
    <div className={cn("relative w-full h-full", className)}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true, premultipliedAlpha: false }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["transparent"]} />
        <HolographicScene />
      </Canvas>
    </div>
  );
}

