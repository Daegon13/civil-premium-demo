"use client";

import { Suspense, useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Box3, Group, MathUtils, Object3D, PerspectiveCamera, Vector3 } from "three";

const DEFAULT_MODEL_PATH = "/models/arch-hero-generator_v003.glb";
const DEBUG_3D = true;

export type StageConfig = {
  modelScale: number;
  modelPosition: [number, number, number];
  modelRotation: [number, number, number];
  cameraPosition: [number, number, number];
  target: [number, number, number];
  fov: number;
};

const INITIAL_STAGE_CONFIG: StageConfig = {
  modelScale: 1,
  modelPosition: [0, 0, 0],
  modelRotation: [0, 0, 0],
  cameraPosition: [0, 0, 0],
  target: [0, 0, 0],
  fov: 38,
};

type BoundsSnapshot = {
  center: [number, number, number];
  size: [number, number, number];
};

type CameraSnapshot = {
  autoCamera: [number, number, number];
  finalCamera: [number, number, number];
  finalTarget: [number, number, number];
};

type StageSnapshot = {
  modelScale: number;
  modelPosition: [number, number, number];
  modelRotation: [number, number, number];
  cameraPosition: [number, number, number];
  target: [number, number, number];
  fov: number;
  boundsCenter: [number, number, number];
  boundsSize: [number, number, number];
  autoCamera: [number, number, number];
};

type ModelStageProps = {
  modelName?: string;
  modelPath?: string;
  initialConfig?: StageConfig;
};

function toFixedVec3(vector: Vector3): [number, number, number] {
  return [vector.x, vector.y, vector.z].map((value) => Number(value.toFixed(4))) as [number, number, number];
}

function NumericControl({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (next: number) => void;
}) {
  return (
    <label className="grid gap-1 text-xs text-neutral-700">
      <span className="font-medium text-neutral-800">{label}</span>
      <div className="grid grid-cols-[1fr_auto] items-center gap-2">
        <input
          className="w-full accent-neutral-800"
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
        />
        <input
          className="w-20 rounded border border-neutral-300 px-2 py-1 font-mono text-xs text-neutral-900"
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
        />
      </div>
    </label>
  );
}

function VectorControl({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: [number, number, number];
  min: number;
  max: number;
  step: number;
  onChange: (next: [number, number, number]) => void;
}) {
  const update = (index: number, next: number) => {
    const draft = [...value] as [number, number, number];
    draft[index] = next;
    onChange(draft);
  };

  return (
    <div className="grid gap-2">
      <p className="text-xs font-medium text-neutral-800">{label}</p>
      <div className="grid gap-2 sm:grid-cols-3">
        {(["x", "y", "z"] as const).map((axis, index) => (
          <NumericControl
            key={`${label}-${axis}`}
            label={axis.toUpperCase()}
            value={value[index]}
            min={min}
            max={max}
            step={step}
            onChange={(next) => update(index, next)}
          />
        ))}
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial color="#a3a3a3" wireframe />
    </mesh>
  );
}

