"use client";

import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Box3, Group, MathUtils, Object3D, PerspectiveCamera, Sphere, Vector3 } from "three";
import { getAutoCameraFit } from "./lib/cameraFit";

const MODEL_PATH = "/models/arch-hero-generator_v003.glb";
const DEBUG_CONTROLS = process.env.NEXT_PUBLIC_HERO_DEBUG_CONTROLS === "true";
const USE_CAMERA_RIG = process.env.NEXT_PUBLIC_HERO_USE_CAMERA_RIG === "true";
const CAMERA_RIG_DEBUG = false;
// Diagnóstico temporal: cámara fija para verificar clipping/cortes.
// Si con este modo desaparece el corte, la causa está en offsets/animación del rig.
const FORCE_FIXED_CAMERA_FOR_DEBUG = false;
const IDLE_SECONDS = 11;

const FIXED_CAMERA_DEBUG = {
  position: [9.2, 4.4, 7.1] as const,
  target: [1.3, 0.9, -0.1] as const,
  near: 0.25,
  fov: 30,
  far: 140,
};

type Breakpoint = "desktop" | "tablet" | "mobile";

const ART_DIRECTION = {
  desktop: {
    cameraOffset: [0.36, 0.16, 0.28] as const,
    targetOffset: [0.03, 0.08, 0.18] as const,
    modelScale: 1.74,
    modelPosition: [1.24, -0.5, -0.2] as const,
    modelFit: {
      fitPadding: 1.12,
      verticalAnchor: 0.16,
      compositionOffset: [0.14, 0.04, 0.04] as const,
      desiredVisibleHeight: 7.05,
      targetRadius: 4.35,
    },
    modelRotationY: -0.22,
    cameraRig: {
      microDrift: {
        cameraAmplitude: { x: 0.09, y: 0.038, z: 0.07 },
        cameraFrequency: { x: 0.44, y: 0.3, z: 0.36 },
        targetAmplitude: { x: 0.048, y: 0.02, z: 0.03 },
        targetFrequency: { x: 0.32, y: 0.26, z: 0.28 },
      },
      parallax: {
        cameraX: 0.1,
        cameraY: 0.06,
        targetX: 0.048,
        targetY: 0.03,
      },
      smoothing: {
        pointer: 2.2,
        cameraPosition: 2.4,
        targetOffset: 2.8,
      },
      clamps: {
        cameraX: 0.22,
        cameraY: 0.12,
        cameraZ: 0.12,
        targetX: 0.11,
        targetY: 0.07,
        targetZ: 0.08,
        modelRadiusMultiplier: 1.2,
      },
    },
  },
  tablet: {
    cameraOffset: [0.3, 0.18, 0.22] as const,
    targetOffset: [0.02, 0.08, 0.16] as const,
    modelScale: 1.64,
    modelPosition: [1.16, -0.48, -0.14] as const,
    modelFit: {
      fitPadding: 1.14,
      verticalAnchor: 0.17,
      compositionOffset: [0.12, 0.06, 0.02] as const,
      desiredVisibleHeight: 6.8,
      targetRadius: 4.2,
    },
    modelRotationY: -0.2,
    cameraRig: {
      microDrift: {
        cameraAmplitude: { x: 0.08, y: 0.032, z: 0.06 },
        cameraFrequency: { x: 0.4, y: 0.28, z: 0.34 },
        targetAmplitude: { x: 0.04, y: 0.018, z: 0.028 },
        targetFrequency: { x: 0.3, y: 0.24, z: 0.26 },
      },
      parallax: {
        cameraX: 0.085,
        cameraY: 0.05,
        targetX: 0.04,
        targetY: 0.024,
      },
      smoothing: {
        pointer: 2,
        cameraPosition: 2.2,
        targetOffset: 2.6,
      },
      clamps: {
        cameraX: 0.18,
        cameraY: 0.1,
        cameraZ: 0.1,
        targetX: 0.095,
        targetY: 0.06,
        targetZ: 0.065,
        modelRadiusMultiplier: 1.23,
      },
    },
  },
  mobile: {
    cameraOffset: [0.24, 0.2, 0.18] as const,
    targetOffset: [0.02, 0.08, 0.14] as const,
    modelScale: 1.5,
    modelPosition: [1.04, -0.45, -0.08] as const,
    modelFit: {
      fitPadding: 1.17,
      verticalAnchor: 0.18,
      compositionOffset: [0.09, 0.08, 0.01] as const,
      desiredVisibleHeight: 6.45,
      targetRadius: 4.05,
    },
    modelRotationY: -0.16,
    cameraRig: {
      microDrift: {
        cameraAmplitude: { x: 0.06, y: 0.028, z: 0.05 },
        cameraFrequency: { x: 0.36, y: 0.24, z: 0.3 },
        targetAmplitude: { x: 0.03, y: 0.014, z: 0.022 },
        targetFrequency: { x: 0.28, y: 0.22, z: 0.24 },
      },
      parallax: {
        cameraX: 0.06,
        cameraY: 0.04,
        targetX: 0.03,
        targetY: 0.02,
      },
      smoothing: {
        pointer: 1.8,
        cameraPosition: 2,
        targetOffset: 2.4,
      },
      clamps: {
        cameraX: 0.13,
        cameraY: 0.075,
        cameraZ: 0.085,
        targetX: 0.07,
        targetY: 0.045,
        targetZ: 0.05,
        modelRadiusMultiplier: 1.26,
      },
    },
  },
} as const;

