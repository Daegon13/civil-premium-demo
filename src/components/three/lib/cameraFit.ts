import { MathUtils, Vector3 } from "three";

type CameraFitInput = {
  boundsSize: Vector3;
  boundsCenter: Vector3;
  fov: number;
  aspect: number;
  fitPadding: number;
};

type CameraFitResult = {
  autoCameraPosition: Vector3;
  autoTarget: Vector3;
};

const MIN_SAFE_DISTANCE = 0.0001;
const BASE_VIEW_DIRECTION = new Vector3(0.74, 0.33, 0.58).normalize();

export function getAutoCameraFit({
  boundsSize,
  boundsCenter,
  fov,
  aspect,
  fitPadding,
}: CameraFitInput): CameraFitResult {
  const safeAspect = Math.max(aspect, 0.01);
  const halfSize = boundsSize.clone().multiplyScalar(0.5);
  const verticalFov = MathUtils.degToRad(fov);
  const horizontalFov = 2 * Math.atan(Math.tan(verticalFov / 2) * safeAspect);

  const verticalDistance = halfSize.y / Math.max(Math.tan(verticalFov / 2), MIN_SAFE_DISTANCE);
  const horizontalDistance = halfSize.x / Math.max(Math.tan(horizontalFov / 2), MIN_SAFE_DISTANCE);
  const fitDistance = Math.max(verticalDistance, horizontalDistance, MIN_SAFE_DISTANCE);
  const distanceWithDepth = (fitDistance + halfSize.z) * Math.max(fitPadding, 0.01);

  return {
    autoCameraPosition: boundsCenter.clone().add(BASE_VIEW_DIRECTION.clone().multiplyScalar(distanceWithDepth)),
    autoTarget: boundsCenter.clone(),
  };
}
