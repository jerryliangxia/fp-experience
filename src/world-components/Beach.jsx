import * as THREE from "three";
import React, { useContext } from "react";
import { useGLTF } from "@react-three/drei";
import { GameContext } from "../GameContext";

const textureLoader = new THREE.TextureLoader();

// Sand
const sandNormalTexture = textureLoader.load("/textures/sand/normal.png");
sandNormalTexture.wrapS = THREE.RepeatWrapping;
sandNormalTexture.wrapT = THREE.RepeatWrapping;
sandNormalTexture.repeat.x = 5;
sandNormalTexture.repeat.y = 5;
sandNormalTexture.magFilter = THREE.NearestFilter;

// Alpha
const alphaTexture = textureLoader.load("/textures/sand/alpha.png");

const sandMaterial = new THREE.MeshPhysicalMaterial({ color: "#C2B280" });
sandMaterial.normalMap = sandNormalTexture;
sandMaterial.normalScale.set(1.0, 1.0);
sandMaterial.iridescence = 0.5;
sandMaterial.iridescenceIOR = 1.0;
sandMaterial.iridescenceThicknessRange = [100, 800];
sandMaterial.transparent = true;
sandMaterial.alphaMap = alphaTexture;

const sandNormalTexture2 = textureLoader.load(
  "/textures/sand/alien-normal.jpeg"
);
sandNormalTexture2.wrapS = THREE.RepeatWrapping;
sandNormalTexture2.wrapT = THREE.RepeatWrapping;
sandNormalTexture2.repeat.x = 4.5;
sandNormalTexture2.repeat.y = 4.5;
sandNormalTexture2.generateMipmaps = true;
sandNormalTexture2.minFilter = THREE.LinearMipmapLinearFilter;

const sandMaterial2 = new THREE.MeshPhysicalMaterial({ color: "#3D3EAE" });
sandMaterial2.normalMap = sandNormalTexture2;
sandMaterial2.normalScale.set(0.5, 0.5);
sandMaterial2.iridescence = 0.25;
sandMaterial2.iridescenceIOR = 1.0;
sandMaterial2.iridescenceThicknessRange = [100, 800];
sandMaterial2.transparent = true;
sandMaterial2.alphaMap = alphaTexture;

function Beach() {
  const { visibleSequences } = useContext(GameContext);

  const { nodes } = useGLTF("/models/beach.glb");

  return (
    <group dispose={null}>
      <mesh
        geometry={nodes.Beach.geometry}
        material={sandMaterial}
        position={[35.546, visibleSequences > 1 ? 1.0 : 0.2, 27.64]}
        scale={[215.33, 215.33, 143.972]}
      />
      <mesh
        geometry={nodes.Beach001.geometry}
        material={sandMaterial2}
        position={[265.546, 0, -200.64]}
        scale={[4115.33, 215.33, 1943.972]}
      />
    </group>
  );
}

export default React.memo(Beach);