function StageScene({
  modelPath,
  config,
  onBounds,
  onCamera,
}: {
  modelPath: string;
  config: StageConfig;
  onBounds: (snapshot: BoundsSnapshot) => void;
  onCamera: (snapshot: CameraSnapshot) => void;
}) {
  const { scene } = useGLTF(modelPath);
  const sceneClone = useMemo<Object3D>(() => scene.clone(), [scene]);
  const wrapperRef = useRef<Group>(null);
  const { camera, size } = useThree();

  const computed = useMemo(() => {
    const bounds = new Box3().setFromObject(sceneClone);
    const center = bounds.getCenter(new Vector3());
    const size3 = bounds.getSize(new Vector3());

    return {
      center,
      size: size3,
      autoCenterOffset: new Vector3(-center.x, -center.y, -center.z),
    };
  }, [sceneClone]);

  const fittedBounds = useMemo(() => {
    const scaledSize = computed.size.clone().multiplyScalar(config.modelScale);
    const stageCenter = new Vector3(...config.modelPosition);

    return {
      center: stageCenter,
      size: scaledSize,
      radius: Math.max(scaledSize.length() / 2, 0.0001),
    };
  }, [computed.size, config.modelPosition, config.modelScale]);

  useLayoutEffect(() => {
    if (!wrapperRef.current) {
      return;
    }

    wrapperRef.current.scale.setScalar(config.modelScale);
    wrapperRef.current.position.set(
      computed.autoCenterOffset.x * config.modelScale + config.modelPosition[0],
      computed.autoCenterOffset.y * config.modelScale + config.modelPosition[1],
      computed.autoCenterOffset.z * config.modelScale + config.modelPosition[2],
    );
    wrapperRef.current.rotation.set(config.modelRotation[0], config.modelRotation[1], config.modelRotation[2]);
  }, [computed.autoCenterOffset, config.modelPosition, config.modelRotation, config.modelScale]);

  useLayoutEffect(() => {
    const aspect = size.width / Math.max(size.height, 1);
    const vFov = MathUtils.degToRad(config.fov);
    const hFov = 2 * Math.atan(Math.tan(vFov / 2) * aspect);
    const fitFov = Math.max(Math.min(vFov, hFov), MathUtils.degToRad(10));

    const fitDistance = (fittedBounds.radius * 1.35) / Math.sin(fitFov / 2);
    const baseDirection = new Vector3(1, 0.45, 1).normalize();
    const autoCamera = fittedBounds.center.clone().add(baseDirection.multiplyScalar(fitDistance));
    const finalCamera = autoCamera.clone().add(new Vector3(...config.cameraPosition));
    const finalTarget = fittedBounds.center.clone().add(new Vector3(...config.target));

    if (camera instanceof PerspectiveCamera) {
      camera.position.copy(finalCamera);
      camera.fov = config.fov;
      camera.lookAt(finalTarget);
      camera.updateProjectionMatrix();
    }

    onCamera({
      autoCamera: toFixedVec3(autoCamera),
      finalCamera: toFixedVec3(finalCamera),
      finalTarget: toFixedVec3(finalTarget),
    });
  }, [camera, config.cameraPosition, config.fov, config.target, fittedBounds.center, fittedBounds.radius, onCamera, size.height, size.width]);

  useLayoutEffect(() => {
    onBounds({
      center: toFixedVec3(computed.center),
      size: toFixedVec3(computed.size),
    });
  }, [computed.center, computed.size, onBounds]);

  return (
    <>
      <ambientLight intensity={0.45} />
      <hemisphereLight intensity={0.65} color="#ffffff" groundColor="#b9bfc8" />
      <directionalLight position={[7, 10, 5]} intensity={1.1} color="#fff8ea" />
      <directionalLight position={[-6, 4, -4]} intensity={0.35} color="#d4e3ff" />

      <group ref={wrapperRef}>
        <primitive object={sceneClone} />
      </group>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -fittedBounds.size.y / 2 - 0.01, 0]}>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial color="#e5e7eb" roughness={1} metalness={0} />
      </mesh>

      {DEBUG_3D ? (
        <>
          <axesHelper args={[6]} />
          <gridHelper args={[30, 30, "#6b7280", "#d4d4d4"]} />
          <mesh position={fittedBounds.center.toArray()}>
            <boxGeometry args={fittedBounds.size.toArray()} />
            <meshBasicMaterial color="#2563eb" wireframe transparent opacity={0.55} />
          </mesh>
          <OrbitControls makeDefault enableDamping dampingFactor={0.09} />
        </>
      ) : null}
    </>
  );
}

