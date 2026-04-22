"use client";

import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Box3, Group, MathUtils, Object3D, Vector3 } from "three";

const MODEL_PATH = "/models/barcelona_pavilion_3d_demo/scene.gltf";
const DEBUG_CONTROLS = false;
const IDLE_SECONDS = 11;

type Breakpoint = "desktop" | "tablet" | "mobile";

const ART_DIRECTION = {
  desktop: {
    cameraPosition: [8.4, 3.8, 5.6] as const,
    cameraTarget: [1.4, 0.9, -0.1] as const,
    modelScale: 1.85,
    modelPosition: [1.4, -0.52, -0.35] as const,
    modelRotationY: -0.28,
    parallax: {
      cameraX: 0.45,
      cameraY: 0.22,
      targetX: 0.18,
      targetY: 0.1,
    },
  },
  tablet: {
    cameraPosition: [8.2, 4.0, 5.75] as const,
    cameraTarget: [1.35, 0.92, -0.1] as const,
    modelScale: 1.76,
    modelPosition: [1.28, -0.52, -0.33] as const,
    modelRotationY: -0.28,
    parallax: {
      cameraX: 0.36,
      cameraY: 0.18,
      targetX: 0.15,
      targetY: 0.09,
    },
  },
  mobile: {
    cameraPosition: [8.15, 4.05, 5.95] as const,
    cameraTarget: [1.28, 0.95, -0.06] as const,
    modelScale: 1.62,
    modelPosition: [1.12, -0.5, -0.25] as const,
    modelRotationY: -0.24,
    parallax: {
      cameraX: 0.26,
      cameraY: 0.12,
      targetX: 0.12,
      targetY: 0.07,
    },
  },
} as const;

function HeroSceneModel({ breakpoint }: { breakpoint: Breakpoint }) {
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
    const artDirection = ART_DIRECTION[breakpoint];
    const artScale = artDirection.modelScale;
    const [offsetX, offsetY, offsetZ] = artDirection.modelPosition;

    modelRootRef.current.scale.setScalar(normalizedScale * artScale);
    modelRootRef.current.position.set(
      -center.x * normalizedScale * artScale + offsetX,
      -bounds.min.y * normalizedScale * artScale + offsetY,
      -center.z * normalizedScale * artScale + offsetZ,
    );
    modelRootRef.current.rotation.set(0, artDirection.modelRotationY, 0);
  }, [breakpoint, sceneClone]);

  return (
    <group ref={modelRootRef}>
      <primitive object={sceneClone} />
    </group>
  );
}

