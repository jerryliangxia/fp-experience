import React, { useRef, useMemo } from "react";
import { useFrame, useThree, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import vertexShader from "./sway/vertex.glsl";
import fragmentShader from "./sway/fragment.glsl";

export default function Icoplant(props) {
  const meshRef = useRef();
  const { clock } = useThree();

  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      baseColor: { value: props.baseColor },
      multiplier: { value: 2.0 },
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
    const gltf = useLoader(GLTFLoader, "/icoplant.glb");
    return gltf.nodes.Icoplant.geometry;
  }, []);

  useFrame(() => {
    uniforms.time.value = clock.getElapsedTime();
  });

  return (
    <mesh
      position={props.position}
      ref={meshRef}
      geometry={geometry}
      material={leavesMaterial}
      scale={0.3}
    />
  );
}