type BoundsSnapshot = {
  center: [number, number, number];
  size: [number, number, number];
};

function getBaseTargetFromBounds(bounds: BoundsSnapshot, breakpoint: Breakpoint): [number, number, number] {
  const targetOffset = ART_DIRECTION[breakpoint].targetOffset;
  return [
    bounds.center[0] + targetOffset[0],
    bounds.center[1] + targetOffset[1],
    bounds.center[2] + targetOffset[2],
  ];
}

function HeroSceneModel({
  breakpoint,
  onBoundsChange,
}: {
  breakpoint: Breakpoint;
  onBoundsChange: (bounds: BoundsSnapshot) => void;
}) {
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
    const sphere = bounds.getBoundingSphere(new Sphere());
    const artDirection = ART_DIRECTION[breakpoint];
    const artScale = artDirection.modelScale;
    const [offsetX, offsetY, offsetZ] = artDirection.modelPosition;
    const { fitPadding, verticalAnchor, compositionOffset, desiredVisibleHeight, targetRadius } = artDirection.modelFit;

    const boxHeightScale = size.y > 0 ? (desiredVisibleHeight * fitPadding) / size.y : 1;
    const sphereScale = sphere.radius > 0 ? (targetRadius * fitPadding) / sphere.radius : boxHeightScale;
    const normalizedScale = size.y > 0 ? boxHeightScale : sphereScale;
    const finalScale = normalizedScale * artScale;

    const [compositionX, compositionY, compositionZ] = compositionOffset;
    const artOffset = new Vector3(offsetX + compositionX, offsetY + compositionY, offsetZ + compositionZ);
    const technicalAutoCenter = new Vector3(
      -center.x * finalScale,
      -bounds.min.y * finalScale,
      -center.z * finalScale,
    );
    const artisticPosition = technicalAutoCenter.clone().add(artOffset);

    modelRootRef.current.scale.setScalar(finalScale);
    modelRootRef.current.position.copy(artisticPosition);
    modelRootRef.current.rotation.set(0, artDirection.modelRotationY, 0);

    const scaledSize = size.multiplyScalar(finalScale);
    const referenceCenter = new Vector3(
      artOffset.x,
      artOffset.y + scaledSize.y * verticalAnchor,
      artOffset.z,
    );

    onBoundsChange({
      center: [referenceCenter.x, referenceCenter.y, referenceCenter.z],
      size: [scaledSize.x, scaledSize.y, scaledSize.z],
    });
  }, [breakpoint, onBoundsChange, sceneClone]);

  return (
    <group ref={modelRootRef}>
      <primitive object={sceneClone} />
    </group>
  );
}

