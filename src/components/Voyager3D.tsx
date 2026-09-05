/**
 * Voyager3D — interactive 3D model of NASA's Voyager spacecraft.
 *
 * Built procedurally with Three.js primitives (via @react-three/fiber and
 * @react-three/drei) to represent the iconic Voyager design: the 3.7 m
 * high-gain dish antenna, the decagonal central bus, the magnetometer
 * boom, the RTG power source, the science instrument boom, and the
 * Golden Record plaque. Includes OrbitControls for free rotation.
 */

import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Sparkles } from '@react-three/drei';
import type { Group } from 'three';
import type { ReactNode } from 'react';

/** Slow, gentle rotation of the whole spacecraft. */
function Spin({ children }: { children: ReactNode }) {
  const ref = useRef<Group>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.15;
    }
  });
  return <group ref={ref}>{children}</group>;
}

/** The 3.7 m high-gain parabolic dish antenna. */
function DishAntenna() {
  return (
    <group position={[0, 0, 1.6]}>
      {/* Dish bowl */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <sphereGeometry args={[1.85, 48, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.85} roughness={0.25} />
      </mesh>
      {/* Inner feed */}
      <mesh position={[0, 0, 0.35]}>
        <cylinderGeometry args={[0.12, 0.12, 0.7, 16]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.3} />
      </mesh>
      {/* Feed support struts */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i / 4) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 0.9, Math.sin(angle) * 0.9, 0.2]}
            rotation={[0, 0, -angle]}
          >
            <cylinderGeometry args={[0.03, 0.03, 1.3, 6]} />
            <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.4} />
          </mesh>
        );
      })}
    </group>
  );
}

/** The decagonal central bus (spacecraft body). */
function CentralBus() {
  return (
    <group>
      {/* Main decagonal body */}
      <mesh>
        <cylinderGeometry args={[0.85, 0.85, 1.1, 10]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.6} roughness={0.35} />
      </mesh>
      {/* Top cap */}
      <mesh position={[0, 0.56, 0]}>
        <cylinderGeometry args={[0.85, 0.85, 0.08, 10]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Bottom cap */}
      <mesh position={[0, -0.56, 0]}>
        <cylinderGeometry args={[0.85, 0.85, 0.08, 10]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Golden Record plaque on the side */}
      <mesh position={[0.88, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[0.06, 0.28, 0.28]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
}

/** The magnetometer boom (long thin mast). */
function MagnetometerBoom() {
  return (
    <group position={[0, 0, -2.4]}>
      {/* Long boom */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 4.8, 8]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.4} />
      </mesh>
      {/* Magnetometer sensor at the tip */}
      <mesh position={[0, 0, -2.4]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.6} />
      </mesh>
    </group>
  );
}

/** The RTG (radioisotope thermoelectric generator) power source. */
function RTG() {
  return (
    <group position={[0, -0.9, 0]}>
      {/* RTG cylinder */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 1.4, 16]} />
        <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.5} />
      </mesh>
      {/* Fins */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i / 6) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 0.3, 0, Math.sin(angle) * 0.3]}
            rotation={[0, -angle, 0]}
          >
            <boxGeometry args={[0.06, 1.4, 0.18]} />
            <meshStandardMaterial color="#64748b" metalness={0.6} roughness={0.5} />
          </mesh>
        );
      })}
    </group>
  );
}

/** The science instrument boom. */
function ScienceBoom() {
  return (
    <group position={[0, 0.9, 0]}>
      {/* Boom arm */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 1.6, 8]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.4} />
      </mesh>
      {/* Instrument cluster */}
      <mesh position={[0, 0, 0.9]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.2, 0, 0.85]}>
        <boxGeometry args={[0.12, 0.12, 0.12]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  );
}

/** The complete Voyager spacecraft assembly. */
function VoyagerModel() {
  return (
    <Spin>
      <group rotation={[0.2, 0, 0]}>
        <CentralBus />
        <DishAntenna />
        <MagnetometerBoom />
        <RTG />
        <ScienceBoom />
      </group>
    </Spin>
  );
}

/** Interactive 3D scene with controls and starfield backdrop. */
export default function Voyager3D() {
  return (
    <Canvas
      camera={{ position: [6, 3, 6], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      className="h-full w-full"
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} />
      <pointLight position={[-5, -3, -5]} intensity={0.4} color="#22d3ee" />
      <pointLight position={[0, 0, 0]} intensity={0.3} color="#fbbf24" />

      <Suspense fallback={null}>
        <Stars radius={80} depth={40} count={3000} factor={3} saturation={0} fade speed={1} />
        <Sparkles count={60} scale={8} size={2} speed={0.4} color="#22d3ee" />
        <VoyagerModel />
      </Suspense>

      <OrbitControls
        enablePan={false}
        minDistance={3}
        maxDistance={14}
        autoRotate
        autoRotateSpeed={0.8}
      />
    </Canvas>
  );
}
