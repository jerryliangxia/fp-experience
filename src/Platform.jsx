/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props) {
  const { nodes, materials } = useGLTF("models/dreamscene.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Plane.geometry}
        material={materials.Ocean}
        position={[0, -0.44, -23.938]}
        scale={114.693}
      />
      <mesh
        geometry={nodes.Cube001.geometry}
        material={materials.Grass}
        position={[0, -0.44, -121.709]}
        scale={[18.295, 12.421, 12.421]}
      />
      <mesh
        geometry={nodes.Plane001.geometry}
        material={materials.Grass}
        position={[0, -0.44, -0.803]}
        scale={21.027}
      />
    </group>
  );
}

useGLTF.preload("/dreamscene.glb");
