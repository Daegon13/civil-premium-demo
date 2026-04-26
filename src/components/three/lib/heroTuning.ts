function readNumberEnv(name: string, fallback: number) {
  const raw = process.env[name];
  if (!raw) {
    return fallback;
  }

  const parsed = Number(raw);
  if (Number.isNaN(parsed) || !Number.isFinite(parsed)) {
    return fallback;
  }

  return parsed;
}

/**
 * Ajustes manuales para el Hero 3D.
 * - NEXT_PUBLIC_HERO_CAMERA_DISTANCE_FACTOR: > 1 aleja cámara, < 1 acerca.
 * - NEXT_PUBLIC_HERO_STAGE_MIN_HEIGHT_REM / MAX_HEIGHT_REM: alto caja hero.
 * - NEXT_PUBLIC_HERO_STAGE_ASPECT_RATIO: relación ancho/alto (ej: "15 / 10", "16 / 9").
 * - NEXT_PUBLIC_HERO_USE_CAMERA_RIG: activa CameraRig avanzado.
 */
export const HERO_3D_TUNING = {
  useCameraRig: process.env.NEXT_PUBLIC_HERO_USE_CAMERA_RIG === "true",
  cameraDistanceFactor: readNumberEnv("NEXT_PUBLIC_HERO_CAMERA_DISTANCE_FACTOR", 1),
  stageMinHeightRem: readNumberEnv("NEXT_PUBLIC_HERO_STAGE_MIN_HEIGHT_REM", 19),
  stageMaxHeightRem: readNumberEnv("NEXT_PUBLIC_HERO_STAGE_MAX_HEIGHT_REM", 26),
  stageAspectRatio: process.env.NEXT_PUBLIC_HERO_STAGE_ASPECT_RATIO ?? "15 / 10",
} as const;

