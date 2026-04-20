"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";

type AxisState = {
  rotateX: number;
  rotateY: number;
  translateX: number;
  translateY: number;
};

const INITIAL_STATE: AxisState = {
  rotateX: 0,
  rotateY: 0,
  translateX: 0,
  translateY: 0,
};

const MAX_ROTATION_DEG = 3;
const MAX_TRANSLATE_PX = 14;
const EASING_FACTOR = 0.12;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function supportsFinePointer() {
  if (typeof window === "undefined") {
    return false;
  }

  if (window.navigator.maxTouchPoints > 0) {
    return false;
  }

  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export function useParallaxTilt() {
  const tiltRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const currentRef = useRef<AxisState>({ ...INITIAL_STATE });
  const targetRef = useRef<AxisState>({ ...INITIAL_STATE });
  const [enabled, setEnabled] = useState(false);

  const animateStep = useCallback(() => {
    const node = tiltRef.current;

    if (!node) {
      return false;
    }

    const current = currentRef.current;
    const target = targetRef.current;

    current.rotateX += (target.rotateX - current.rotateX) * EASING_FACTOR;
    current.rotateY += (target.rotateY - current.rotateY) * EASING_FACTOR;
    current.translateX += (target.translateX - current.translateX) * EASING_FACTOR;
    current.translateY += (target.translateY - current.translateY) * EASING_FACTOR;

    node.style.transform = `translate3d(${current.translateX.toFixed(2)}px, ${current.translateY.toFixed(2)}px, 0) rotateX(${current.rotateX.toFixed(2)}deg) rotateY(${current.rotateY.toFixed(2)}deg)`;

    return (
      Math.abs(target.rotateX - current.rotateX) > 0.01 ||
      Math.abs(target.rotateY - current.rotateY) > 0.01 ||
      Math.abs(target.translateX - current.translateX) > 0.02 ||
      Math.abs(target.translateY - current.translateY) > 0.02
    );
  }, []);

  const queueFrame = useCallback(() => {
    if (frameRef.current !== null || !enabled) {
      return;
    }

    const loop = () => {
      const shouldContinue = animateStep();

      if (shouldContinue) {
        frameRef.current = window.requestAnimationFrame(loop);
        return;
      }

      frameRef.current = null;
    };

    frameRef.current = window.requestAnimationFrame(loop);
  }, [animateStep, enabled]);

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (!enabled) {
        return;
      }

      const rect = event.currentTarget.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const normalizedX = clamp(x * 2 - 1, -1, 1);
      const normalizedY = clamp(y * 2 - 1, -1, 1);

      targetRef.current = {
        rotateX: -normalizedY * MAX_ROTATION_DEG,
        rotateY: normalizedX * MAX_ROTATION_DEG,
        translateX: normalizedX * MAX_TRANSLATE_PX,
        translateY: normalizedY * MAX_TRANSLATE_PX,
      };

      queueFrame();
    },
    [enabled, queueFrame],
  );

  const handlePointerLeave = useCallback(() => {
    targetRef.current = { ...INITIAL_STATE };
    queueFrame();
  }, [queueFrame]);

  useEffect(() => {
    const update = () => {
      const available = supportsFinePointer();
      setEnabled(available);

      if (!available) {
        targetRef.current = { ...INITIAL_STATE };
        currentRef.current = { ...INITIAL_STATE };

        if (frameRef.current !== null) {
          window.cancelAnimationFrame(frameRef.current);
          frameRef.current = null;
        }

        if (tiltRef.current) {
          tiltRef.current.style.transform = "translate3d(0px, 0px, 0) rotateX(0deg) rotateY(0deg)";
        }
      }
    };

    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    update();
    mediaQuery.addEventListener("change", update);

    return () => {
      mediaQuery.removeEventListener("change", update);

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return {
    tiltRef,
    enabled,
    handlePointerMove,
    handlePointerLeave,
  };
}
