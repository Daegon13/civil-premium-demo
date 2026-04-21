"use client";

import { Suspense, useLayoutEffect, useMemo, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Box3, Group, Object3D, Vector3 } from "three";

const MODEL_PATH = "/models/barcelona_pavilion_3d_demo/scene.gltf";

function PavilionModel() {
  const { scene } = useGLTF(MODEL_PATH);
  const sceneClone = useMemo<Object3D>(() => scene.clone(), [scene]);
  const modelRootRef = useRef<Group>(null);

  useLayoutEffect(() => {
    if (!modelRootRef.current) {
      return;
    }

    const bounds = new Box3().setFromObject(sceneClone);
    const center = bounds.getCenter(new Vector3());
    const size = bounds.getSize(new Vector3());
    const longestSide = Math.max(size.x, size.y, size.z);
    const targetSize = 9;
    const normalizedScale = longestSide > 0 ? targetSize / longestSide : 1;

    modelRootRef.current.position.set(-center.x * normalizedScale, -bounds.min.y * normalizedScale, -center.z * normalizedScale);
    modelRootRef.current.scale.setScalar(normalizedScale);
    modelRootRef.current.rotation.set(0, 0, 0);
  }, [sceneClone]);

  return (
    <group ref={modelRootRef}>
      <primitive object={sceneClone} />
    </group>
  );
}

function LoadingFallback() {
  return (
    <mesh position={[0, 0.9, 0]}>
      <boxGeometry args={[1.6, 0.3, 1.6]} />
      <meshStandardMaterial color="#a8a29e" wireframe />
    </mesh>
  );
}

useGLTF.preload(MODEL_PATH);

export function BarcelonaPavilionPreview() {
  return (
    <div className="relative h-[72vh] min-h-[540px] w-full overflow-hidden rounded-2xl border border-black/10 bg-[#f5f5f4] shadow-[0_20px_70px_rgba(0,0,0,0.16)]">
      <Canvas camera={{ position: [9, 5.6, 8.5], fov: 36 }} dpr={[1, 2]}>
        <color attach="background" args={["#f5f5f4"]} />
        <hemisphereLight intensity={0.65} color="#ffffff" groundColor="#d6d3d1" />
        <directionalLight position={[8, 11, 6]} intensity={1.1} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
        <directionalLight position={[-6, 4, -5]} intensity={0.35} />

        <Suspense fallback={<LoadingFallback />}>
          <PavilionModel />
        </Suspense>

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
          <circleGeometry args={[11, 64]} />
          <meshStandardMaterial color="#e7e5e4" roughness={0.96} metalness={0} />
        </mesh>

        <OrbitControls
          enablePan={false}
          minDistance={4.8}
          maxDistance={17}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2.05}
          target={[0, 1.35, 0]}
        />
      </Canvas>

      <div className="pointer-events-none absolute left-0 top-0 m-4 rounded-full bg-black/70 px-3 py-1 text-xs font-medium tracking-wide text-white/90">
        Demo glTF • Civil Premium
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/25 to-transparent px-5 py-4 text-xs tracking-wide text-white/80">
        Cargando desde /models/barcelona_pavilion_3d_demo/scene.gltf
      </div>
    </div>
  );
}
