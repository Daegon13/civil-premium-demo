"use client";

import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Box3, Group, MathUtils, Object3D, Vector3 } from "three";

const MODEL_PATH = "/models/barcelona_pavilion_3d_demo/scene.gltf";
const DEBUG_CONTROLS = process.env.NEXT_PUBLIC_DEBUG_HERO_CONTROLS === "1";

const BASE_CAMERA = new Vector3(14, 6.2, 11.2);
const BASE_TARGET = new Vector3(1.5, 1.2, 0);
const IDLE_SECONDS = 14;

function HeroSceneModel({ isMobile }: { isMobile: boolean }) {
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
    const normalizedScale = longestSide > 0 ? 11 / longestSide : 1;
    const artScale = isMobile ? 1.1 : 1.24;

    modelRootRef.current.scale.setScalar(normalizedScale * artScale);
    modelRootRef.current.position.set(
      -center.x * normalizedScale * artScale + (isMobile ? 2.5 : 4.1),
      -bounds.min.y * normalizedScale * artScale - (isMobile ? 0.6 : 0.9),
      -center.z * normalizedScale * artScale - (isMobile ? 0.1 : 0.55),
    );
    modelRootRef.current.rotation.set(0, isMobile ? -0.22 : -0.34, 0);
  }, [isMobile, sceneClone]);

  return (
    <group ref={modelRootRef}>
      <primitive object={sceneClone} />
    </group>
  );
}

function CameraRig({ pointer, isMobile }: { pointer: { x: number; y: number }; isMobile: boolean }) {
  const smoothPointer = useRef({ x: 0, y: 0 });
  const smoothLookOffset = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const { clock, camera } = state;
    const loop = (clock.getElapsedTime() / IDLE_SECONDS) * Math.PI * 2;

    smoothPointer.current.x = MathUtils.damp(smoothPointer.current.x, pointer.x, 4.3, delta);
    smoothPointer.current.y = MathUtils.damp(smoothPointer.current.y, pointer.y, 4.3, delta);

    const parallaxAmp = isMobile ? 0.12 : 0.3;
    const lookAmp = isMobile ? 0.05 : 0.16;

    const idleX = Math.sin(loop) * 0.42;
    const idleY = Math.sin(loop * 0.5) * 0.2;
    const idleZ = Math.cos(loop) * 0.34;

    const nextX = BASE_CAMERA.x + idleX + smoothPointer.current.x * parallaxAmp;
    const nextY = BASE_CAMERA.y + idleY + smoothPointer.current.y * (parallaxAmp * 0.52);
    const nextZ = BASE_CAMERA.z + idleZ - smoothPointer.current.x * (parallaxAmp * 0.24);

    camera.position.x = MathUtils.damp(camera.position.x, nextX, 2.1, delta);
    camera.position.y = MathUtils.damp(camera.position.y, nextY, 2.1, delta);
    camera.position.z = MathUtils.damp(camera.position.z, nextZ, 2.1, delta);

    smoothLookOffset.current.x = MathUtils.damp(smoothLookOffset.current.x, smoothPointer.current.x * lookAmp, 3, delta);
    smoothLookOffset.current.y = MathUtils.damp(smoothLookOffset.current.y, smoothPointer.current.y * lookAmp * 0.5, 3, delta);

    camera.lookAt(
      BASE_TARGET.x + smoothLookOffset.current.x,
      BASE_TARGET.y + smoothLookOffset.current.y,
      BASE_TARGET.z,
    );
  });

  return null;
}

function LoadingFallback() {
  return (
    <mesh position={[2, 1.3, 0]}>
      <boxGeometry args={[2.3, 0.35, 2]} />
      <meshStandardMaterial color="#64748b" roughness={0.55} metalness={0.05} />
    </mesh>
  );
}

useGLTF.preload(MODEL_PATH);

export function CivilPremiumHeroModel() {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 900px)");
    const sync = () => setIsMobile(mediaQuery.matches);

    sync();
    mediaQuery.addEventListener("change", sync);
    return () => mediaQuery.removeEventListener("change", sync);
  }, []);

  return (
    <div
      className="group relative min-h-[25rem] overflow-hidden rounded-[var(--radius-lg)] border border-[color-mix(in_srgb,var(--color-border)_75%,var(--color-accent)_25%)] bg-[radial-gradient(130%_90%_at_82%_12%,rgba(120,157,188,0.26)_0%,rgba(24,29,36,0.88)_52%,#090d13_100%)] shadow-[0_34px_90px_rgba(2,8,18,0.46)] sm:min-h-[27rem] lg:min-h-[31rem]"
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const nx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
        const ny = ((event.clientY - rect.top) / rect.height - 0.5) * -2;
        setPointer({ x: nx, y: ny });
      }}
      onPointerLeave={() => setPointer({ x: 0, y: 0 })}
    >
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(5,7,11,0.82)_0%,rgba(8,13,20,0.35)_42%,rgba(6,9,14,0.92)_100%)]" />

      <Canvas
        camera={{ position: [BASE_CAMERA.x, BASE_CAMERA.y, BASE_CAMERA.z], fov: 32, near: 0.1, far: 120 }}
        dpr={isMobile ? [1, 1.2] : [1, 1.55]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.45} color="#d8e3f0" />
        <hemisphereLight intensity={0.55} color="#f7fbff" groundColor="#0d1218" />
        <directionalLight position={[11, 10, 7]} intensity={1.18} color="#fff3dc" />
        <directionalLight position={[-8, 5, -4]} intensity={0.4} color="#b9d4ff" />

        <Suspense fallback={<LoadingFallback />}>
          <HeroSceneModel isMobile={isMobile} />
        </Suspense>

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[3.7, -0.03, -0.6]}>
          <circleGeometry args={[8.4, 56]} />
          <meshStandardMaterial color="#0d1218" transparent opacity={0.28} roughness={1} metalness={0} />
        </mesh>

        <CameraRig pointer={pointer} isMobile={isMobile} />

        {DEBUG_CONTROLS ? (
          <OrbitControls enablePan={false} minDistance={8} maxDistance={20} target={[BASE_TARGET.x, BASE_TARGET.y, BASE_TARGET.z]} />
        ) : null}
      </Canvas>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-[42%] bg-gradient-to-r from-[#090d13] via-[#090d13]/68 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/45 to-transparent" />
      <div className="pointer-events-none absolute right-3 top-3 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-white/70">
        3D Hero Demo
      </div>
    </div>
  );
}
