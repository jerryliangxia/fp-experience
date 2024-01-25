import { Points, Point, useTexture } from "@react-three/drei";
import { useControls } from "leva";
import React, { Suspense, useRef } from "react";
import * as THREE from "three";
import colors from "nice-color-palettes";
import { useFrame } from "@react-three/fiber";

const particleTextures = [
  "textures/particles/1.png",
  "textures/particles/2.png",
  "textures/particles/3.png",
  "textures/particles/4.png",
  "textures/particles/5.png",
  "textures/particles/6.png",
  "textures/particles/7.png",
  "textures/particles/8.png",
  "textures/particles/9.png",
  "textures/particles/10.png",
  "textures/particles/11.png",
  "textures/particles/12.png",
  "textures/particles/13.png",
];

const palette = colors[Math.floor(Math.random() * colors.length)];

const controls = {
  textureType: { value: 8, min: 0, max: 12, step: 1 },
  count: { value: 4000, min: 1, max: 10000 },
  size: { value: 1.9, min: 0.1, max: 20 },
  radius: { value: 1500, min: 1, max: 100000 },
  branches: { value: 1, min: 1, max: 20, step: 1 },
  spin: { value: -3.0, min: -3, max: 3, step: 0.0001 },
  randomness: { value: 0.04, min: 0, max: 1, step: 0.0001 },
  randomnessPower: { value: 1, min: 1, max: 10, step: 0.0001 },
  rotationSpeed: { value: 0.02, min: 0, max: 5 },
  insideColor: palette[0],
  outsideColor: palette[1 + Math.floor(Math.random() * (palette.length - 2))],
  positionY: { value: 40, min: 40, max: 100, step: 1 },
};

function Galaxy() {
  const {
    count,
    size,
    textureType,
    radius,
    branches,
    spin,
    randomness,
    randomnessPower,
    rotationSpeed,
    insideColor,
    outsideColor,
  } = useControls(controls);
  const particlesRef = useRef();
  const particleTexture = useTexture(particleTextures[textureType]);
  useFrame(
    (state) =>
      (particlesRef.current.rotation.y =
        state.clock.getElapsedTime() * rotationSpeed)
  );
  return (
    <Points ref={particlesRef} limit={10000}>
      <pointsMaterial
        size={size}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
        vertexColors
        map={particleTexture}
        alphaMap={particleTexture}
      />
      {Array.from({ length: count }).map((_, i) => {
        const pRadius = Math.random() * radius;
        const sAngle = pRadius * spin;
        const bAngle = ((i % branches) / branches) * Math.PI * 2;
        const rndX =
          Math.pow(Math.random(), randomnessPower) *
          (Math.random() > 0.5 ? 1 : -1) *
          randomness *
          radius;
        const rndY =
          Math.pow(Math.random(), randomnessPower) *
          (Math.random() > 0.5 ? 1 : -1) *
          randomness *
          radius;
        const rndZ =
          Math.pow(Math.random(), randomnessPower) *
          (Math.random() > 0.5 ? 1 : -1) *
          randomness *
          radius;
        const position = [
          Math.cos(bAngle + sAngle) * pRadius + rndX,
          rndY,
          Math.sin(bAngle + sAngle) * pRadius + rndZ,
        ];
        const color = new THREE.Color(insideColor).lerp(
          new THREE.Color(outsideColor),
          pRadius / radius
        );
        return <Point key={i} position={position} color={color} />;
      })}
    </Points>
  );
}

export default function GalaxyEffectClone() {
  return (
    <mesh position-y={80}>
      <Suspense fallback={null}>
        <Galaxy />
      </Suspense>
    </mesh>
  );
}
