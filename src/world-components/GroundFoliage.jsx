import React, { useRef, useMemo } from "react";
import { useFrame, useThree, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import vertexShader from "./sway/vertex.glsl";
import fragmentShader from "./sway/fragment.glsl";

const hexToVec3 = (hex) => {
  hex = hex.replace(/^#/, "");
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);
  return [+(r / 255).toFixed(2), +(g / 255).toFixed(2), +(b / 255).toFixed(2)];
};

export default function GroundFoliage(props) {
  const bushesMeshRef = useRef();
  const { clock } = useThree();

  const bushesBaseColor = hexToVec3("#8CD15C");
  const texture = useLoader(
    THREE.TextureLoader,
    "/textures/grass/blade_diffuse.jpg"
  );

  const uniformsBushes = useMemo(
    () => ({
      time: { value: 0 },
      baseColor: { value: bushesBaseColor },
      multiplier: { value: 0.875 },
      map: { value: texture },
      useTexture: { value: true },
    }),
    []
  );

  const bushesMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: uniformsBushes,
        side: THREE.DoubleSide,
      }),
    [uniformsBushes]
  );

  const bushesGeometry = useMemo(() => {
    const gltf = useLoader(GLTFLoader, "/bush3.glb");
    const geo = gltf.nodes.TropicalTree.geometry;
    geo.rotateY(-Math.PI / 4);
    return geo;
  }, []);

  useFrame(() => {
    uniformsBushes.time.value = clock.getElapsedTime();
  });

  return (
    <mesh
      castShadow
      position={props.position}
      ref={bushesMeshRef}
      geometry={bushesGeometry}
      material={bushesMaterial}
    />
  );
}
