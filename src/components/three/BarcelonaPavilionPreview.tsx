"use client";

import { Suspense, useLayoutEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Box3, Group, Vector3 } from "three";

function PavilionModel() {
  const { scene } = useGLTF("/models/barcelona_pavilion_3d_demo/scene.gltf");
  const modelRootRef = useRef<Group>(null);

  useLayoutEffect(() => {
    if (!modelRootRef.current) {
      return;
    }

    const bounds = new Box3().setFromObject(scene);
    const center = bounds.getCenter(new Vector3());
    const size = bounds.getSize(new Vector3());
    const longestSide = Math.max(size.x, size.y, size.z);
    const targetSize = 8;
    const normalizedScale = longestSide > 0 ? targetSize / longestSide : 1;

    modelRootRef.current.position.set(-center.x * normalizedScale, -bounds.min.y * normalizedScale, -center.z * normalizedScale);
    modelRootRef.current.scale.setScalar(normalizedScale);
  }, [scene]);

  return (
    <group ref={modelRootRef}>
      <primitive object={scene} />
    </group>
  );
}

function LoadingFallback() {
  return (
    <mesh position={[0, 0.85, 0]}>
      <boxGeometry args={[1.4, 0.35, 1.4]} />
      <meshStandardMaterial color="#9ca3af" wireframe />
    </mesh>
  );
}

useGLTF.preload("/models/barcelona_pavilion_3d_demo/scene.gltf");

export function BarcelonaPavilionPreview() {
  return (
    <div className="relative h-[72vh] min-h-[540px] w-full overflow-hidden rounded-2xl border border-black/10 bg-[#f6f6f3] shadow-[0_20px_70px_rgba(0,0,0,0.16)]">
      <Canvas camera={{ position: [8.2, 5.2, 8], fov: 38 }} dpr={[1, 2]}>
        <color attach="background" args={["#f6f6f3"]} />
        <hemisphereLight intensity={0.66} color="#f9fafb" groundColor="#d1d5db" />
        <directionalLight position={[7, 10, 5]} intensity={1} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
        <directionalLight position={[-6, 4, -5]} intensity={0.35} />

        <Suspense fallback={<LoadingFallback />}>
          <PavilionModel />
        </Suspense>

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
          <circleGeometry args={[10, 64]} />
          <meshStandardMaterial color="#e7e5e4" roughness={0.96} metalness={0} />
        </mesh>

        <OrbitControls
          enablePan={false}
          minDistance={4.5}
          maxDistance={16}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2.1}
          target={[0, 1.35, 0]}
        />
      </Canvas>

      <div className="pointer-events-none absolute left-0 top-0 m-4 rounded-full bg-black/70 px-3 py-1 text-xs font-medium tracking-wide text-white/90">
        Demo glTF • Civil Premium
      </div>
    </div>
  );
}