function CameraRig({
  pointer,
  breakpoint,
  bounds,
  fixedMode,
}: {
  pointer: { x: number; y: number };
  breakpoint: Breakpoint;
  bounds: BoundsSnapshot;
  fixedMode?: boolean;
}) {
  const smoothPointer = useRef({ x: 0, y: 0 });
  const smoothTargetOffset = useRef({ x: 0, y: 0 });
  const baseCameraPosition = useRef(new Vector3(0, 0, 0));
  const baseTarget = useRef(new Vector3(0, 0, 0));
  const computedCamera = useRef(new Vector3(0, 0, 0));
  const computedTarget = useRef(new Vector3(0, 0, 0));
  const lastDebugLog = useRef(0);
  const clampAround = (value: number, base: number, maxDelta: number) =>
    MathUtils.clamp(value, base - maxDelta, base + maxDelta);

  useFrame((state, delta) => {
    const { clock, camera } = state;
    const loop = (clock.getElapsedTime() / IDLE_SECONDS) * Math.PI * 2;
    const artDirection = ART_DIRECTION[breakpoint];
    const fit = getAutoCameraFit({
      boundsSize: new Vector3(...bounds.size),
      boundsCenter: new Vector3(...bounds.center),
      fov: (camera as PerspectiveCamera).fov ?? FIXED_CAMERA_DEBUG.fov,
      aspect: state.size.width / Math.max(state.size.height, 1),
      fitPadding: artDirection.modelFit.fitPadding,
    });
    const cameraOffset = new Vector3(...artDirection.cameraOffset);
    const { microDrift, parallax, smoothing, clamps } = artDirection.cameraRig;

    if (fixedMode) {
      baseCameraPosition.current.set(...FIXED_CAMERA_DEBUG.position);
      baseTarget.current.set(...FIXED_CAMERA_DEBUG.target);
    } else {
      baseCameraPosition.current.copy(fit.autoCameraPosition).add(cameraOffset);
      const [baseTargetX, baseTargetY, baseTargetZ] = getBaseTargetFromBounds(bounds, breakpoint);
      baseTarget.current.set(baseTargetX, baseTargetY, baseTargetZ);
    }

    smoothPointer.current.x = MathUtils.damp(smoothPointer.current.x, pointer.x, smoothing.pointer, delta);
    smoothPointer.current.y = MathUtils.damp(smoothPointer.current.y, pointer.y, smoothing.pointer, delta);

    const idleX = Math.sin(loop * microDrift.cameraFrequency.x) * microDrift.cameraAmplitude.x;
    const idleY = Math.sin(loop * microDrift.cameraFrequency.y) * microDrift.cameraAmplitude.y;
    const idleZ = Math.cos(loop * microDrift.cameraFrequency.z) * microDrift.cameraAmplitude.z;

    const targetIdleX = Math.sin(loop * microDrift.targetFrequency.x) * microDrift.targetAmplitude.x;
    const targetIdleY = Math.cos(loop * microDrift.targetFrequency.y) * microDrift.targetAmplitude.y;
    const targetIdleZ = Math.sin(loop * microDrift.targetFrequency.z) * microDrift.targetAmplitude.z;

    const baseShotCameraX = baseCameraPosition.current.x;
    const baseShotCameraY = baseCameraPosition.current.y;
    const baseShotCameraZ = baseCameraPosition.current.z;
    const microDriftCameraX = idleX;
    const microDriftCameraY = idleY;
    const microDriftCameraZ = idleZ;
    const parallaxCameraX = smoothPointer.current.x * parallax.cameraX;
    const parallaxCameraY = smoothPointer.current.y * parallax.cameraY;

    const nextX = fixedMode
      ? baseShotCameraX
      : clampAround(baseShotCameraX + microDriftCameraX + parallaxCameraX, baseShotCameraX, clamps.cameraX);
    const nextY = fixedMode
      ? baseShotCameraY
      : clampAround(baseShotCameraY + microDriftCameraY + parallaxCameraY, baseShotCameraY, clamps.cameraY);
    const nextZ = fixedMode
      ? baseShotCameraZ
      : clampAround(baseShotCameraZ + microDriftCameraZ, baseShotCameraZ, clamps.cameraZ);

    computedCamera.current.set(nextX, nextY, nextZ);

    smoothTargetOffset.current.x = MathUtils.damp(
      smoothTargetOffset.current.x,
      smoothPointer.current.x * parallax.targetX,
      smoothing.targetOffset,
      delta,
    );
    smoothTargetOffset.current.y = MathUtils.damp(
      smoothTargetOffset.current.y,
      smoothPointer.current.y * parallax.targetY,
      smoothing.targetOffset,
      delta,
    );

    const baseShotTargetX = baseTarget.current.x;
    const baseShotTargetY = baseTarget.current.y;
    const baseShotTargetZ = baseTarget.current.z;
    const parallaxTargetX = fixedMode ? 0 : smoothTargetOffset.current.x;
    const parallaxTargetY = fixedMode ? 0 : smoothTargetOffset.current.y;

    const targetX = fixedMode
      ? baseShotTargetX
      : clampAround(baseShotTargetX + targetIdleX + parallaxTargetX, baseShotTargetX, clamps.targetX);
    const targetY = fixedMode
      ? baseShotTargetY
      : clampAround(baseShotTargetY + targetIdleY + parallaxTargetY, baseShotTargetY, clamps.targetY);
    const targetZ = fixedMode
      ? baseShotTargetZ
      : clampAround(baseShotTargetZ + targetIdleZ, baseShotTargetZ, clamps.targetZ);

    computedTarget.current.set(targetX, targetY, targetZ);

    const boundsCenter = new Vector3(...bounds.center);
    const boundsSize = new Vector3(...bounds.size);
    const modelRadius = Math.max(boundsSize.length() * 0.5, 0.001);

    const positionMin = new Vector3(
      boundsCenter.x - boundsSize.x * 2.8,
      boundsCenter.y - boundsSize.y * 0.55,
      boundsCenter.z - boundsSize.z * 2.8,
    );
    const positionMax = new Vector3(
      boundsCenter.x + boundsSize.x * 2.8,
      boundsCenter.y + boundsSize.y * 2.1,
      boundsCenter.z + boundsSize.z * 2.8,
    );
    computedCamera.current.set(
      MathUtils.clamp(computedCamera.current.x, positionMin.x, positionMax.x),
      MathUtils.clamp(computedCamera.current.y, positionMin.y, positionMax.y),
      MathUtils.clamp(computedCamera.current.z, positionMin.z, positionMax.z),
    );

    const lookAtMin = new Vector3(
      boundsCenter.x - boundsSize.x * 0.72,
      boundsCenter.y - boundsSize.y * 0.2,
      boundsCenter.z - boundsSize.z * 0.72,
    );
    const lookAtMax = new Vector3(
      boundsCenter.x + boundsSize.x * 0.72,
      boundsCenter.y + boundsSize.y * 0.95,
      boundsCenter.z + boundsSize.z * 0.72,
    );
    computedTarget.current.set(
      MathUtils.clamp(computedTarget.current.x, lookAtMin.x, lookAtMax.x),
      MathUtils.clamp(computedTarget.current.y, lookAtMin.y, lookAtMax.y),
      MathUtils.clamp(computedTarget.current.z, lookAtMin.z, lookAtMax.z),
    );

    // Guard rail de runtime: evita que la cámara entre en el volumen aproximado del modelo.
    const margin = Math.max(modelRadius * 0.08, camera.near * 2.25);
    const minDistance = modelRadius * clamps.modelRadiusMultiplier + margin;

    const cameraToTarget = computedCamera.current.clone().sub(computedTarget.current);
    const currentDistance = cameraToTarget.length();

    if (currentDistance < minDistance) {
      cameraToTarget.normalize().multiplyScalar(minDistance || 0.001);
      computedCamera.current.copy(computedTarget.current).add(cameraToTarget);
    }

    if (CAMERA_RIG_DEBUG) {
      const elapsed = clock.getElapsedTime();
      if (elapsed - lastDebugLog.current > 0.25) {
        const distanceToCenter = computedCamera.current.distanceTo(boundsCenter);
        const unsafe = distanceToCenter < modelRadius;
        const log = unsafe ? console.warn : console.info;
        log(
          `[CameraRig] distance(camera-center)=${distanceToCenter.toFixed(3)} radius=${modelRadius.toFixed(3)} minDistance=${minDistance.toFixed(3)} ${unsafe ? "⚠️ inside bounding sphere" : "ok"}`
        );
        lastDebugLog.current = elapsed;
      }
    }

    if (fixedMode) {
      camera.position.copy(computedCamera.current);
    } else {
      camera.position.x = MathUtils.damp(camera.position.x, computedCamera.current.x, smoothing.cameraPosition, delta);
      camera.position.y = MathUtils.damp(camera.position.y, computedCamera.current.y, smoothing.cameraPosition, delta);
      camera.position.z = MathUtils.damp(camera.position.z, computedCamera.current.z, smoothing.cameraPosition, delta);
    }

    camera.lookAt(computedTarget.current);
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
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const resumeAutoRotateTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [bounds, setBounds] = useState<BoundsSnapshot>({
    center: [0, 0.8, 0],
    size: [8, 4, 6],
  });

  const pauseAutoRotateForUserInteraction = () => {
    setIsUserInteracting(true);
    if (resumeAutoRotateTimerRef.current) {
      clearTimeout(resumeAutoRotateTimerRef.current);
    }

    resumeAutoRotateTimerRef.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, IDLE_SECONDS * 1000);
  };

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

  useEffect(() => {
    return () => {
      if (resumeAutoRotateTimerRef.current) {
        clearTimeout(resumeAutoRotateTimerRef.current);
      }
    };
  }, []);

  const baseCamera = FORCE_FIXED_CAMERA_FOR_DEBUG ? FIXED_CAMERA_DEBUG.position : ([7.6, 3.9, 5.9] as const);
  const baseTarget = useMemo<[number, number, number]>(
    () => getBaseTargetFromBounds(bounds, breakpoint),
    [bounds, breakpoint],
  );

  return (
    <div
      className="group relative aspect-[15/10] w-full min-h-[19rem] max-h-[26rem] overflow-hidden rounded-[var(--radius-lg)] border border-[color-mix(in_srgb,var(--color-border)_75%,var(--color-accent)_25%)] bg-[radial-gradient(circle_at_72%_38%,rgba(72,84,99,0.22)_0%,rgba(20,24,30,0)_34%),linear-gradient(135deg,#0f141b_0%,#161d26_50%,#0d1117_100%)] shadow-[0_34px_90px_rgba(2,8,18,0.46)]"
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const nx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
        const ny = ((event.clientY - rect.top) / rect.height - 0.5) * -2;
        setPointer({ x: nx, y: ny });
      }}
      onPointerLeave={() => setPointer({ x: 0, y: 0 })}
      onPointerDown={pauseAutoRotateForUserInteraction}
    >
      <div className="absolute inset-0 z-0 bg-[linear-gradient(120deg,rgba(5,7,11,0.8)_0%,rgba(8,13,20,0.28)_42%,rgba(6,9,14,0.9)_100%)]" />

      <Canvas
        className="relative z-10"
        camera={{
          position: baseCamera,
          fov: FORCE_FIXED_CAMERA_FOR_DEBUG ? FIXED_CAMERA_DEBUG.fov : 30,
          near: FORCE_FIXED_CAMERA_FOR_DEBUG ? FIXED_CAMERA_DEBUG.near : 0.12,
          far: FORCE_FIXED_CAMERA_FOR_DEBUG ? FIXED_CAMERA_DEBUG.far : 140,
        }}
        dpr={breakpoint === "mobile" ? [1, 1.25] : [1, 1.6]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.42} />
        <hemisphereLight intensity={0.72} color="#dbe7f0" groundColor="#1a1d22" />
        <directionalLight position={[8, 12, 6]} intensity={1.65} color="#fff4df" />
        <directionalLight position={[-6, 4, 8]} intensity={0.45} color="#bdd2e7" />

        <Suspense fallback={<LoadingFallback />}>
          <HeroSceneModel breakpoint={breakpoint} onBoundsChange={setBounds} />
        </Suspense>

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.15, 0]} scale={[40, 40, 1]}>
          <planeGeometry args={[1, 1]} />
          <meshStandardMaterial color="#1c2128" transparent opacity={0.18} roughness={1} metalness={0} />
        </mesh>

        {DEBUG_CONTROLS || !USE_CAMERA_RIG ? (
          <OrbitControls
            makeDefault
            enablePan={false}
            enableZoom={false}
            enableDamping
            dampingFactor={0.08}
            autoRotate={!isUserInteracting}
            autoRotateSpeed={0.48}
            minDistance={5.5}
            maxDistance={16}
            minPolarAngle={Math.PI / 4.8}
            maxPolarAngle={Math.PI / 2.08}
            target={baseTarget}
            onStart={pauseAutoRotateForUserInteraction}
            onChange={pauseAutoRotateForUserInteraction}
          />
        ) : (
          <CameraRig
            pointer={pointer}
            breakpoint={breakpoint}
            bounds={bounds}
            fixedMode={FORCE_FIXED_CAMERA_FOR_DEBUG}
          />
        )}
      </Canvas>

      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-[42%] bg-gradient-to-r from-[#090d13] via-[#090d13]/68 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-t from-black/45 to-transparent" />
      <div className="pointer-events-none absolute right-3 top-3 z-30 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-white/70">
        3D Hero Demo
      </div>
    </div>
  );
}
