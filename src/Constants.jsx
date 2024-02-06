import { Vector3 } from "three";

export const Gravity = 30;

const resolution = window.innerWidth;
export const isMobile = resolution >= 320 && resolution <= 480;
export const isTablet = resolution >= 768 && resolution <= 1024;
export const isDesktop = !isMobile && !isTablet;

export const bw = isTablet ? document.body.clientWidth / 6 : 200;
export const bh = isTablet ? document.body.clientHeight / 6 : 200;

export const ballCount = 100;
export const radius = 0.2;
export const balls = [...Array(ballCount)].map(() => ({
  position: [Math.random() * 50 - 25, -5, Math.random() * 50 - 25],
}));
export const v1 = new Vector3();
export const v2 = new Vector3();
export const v3 = new Vector3();
export const frameSteps = 5;
