"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Trail, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { cn } from "@/lib/utils";

interface IlluminatedGeometryProps {
  className?: string;
}

// Light particle that reveals the geometry
function LightReveal({ index, total }: { index: number; total: number }) {
  const lightRef = useRef<THREE.Mesh>(null);
  const trailTargetRef = useRef<THREE.Mesh>(null);

  const radius = 2.8;
  const speed = 0.15;
  const phase = (index / total) * Math.PI * 2;
  const delay = index * 0.1;

  const lightPositionRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (lightRef.current && trailTargetRef.current && lightPositionRef.current) {
      const time = Math.max(0, clock.elapsedTime - delay);
      const angle = (time * speed + phase) % (Math.PI * 2);
      
      // Circular path revealing the structure
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle) * 0.6;
      const z = radius * Math.sin(angle) * 0.4;

      lightRef.current.position.set(x, y, z);
      trailTargetRef.current.position.set(x, y, z);
      lightPositionRef.current.position.set(x, y, z);
      
      // Intensity based on reveal progress
      const intensity = Math.min(1, time * 2);
      const scale = 0.3 + intensity * 0.4;
      lightRef.current.scale.setScalar(scale);
      
      if (lightRef.current.material instanceof THREE.Material) {
        (lightRef.current.material as THREE.MeshBasicMaterial).opacity = intensity * 0.9;
      }
    }
  });

  return (
    <group>
      <Trail
        width={0.2}
        length={3}
        color={new THREE.Color("#ffffff")}
        attenuation={(t) => t * t}
      >
        <mesh ref={trailTargetRef}>
          <sphereGeometry args={[0.01, 8, 8]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0} />
        </mesh>
      </Trail>
      <group ref={lightPositionRef}>
        <pointLight
          intensity={1.5}
          color="#ffffff"
          distance={2.5}
          decay={2}
        />
      </group>
      <mesh ref={lightRef}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.9}
        />
      </mesh>
    </group>
  );
}

// The geometric structure that exists - revealed by light
function GeometricStructure() {
  const structureRef = useRef<THREE.Group>(null);
  const innerCoreRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const latticeRef = useRef<THREE.Group>(null);
  const lightCount = 40;

  useFrame(({ clock }) => {
    if (structureRef.current) {
      // Slow rotation - structure was always there
      structureRef.current.rotation.y = clock.elapsedTime * 0.08;
      structureRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.04) * 0.1;
    }
    
    // Gradually reveal opacity based on time
    const revealProgress = Math.min(1, clock.elapsedTime * 0.3);
    
    if (innerCoreRef.current?.material instanceof THREE.Material) {
      (innerCoreRef.current.material as THREE.MeshBasicMaterial).opacity = 
        0.2 + revealProgress * 0.4;
    }
    if (torusRef.current?.material) {
      const material = torusRef.current.material as any;
      if (material.opacity !== undefined) {
        material.opacity = 0.1 + revealProgress * 0.3;
      }
    }
  });

  const lightReveals = useMemo(
    () =>
      Array.from({ length: lightCount }, (_, i) => (
        <LightReveal key={i} index={i} total={lightCount} />
      )),
    [lightCount]
  );

  return (
    <group ref={structureRef}>
      {/* Inner core - the fundamental geometry */}
      <mesh ref={innerCoreRef}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.2}
          wireframe={false}
        />
      </mesh>

      {/* Glowing edges of the core */}
      <mesh ref={innerCoreRef}>
        <icosahedronGeometry args={[1.52, 1]} />
        <meshBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.6}
          wireframe={true}
        />
      </mesh>

      {/* Toroidal field structure */}
      <mesh ref={torusRef}>
        <torusGeometry args={[2.5, 0.7, 32, 100]} />
        <MeshDistortMaterial
          color="#14b8a6"
          transparent
          opacity={0.1}
          distort={0.2}
          speed={0.3}
          roughness={0}
        />
      </mesh>

      {/* Additional torus layer */}
      <mesh>
        <torusGeometry args={[2.3, 0.5, 32, 100]} />
        <meshBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.2}
          wireframe={true}
        />
      </mesh>

      {/* Geometric lattice nodes */}
      <group ref={latticeRef}>
        {Array.from({ length: 30 }, (_, i) => {
          const angle = (i / 30) * Math.PI * 2;
          const radius = 2 + (i % 3) * 0.3;
          return (
            <mesh
              key={i}
              position={[
                Math.cos(angle) * radius,
                Math.sin(angle * 2) * 0.5,
                Math.sin(angle) * radius,
              ]}
            >
              <sphereGeometry args={[0.03, 8, 8]} />
              <meshBasicMaterial
                color="#ffffff"
                transparent
                opacity={0.4}
              />
            </mesh>
          );
        })}
      </group>

      {/* Light reveals the structure */}
      {lightReveals}
    </group>
  );
}

// Ambient illumination that gradually increases
function AmbientIllumination() {
  const ambientRef = useRef<THREE.AmbientLight>(null);

  useFrame(({ clock }) => {
    if (ambientRef.current) {
      // Gradually increase ambient light - "turning the lights on"
      const intensity = Math.min(0.6, 0.1 + clock.elapsedTime * 0.1);
      ambientRef.current.intensity = intensity;
    }
  });

  return <ambientLight ref={ambientRef} intensity={0.1} color="#ffffff" />;
}

// Main illuminating light source
function MainIllumination() {
  const mainLightRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    if (mainLightRef.current) {
      // Main light gradually intensifies
      const intensity = Math.min(4, 0.5 + clock.elapsedTime * 0.5);
      mainLightRef.current.intensity = intensity;
    }
  });

  return (
    <pointLight
      ref={mainLightRef}
      position={[0, 0, 0]}
      intensity={0.5}
      color="#ffffff"
      distance={12}
      decay={2}
    />
  );
}

// Camera with subtle movement
function CameraController() {
  useFrame(({ camera, clock }) => {
    // Gentle camera movement
    const radius = 9;
    const angle = clock.elapsedTime * 0.02;
    camera.position.x = Math.cos(angle) * radius;
    camera.position.z = Math.sin(angle) * radius;
    camera.position.y = Math.sin(clock.elapsedTime * 0.015) * 0.8;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// Main scene
function IlluminatedScene() {
  return (
    <>
      {/* Lighting system */}
      <AmbientIllumination />
      <MainIllumination />
      <pointLight
        position={[4, 4, 4]}
        intensity={1.5}
        color="#06b6d4"
        distance={10}
        decay={2}
      />
      <pointLight
        position={[-4, -4, -4]}
        intensity={1}
        color="#14b8a6"
        distance={10}
        decay={2}
      />
      <directionalLight position={[5, 5, 5]} intensity={0.4} color="#ffffff" />

      {/* The geometric structure being revealed */}
      <GeometricStructure />
      <CameraController />
    </>
  );
}

export function IlluminatedGeometryHero({
  className = "",
}: IlluminatedGeometryProps) {
  return (
    <div className={cn("relative w-full h-full", className)}>
      <Canvas
        camera={{ position: [0, 0, 9], fov: 50 }}
        gl={{ antialias: true, alpha: true, premultipliedAlpha: false }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["transparent"]} />
        <IlluminatedScene />
      </Canvas>
    </div>
  );
}

