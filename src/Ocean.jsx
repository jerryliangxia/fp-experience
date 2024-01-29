import {
  Plane,
  PositionalAudio,
  shaderMaterial,
  Stars,
} from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { folder, useControls } from "leva";
import React, { useRef, Suspense } from "react";
import * as THREE from "three";
import oceanVertexShader from "./ocean/vertex.glsl";
import oceanFragmentShader from "./ocean/fragment.glsl";

function RagingSea() {
  //   const {
  //     animate,
  //     bigWavesElevation,
  //     bigWavesFrequency,
  //     bigWaveSpeed,
  //     surfaceColor,
  //     depthColor,
  //     colorOffset,
  //     colorMultiplier,
  //     smallWavesElevation,
  //     smallWavesFrequency,
  //     smallWavesSpeed,
  //     smallIterations,
  //   } = useControls({
  //     animate: true,
  //     colors: folder({
  //       surfaceColor: "#ffffff",
  //       depthColor: "#35c7d2",
  //       colorOffset: 0.02,
  //       colorMultiplier: 4.0,
  //     }),
  //     bigWaves: folder({
  //       bigWavesElevation: 0.1,
  //       bigWavesFrequency: [0.03, 0.04],
  //       bigWaveSpeed: 0.1,
  //     }),
  //     smallWaves: folder({
  //       smallWavesElevation: 0.1,
  //       smallWavesFrequency: 1.0,
  //       smallWavesSpeed: 0.2,
  //       smallIterations: 1.0,
  //     }),
  //   });
  const values = {
    animate: true,
    bigWavesElevation: 0.1,
    bigWavesFrequency: [0.03, 0.04],
    bigWaveSpeed: 0.1,
    surfaceColor: "#ffffff",
    depthColor: "#35c7d2",
    colorOffset: 0.02,
    colorMultiplier: 4.0,
    smallWavesElevation: 0.1,
    smallWavesFrequency: 1.0,
    smallWavesSpeed: 0.2,
    smallIterations: 1.0,
  };

  const shaderRef = useRef();
  useFrame((_, delta) => values.animate && (shaderRef.current.uTime += delta));
  return (
    <Plane
      args={[800, 800, 1024, 1024]}
      receiveShadow
      rotation-x={-Math.PI / 2}
    >
      <ragingSeaMaterial
        key={RagingSeaMaterial.key}
        ref={shaderRef}
        uBigWavesElevation={values.bigWavesElevation}
        uBigWavesFrequency={values.bigWavesFrequency}
        uBigWavesSpeed={values.bigWaveSpeed}
        uSurfaceColor={values.surfaceColor}
        uDepthColor={values.depthColor}
        uColorOffset={values.colorOffset}
        uColorMultiplier={values.colorMultiplier}
        uSmallWavesElevation={values.smallWavesElevation}
        uSmallWavesFrequency={values.smallWavesFrequency}
        uSmallWavesSpeed={values.smallWavesSpeed}
        uSmallIterations={values.smallIterations}
      />
      <PositionalAudio autoplay url="/sounds/ocean.mp3" loop distance={5} />
    </Plane>
  );
}

const RagingSeaMaterial = new shaderMaterial(
  {
    uTime: 1,
    uBigWavesElevation: 0.1,
    uBigWavesFrequency: [0.03, 0.04],
    uBigWavesSpeed: 0.1,
    uSurfaceColor: new THREE.Color("#ffffff"),
    uDepthColor: new THREE.Color("#35c7d2"),
    uColorOffset: 0.02,
    uColorMultiplier: 4,
    uSmallWavesElevation: 0.1,
    uSmallWavesFrequency: 1,
    uSmallWavesSpeed: 0.2,
    uSmallIterations: 1.0,
  },
  oceanVertexShader,
  oceanFragmentShader
);

RagingSeaMaterial.key = Math.random();

extend({ RagingSeaMaterial });

export default function Ocean() {
  return (
    <Suspense fallback={null}>
      <RagingSea />
      {/* <color attach="background" args={["#141852"]} /> */}
      <Stars
        radius={200}
        depth={1}
        count={10000}
        factor={4}
        saturation={10}
        fade
      />
    </Suspense>
  );
}
