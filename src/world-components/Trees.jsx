import * as THREE from "three";
import React from "react";
import { useGLTF } from "@react-three/drei";

export default function Trees(props) {
  const textureLoader = new THREE.TextureLoader();

  const colorTexture = textureLoader.load("/textures/tree/basecolor.jpg");
  colorTexture.colorSpace = THREE.SRGBColorSpace;
  const aoTexture = textureLoader.load("/textures/tree/ao.jpg");
  const roughnessTexture = textureLoader.load("/textures/tree/roughness.jpg");
  const normalTexture = textureLoader.load("/textures/tree/normal.jpg");

  const treeMaterial = new THREE.MeshPhysicalMaterial({
    color: "#472420",
  });
  treeMaterial.map = colorTexture;
  treeMaterial.normalMap = normalTexture;
  treeMaterial.aoMap = aoTexture;
  treeMaterial.roughnessMap = roughnessTexture;
  treeMaterial.iridescence = 0.3;
  treeMaterial.iridescenceIOR = 1.0;
  treeMaterial.iridescenceThicknessRange = [100, 500];

  const { nodes } = useGLTF("/trees.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.TropicalTree.geometry}
        material={treeMaterial}
        position={[-7.151, 2.461, 5.939]}
        rotation={[0, -0.863, 0]}
        scale={[0.941, 2.167, 0.941]}
      />
      <mesh
        geometry={nodes.TropicalTree001.geometry}
        material={treeMaterial}
        position={[-11.184, 1.811, 7.569]}
        rotation={[0, 0.258, 0]}
        scale={[0.941, 1.627, 0.941]}
      />
    </group>
  );
}
