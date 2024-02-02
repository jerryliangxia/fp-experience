import React, { useRef } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Planets() {
  const planet = useLoader(THREE.TextureLoader, "/img/planet.png");
  const planet2 = useLoader(THREE.TextureLoader, "/img/planet2.png");
  const planet3 = useLoader(THREE.TextureLoader, "/img/planet3.png");
  const planeRef = useRef();

  useFrame((state, delta) => {
    if (planeRef.current) {
      const rotationSpeed = (2 * Math.PI) / 6; // Defines the speed of rotation
      planeRef.current.rotation.z += (rotationSpeed * delta) / 220; // Adjusts the rotation in the Z direction
    }
  });

  return (
    <>
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
