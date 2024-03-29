import * as THREE from "three";
import React from "react";
import { useGLTF } from "@react-three/drei";

const textureLoader = new THREE.TextureLoader();

const aoTexture = textureLoader.load("/textures/tree/ao.jpg");
const roughnessTexture = textureLoader.load("/textures/tree/roughness.jpg");
const normalTexture = textureLoader.load("/textures/tree/normal.jpg");

const treeMaterial = new THREE.MeshPhysicalMaterial({
  color: "#261311",
});
treeMaterial.normalMap = normalTexture;
treeMaterial.aoMap = aoTexture;
treeMaterial.roughnessMap = roughnessTexture;
treeMaterial.iridescence = 0.3;
treeMaterial.iridescenceIOR = 1.0;
treeMaterial.iridescenceThicknessRange = [100, 500];

function Trees() {
  const { nodes } = useGLTF("/models/trees.glb");
  return (
    <group dispose={null}>
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

export default React.memo(Trees);
