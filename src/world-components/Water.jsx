import React, { useRef, Suspense } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { Water } from "three/addons/objects/Water2.js";

function Ground() {
  const texture = useTexture("img/hardwood2_diffuse.jpg");
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = 16;
  texture.repeat.set(4, 4);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial map={texture} roughness={0.8} metalness={0.4} />
    </mesh>
  );
}

function WaterSurface({ color, scale, flowX, flowY }) {
  const waterGeometry = new THREE.PlaneGeometry(1000, 1000);
  const water = new Water(waterGeometry, {
    color: color,
    scale: scale,
    flowDirection: new THREE.Vector2(flowX, flowY),
    textureWidth: 512,
    textureHeight: 512,
  });

  return (
    <primitive
      object={water}
      position={[0, 0, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
    />
  );
}

function Scene() {
  const params = {
    color: 0x35c7d2,
    scale: 4,
    flowX: 1,
    flowY: 1,
  };

  return (
    <>
      <Suspense fallback={null}>
        {/* <Ground /> */}
        <WaterSurface {...params} />
      </Suspense>
    </>
  );
}

export default function App() {
  return <Scene />;
}