export function ModelStage({ modelName = "Arch Hero Generator", modelPath = DEFAULT_MODEL_PATH, initialConfig = INITIAL_STAGE_CONFIG }: ModelStageProps) {
  const [config, setConfig] = useState<StageConfig>(initialConfig);
  const [bounds, setBounds] = useState<BoundsSnapshot>({ center: [0, 0, 0], size: [0, 0, 0] });
  const [cameraSnapshot, setCameraSnapshot] = useState<CameraSnapshot>({
    autoCamera: [0, 0, 0],
    finalCamera: [0, 0, 0],
    finalTarget: [0, 0, 0],
  });

  const stageSnapshot: StageSnapshot = {
    ...config,
    boundsCenter: bounds.center,
    boundsSize: bounds.size,
    autoCamera: cameraSnapshot.autoCamera,
  };

  const snapshotText = JSON.stringify(stageSnapshot, null, 2);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(snapshotText);
      console.info("Stage config copiada al portapapeles.");
    } catch {
      console.warn("No se pudo copiar automáticamente. Copia el bloque manualmente.");
    }
  }, [snapshotText]);

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
      <section className="relative h-[72vh] min-h-[520px] overflow-hidden rounded-2xl border border-neutral-300 bg-neutral-100 shadow-[0_20px_70px_rgba(0,0,0,0.16)]">
        <Canvas camera={{ position: [8, 5, 8], fov: config.fov }} dpr={[1, 2]}>
          <color attach="background" args={["#f3f4f6"]} />
          <Suspense fallback={<LoadingFallback />}>
            <StageScene modelPath={modelPath} config={config} onBounds={setBounds} onCamera={setCameraSnapshot} />
          </Suspense>
        </Canvas>

        <div className="pointer-events-none absolute left-4 top-4 rounded-full bg-black/70 px-3 py-1 text-xs font-medium tracking-wide text-white/90">
          {DEBUG_3D ? "DEBUG ON" : "DEBUG OFF"}
        </div>
      </section>

      <aside className="space-y-4 rounded-2xl border border-neutral-300 bg-white p-4 shadow-sm">
        <div>
          <h2 className="text-lg font-semibold text-neutral-900">3D Asset Stage Controls</h2>
          <p className="mt-1 text-sm text-neutral-600">Modelo: {modelName}</p>
          <p className="text-xs text-neutral-500">Ruta: {modelPath}</p>
        </div>

        <div className="space-y-4">
          <NumericControl
            label="Model Scale"
            value={config.modelScale}
            min={0.1}
            max={5}
            step={0.01}
            onChange={(modelScale) => setConfig((prev) => ({ ...prev, modelScale }))}
          />
          <VectorControl
            label="Model Position Offset"
            value={config.modelPosition}
            min={-20}
            max={20}
            step={0.01}
            onChange={(modelPosition) => setConfig((prev) => ({ ...prev, modelPosition }))}
          />
          <VectorControl
            label="Model Rotation (radians)"
            value={config.modelRotation}
            min={-Math.PI}
            max={Math.PI}
            step={0.01}
            onChange={(modelRotation) => setConfig((prev) => ({ ...prev, modelRotation }))}
          />
          <VectorControl
            label="Camera Position Offset"
            value={config.cameraPosition}
            min={-20}
            max={20}
            step={0.01}
            onChange={(cameraPosition) => setConfig((prev) => ({ ...prev, cameraPosition }))}
          />
          <VectorControl
            label="Target Offset"
            value={config.target}
            min={-20}
            max={20}
            step={0.01}
            onChange={(target) => setConfig((prev) => ({ ...prev, target }))}
          />
          <NumericControl
            label="Camera FOV"
            value={config.fov}
            min={15}
            max={90}
            step={1}
            onChange={(fov) => setConfig((prev) => ({ ...prev, fov }))}
          />
        </div>

        <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-600">Runtime values</p>
          <pre className="mt-2 max-h-56 overflow-auto text-xs text-neutral-700">{JSON.stringify({
            modelScale: config.modelScale,
            modelPosition: config.modelPosition,
            modelRotation: config.modelRotation,
            cameraPosition: cameraSnapshot.finalCamera,
            target: cameraSnapshot.finalTarget,
            boundsCenter: bounds.center,
            boundsSize: bounds.size,
          }, null, 2)}</pre>
        </div>

        <div className="space-y-2 rounded-xl border border-neutral-200 bg-neutral-50 p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-600">Config exportable</p>
          <button
            type="button"
            onClick={handleCopy}
            className="rounded-md bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-neutral-700"
          >
            Copiar config
          </button>
          <pre className="max-h-64 overflow-auto rounded-md bg-neutral-950 p-3 text-xs text-neutral-100">{snapshotText}</pre>
        </div>
      </aside>
    </div>
  );
}