function CameraRig({ pointer, breakpoint }: { pointer: { x: number; y: number }; breakpoint: Breakpoint }) {
  const smoothPointer = useRef({ x: 0, y: 0 });
  const smoothTargetOffset = useRef({ x: 0, y: 0 });
  const basePosition = useMemo(
    () => new Vector3(...ART_DIRECTION[breakpoint].cameraPosition),
    [breakpoint],
  );
  const baseTarget = useMemo(() => new Vector3(...ART_DIRECTION[breakpoint].cameraTarget), [breakpoint]);
  const parallax = ART_DIRECTION[breakpoint].parallax;

  useFrame((state, delta) => {
    const { clock, camera } = state;
    const loop = (clock.getElapsedTime() / IDLE_SECONDS) * Math.PI * 2;

    smoothPointer.current.x = MathUtils.damp(smoothPointer.current.x, pointer.x, 3.2, delta);
    smoothPointer.current.y = MathUtils.damp(smoothPointer.current.y, pointer.y, 3.2, delta);

    const idleX = Math.sin(loop * 1.03) * 0.85;
    const idleY = Math.sin(loop * 0.67) * 0.28;
    const idleZ = Math.cos(loop * 0.87) * 0.55;

    const targetIdleX = Math.sin(loop * 0.81) * 0.35;
    const targetIdleY = Math.cos(loop * 0.59) * 0.14;
    const targetIdleZ = Math.sin(loop * 0.73) * 0.22;

    const nextX = basePosition.x + idleX + smoothPointer.current.x * parallax.cameraX;
    const nextY = basePosition.y + idleY + smoothPointer.current.y * parallax.cameraY;
    const nextZ = basePosition.z + idleZ;

    camera.position.x = MathUtils.damp(camera.position.x, nextX, 3.4, delta);
    camera.position.y = MathUtils.damp(camera.position.y, nextY, 3.4, delta);
    camera.position.z = MathUtils.damp(camera.position.z, nextZ, 3.4, delta);

    smoothTargetOffset.current.x = MathUtils.damp(
      smoothTargetOffset.current.x,
      smoothPointer.current.x * parallax.targetX,
      4.4,
      delta,
    );
    smoothTargetOffset.current.y = MathUtils.damp(
      smoothTargetOffset.current.y,
      smoothPointer.current.y * parallax.targetY,
      4.4,
      delta,
    );

    camera.lookAt(
      baseTarget.x + targetIdleX + smoothTargetOffset.current.x,
      baseTarget.y + targetIdleY + smoothTargetOffset.current.y,
      baseTarget.z + targetIdleZ,
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
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("desktop");

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const tabletQuery = window.matchMedia("(min-width: 768px) and (max-width: 1199px)");

    const sync = () => {
      if (mobileQuery.matches) {
        setBreakpoint("mobile");
        return;
      }

      if (tabletQuery.matches) {
        setBreakpoint("tablet");
        return;
      }

      setBreakpoint("desktop");
    };

    sync();
    mobileQuery.addEventListener("change", sync);
    tabletQuery.addEventListener("change", sync);
    return () => {
      mobileQuery.removeEventListener("change", sync);
      tabletQuery.removeEventListener("change", sync);
    };
  }, []);

  const baseCamera = ART_DIRECTION[breakpoint].cameraPosition;
  const baseTarget = ART_DIRECTION[breakpoint].cameraTarget;

  return (
    <div
      className="group relative min-h-[25rem] overflow-hidden rounded-[var(--radius-lg)] border border-[color-mix(in_srgb,var(--color-border)_75%,var(--color-accent)_25%)] bg-[radial-gradient(circle_at_72%_38%,rgba(72,84,99,0.22)_0%,rgba(20,24,30,0)_34%),linear-gradient(135deg,#0f141b_0%,#161d26_50%,#0d1117_100%)] shadow-[0_34px_90px_rgba(2,8,18,0.46)] sm:min-h-[27rem] lg:min-h-[31rem]"
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const nx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
        const ny = ((event.clientY - rect.top) / rect.height - 0.5) * -2;
        setPointer({ x: nx, y: ny });
      }}
      onPointerLeave={() => setPointer({ x: 0, y: 0 })}
    >
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(5,7,11,0.8)_0%,rgba(8,13,20,0.28)_42%,rgba(6,9,14,0.9)_100%)]" />

      <Canvas
        camera={{ position: baseCamera, fov: 30, near: 0.1, far: 100 }}
        dpr={breakpoint === "mobile" ? [1, 1.25] : [1, 1.6]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.42} />
        <hemisphereLight intensity={0.72} color="#dbe7f0" groundColor="#1a1d22" />
        <directionalLight position={[8, 12, 6]} intensity={1.65} color="#fff4df" />
        <directionalLight position={[-6, 4, 8]} intensity={0.45} color="#bdd2e7" />

        <Suspense fallback={<LoadingFallback />}>
          <HeroSceneModel breakpoint={breakpoint} />
        </Suspense>

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.15, 0]} scale={[40, 40, 1]}>
          <planeGeometry args={[1, 1]} />
          <meshStandardMaterial color="#1c2128" transparent opacity={0.18} roughness={1} metalness={0} />
        </mesh>

        {DEBUG_CONTROLS ? (
          <OrbitControls
            makeDefault
            enablePan={false}
            enableDamping
            dampingFactor={0.08}
            minDistance={5.5}
            maxDistance={16}
            target={baseTarget}
          />
        ) : (
          <CameraRig pointer={pointer} breakpoint={breakpoint} />
        )}
      </Canvas>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-[42%] bg-gradient-to-r from-[#090d13] via-[#090d13]/68 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/45 to-transparent" />
      <div className="pointer-events-none absolute right-3 top-3 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-white/70">
        3D Hero Demo
      </div>
    </div>
  );
}
