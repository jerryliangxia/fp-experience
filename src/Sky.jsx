import skyVertexShader from "./sky/vertex.glsl";
import skyFragmentShader from "./sky/fragment.glsl";
import { useRef } from "react";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { extend, useFrame } from "@react-three/fiber";

const Sky = () => {
  const SkyMaterial = shaderMaterial(
    {
      uTexture: new THREE.TextureLoader().load("img/daysky.jpg"),
    },
    skyVertexShader,
    skyFragmentShader
  );
  extend({ SkyMaterial });

  const skyMaterial = useRef();
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta / 500;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1000, 256, 256]} />
      <skyMaterial ref={skyMaterial} side={THREE.BackSide} />
    </mesh>
  );
};

export default Sky;
