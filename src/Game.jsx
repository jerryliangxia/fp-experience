import { useGLTF, Environment } from "@react-three/drei";
import { useLoader, useFrame } from "@react-three/fiber";
import useOctree from "./useOctree";
import Player from "./Player";
import { useRef } from "react";
import useOctreeHelper from "./useOctreeHelper";
import Model from "./world-components/Platform";
import Ocean from "./world-components/Ocean";
import Clouds from "./world-components/Clouds";
import GroundFoliage from "./world-components/GroundFoliage";
import TreeLeaves from "./world-components/TreeLeaves";
import Icoplant from "./world-components/Icoplant";
import * as THREE from "three";

const hexToVec3 = (hex) => {
  hex = hex.replace(/^#/, "");
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);
  return [+(r / 255).toFixed(2), +(g / 255).toFixed(2), +(b / 255).toFixed(2)];
};

export default function Game() {
  const { nodes, scene } = useGLTF("/octree.glb");
  const octree = useOctree(scene);
  useOctreeHelper(octree);
  const planet = useLoader(THREE.TextureLoader, "/img/planet.png");
  const planet2 = useLoader(THREE.TextureLoader, "/img/planet2.png");
  const planet3 = useLoader(THREE.TextureLoader, "/img/planet3.png");
  const simpleShadow = useLoader(THREE.TextureLoader, "/img/simpleShadow.png");
  const diamond = useLoader(THREE.TextureLoader, "/img/diamond.png");
  const planeRef = useRef();

  // Rotate the mesh in the Z direction
  useFrame((state, delta) => {
    if (planeRef.current) {
      const rotationSpeed = (2 * Math.PI) / 6; // Defines the speed of rotation
      planeRef.current.rotation.z += (rotationSpeed * delta) / 300; // Adjusts the rotation in the Z direction
    }
  });

  return (
    <>
      <directionalLight intensity={1} position={[85.0, 80.0, 70.0]} />
      <Environment files="/img/rustig_koppie_puresky_1k.hdr" background />
      <GroundFoliage
        position={[0, 0, 13.5]}
        baseColor={hexToVec3("#69FF80")}
        bushesBaseColor={hexToVec3("#8CD15C")}
      />
      <Icoplant
        position={[-8.932, 0.35, 9.17]}
        baseColor={hexToVec3("#9670FF")}
        rando={1.0}
      />
      <Icoplant
        position={[-7.39, 0.381, 8.278]}
        baseColor={hexToVec3("#52C7FF")}
        rando={2.0}
      />
      <TreeLeaves
        position={[-11.184, -0.7, 7.569]}
        baseColor={hexToVec3("#8CD15C")}
      />
      <TreeLeaves
        position={[-7.151, 0.6, 5.939]}
        baseColor={hexToVec3("#8CD15C")}
      />
      <Ocean />
      <Clouds position-z={-300} position-y={-5} scale={10} />
      <Model />
      <Player octree={octree} />
      {/* Big one */}
      <mesh
        ref={planeRef}
        position={[-400, 40, -700]}
        rotation-y={Math.PI / 5}
        rotation-z={Math.PI / 1.6}
      >
        <planeGeometry args={[1000, 1000]} />
        <meshBasicMaterial transparent opacity={0.5} alphaMap={planet} />
      </mesh>
      {/* Middle one */}
      <mesh
        position={[-600, 500, -100]}
        rotation-y={Math.PI / 0.41}
        rotation-x={Math.PI / 2.5}
        rotation-z={Math.PI / 2}
      >
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial transparent opacity={0.8} alphaMap={planet3} />
      </mesh>
      {/* Small ones */}
      <mesh position={[-600, 200, 600]} rotation-y={Math.PI / 1.5}>
        <planeGeometry args={[60, 60]} />
        <meshBasicMaterial transparent opacity={1.0} alphaMap={planet2} />
      </mesh>
      <mesh position={[-100, 200, 600]} rotation-y={Math.PI / 1}>
        <planeGeometry args={[40, 40]} />
        <meshBasicMaterial transparent opacity={1.0} alphaMap={planet2} />
      </mesh>
      <mesh
        position={[400, 600, -700]}
        rotation-y={-Math.PI / 6}
        rotation-z={Math.PI / 1}
      >
        <planeGeometry args={[50, 50]} />
        <meshBasicMaterial transparent opacity={0.8} alphaMap={planet2} />
      </mesh>
      <mesh
        position={[400, 400, -100]}
        rotation-y={-Math.PI / 3}
        rotation-x={Math.PI / 2}
        rotation-z={Math.PI / 0.8}
      >
        <planeGeometry args={[50, 50]} />
        <meshBasicMaterial transparent opacity={0.8} alphaMap={planet2} />
      </mesh>
    </>
  );
}
