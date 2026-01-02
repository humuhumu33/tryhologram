"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Trail, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { cn } from "@/lib/utils";

interface ToroidalLightEngineProps {
  className?: string;
}

// 2D Informational Plane Component - represents light-speed boundary
function InformationalPlane() {
  const planeRef = useRef<THREE.Mesh>(null);
  const edgeRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (planeRef.current) {
      // Subtle pulsing animation
      const pulse = Math.sin(clock.elapsedTime * 0.5) * 0.1 + 1;
      planeRef.current.scale.setScalar(pulse);
      
      // Gentle rotation
      planeRef.current.rotation.z = clock.elapsedTime * 0.1;
    }
    if (edgeRef.current) {
      // Pulsing edge glow
      const glow = Math.sin(clock.elapsedTime * 0.8) * 0.2 + 0.8;
      if (edgeRef.current.material instanceof THREE.Material) {
        (edgeRef.current.material as THREE.MeshBasicMaterial).opacity = glow;
      }
    }
  });

  return (
    <group>
      {/* Main plane */}
      <mesh ref={planeRef} position={[0, 0, 0]}>
        <circleGeometry args={[2, 64]} />
        <meshBasicMaterial
          color="#a7c7ff"
          transparent
          opacity={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Glowing edge - light-speed boundary */}
      <mesh ref={edgeRef}>
        <ringGeometry args={[1.95, 2, 64]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.9}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Inner glow */}
      <mesh>
        <circleGeometry args={[1.5, 64]} />
        <meshBasicMaterial
          color="#dbeafe"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

// Particle that flows along torus with outward expansion and backward loop
function Particle({ index, total }: { index: number; total: number }) {
  const particleRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const trailTargetRef = useRef<THREE.Mesh>(null);

  const majorRadius = 3;
  const minorRadius = 1.2;
  const speed = 0.25;
  const phase = (index / total) * Math.PI * 2;

  useFrame(({ clock }) => {
    if (particleRef.current && groupRef.current && trailTargetRef.current) {
      const time = clock.elapsedTime * speed;
      let u = (time + phase) % (Math.PI * 4);
      
      // Create looping motion: outward expansion, then backward return
      let progress = u / (Math.PI * 4);
      
      // First half: outward flow (expansion)
      // Second half: backward flow (return)
      if (progress > 0.5) {
        // Backward flow - reverse direction
        u = Math.PI * 2 - (u - Math.PI * 2);
        progress = 1 - progress;
      }
      
      // Torus parametric equations
      const x = (majorRadius + minorRadius * Math.cos(u * 2)) * Math.cos(u);
      const y = (majorRadius + minorRadius * Math.cos(u * 2)) * Math.sin(u);
      const z = minorRadius * Math.sin(u * 2);

      particleRef.current.position.set(x, y, z);
      trailTargetRef.current.position.set(x, y, z);
      
      // Scale and opacity based on position (slower near light-speed boundary)
      const distance = Math.sqrt(x * x + y * y);
      const boundary = majorRadius + minorRadius;
      const boundaryFactor = Math.min(1, distance / boundary);
      const scale = Math.max(0.4, 1 - boundaryFactor * 0.6);
      const opacity = Math.max(0.5, 1 - boundaryFactor * 0.5);
      
      particleRef.current.scale.setScalar(scale);
      if (particleRef.current.material instanceof THREE.Material) {
        (particleRef.current.material as THREE.MeshBasicMaterial).opacity = opacity;
      }
    }
  });

  return (
    <group ref={groupRef}>
      <Trail
        width={0.25}
        length={2.5}
        color={new THREE.Color("#3b82f6")}
        attenuation={(t) => t * t * t}
      >
        <mesh ref={trailTargetRef}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color="#60a5fa" transparent opacity={0} />
        </mesh>
      </Trail>
      <mesh ref={particleRef}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshBasicMaterial
          color="#60a5fa"
          transparent
          opacity={0.9}
        />
      </mesh>
    </group>
  );
}

// Torus structure with flowing particles
function ToroidalField() {
  const torusRef = useRef<THREE.Mesh>(null);
  const particleCount = 80;

  useFrame(({ clock }) => {
    if (torusRef.current) {
      // Slow rotation of the torus
      torusRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.1) * 0.2;
      torusRef.current.rotation.y = clock.elapsedTime * 0.15;
    }
  });

  const particles = useMemo(
    () =>
      Array.from({ length: particleCount }, (_, i) => (
        <Particle key={i} index={i} total={particleCount} />
      )),
    [particleCount]
  );

  return (
    <group>
      {/* Semi-transparent torus mesh with glow */}
      <mesh ref={torusRef}>
        <torusGeometry args={[3, 1.2, 32, 100]} />
        <MeshDistortMaterial
          color="#3b82f6"
          transparent
          opacity={0.2}
          distort={0.3}
          speed={0.8}
          roughness={0.1}
        />
      </mesh>
      {/* Outer glow ring */}
      <mesh ref={torusRef}>
        <torusGeometry args={[3, 1.3, 32, 100]} />
        <meshBasicMaterial
          color="#60a5fa"
          transparent
          opacity={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Particles flowing along torus */}
      {particles}
    </group>
  );
}

// Camera controller with slow orbit
function CameraController() {
  useFrame(({ camera, clock }) => {
    // Slow meditative camera drift
    const radius = 12;
    const angle = clock.elapsedTime * 0.05;
    camera.position.x = Math.cos(angle) * radius;
    camera.position.z = Math.sin(angle) * radius;
    camera.position.y = Math.sin(clock.elapsedTime * 0.03) * 2;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// Main scene component
function ToroidalScene() {
  return (
    <>
      {/* Volumetric lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 0, 0]} intensity={3} color="#a7c7ff" distance={10} decay={2} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#60a5fa" distance={8} decay={2} />
      <pointLight position={[-5, -5, -5]} intensity={0.8} color="#9333ea" distance={8} decay={2} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#ffffff" />

      {/* Core components */}
      <InformationalPlane />
      <ToroidalField />

      {/* Camera controller */}
      <CameraController />
    </>
  );
}

export function ToroidalLightEngine({ className = "" }: ToroidalLightEngineProps) {
  return (
    <div className={cn("relative w-full h-full", className)}>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 50 }}
        gl={{ antialias: true, alpha: true, premultipliedAlpha: false }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["transparent"]} />
        <ToroidalScene />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}

