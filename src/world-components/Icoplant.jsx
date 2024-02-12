import React, { useRef, useMemo } from "react";
import { useFrame, useThree, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import vertexShader from "./sway/vertex.glsl";
import fragmentShader from "./sway/fragment.glsl";

export default function Icoplant(props) {
  const { clock } = useThree();

  const texture = useLoader(THREE.TextureLoader, "/textures/icoplant.png");
  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      baseColor: { value: props.baseColor },
      multiplier: { value: 1.6 },
      map: { value: texture },
      useTexture: { value: true },
    }),
    [props.baseColor]
  );

  const leavesMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms,
        side: THREE.DoubleSide,
      }),
    [uniforms]
  );

  const geometry = useMemo(() => {
    const gltf = useLoader(GLTFLoader, "/models/icoplant.glb");
    return gltf.nodes.Icoplant.geometry;
  }, []);

  useFrame(() => {
    uniforms.time.value = clock.getElapsedTime();
  });

  return (
    <>
      <mesh
        castShadow
        position={props.position}
        geometry={geometry}
        material={leavesMaterial}
        scale={0.3}
      />
    </>
  );
}
