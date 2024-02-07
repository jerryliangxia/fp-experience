import * as THREE from "three";
import React from "react";
import { useGLTF } from "@react-three/drei";

function Beach() {
  const textureLoader = new THREE.TextureLoader();

  // Sand
  const sandNormalTexture = textureLoader.load("/textures/sand/sand.png");
  sandNormalTexture.wrapS = THREE.RepeatWrapping;
  sandNormalTexture.wrapT = THREE.RepeatWrapping;
  sandNormalTexture.repeat.x = 5;
  sandNormalTexture.repeat.y = 5;

  // Alpha
  const alphaTexture = textureLoader.load("/textures/sand/sandao.png");

  const sandMaterial = new THREE.MeshPhysicalMaterial({ color: "#C2B280" });
  sandMaterial.normalMap = sandNormalTexture;
  sandMaterial.normalScale.set(1.0, 1.0);
  sandMaterial.iridescence = 0.5;
  sandMaterial.iridescenceIOR = 1.0;
  sandMaterial.iridescenceThicknessRange = [100, 800];
  sandMaterial.transparent = true;
  sandMaterial.alphaMap = alphaTexture;

  const { nodes } = useGLTF("/beach.glb");

  return (
    <group dispose={null}>
      <mesh
        geometry={nodes.Beach.geometry}
        material={sandMaterial}
        position={[35.546, 0.1, 27.64]}
        scale={[215.33, 215.33, 143.972]}
      />
    </group>
  );
}

export default React.memo(Beach);
