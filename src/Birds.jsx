import * as THREE from "three";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// This component was auto-generated from GLTF by: https://github.com/react-spring/gltfjsx
function Bird({ speed, factor, url, ...props }) {
  const { nodes, materials, animations } = useLoader(GLTFLoader, url);
  const group = useRef();
  const mesh = useRef();
  const [start] = useState(() => Math.random() * 5000);
  const [mixer] = useState(() => new THREE.AnimationMixer());
  useEffect(
    () => void mixer.clipAction(animations[0], group.current).play(),
    []
  );
  useFrame((state, delta) => {
    mesh.current.position.y = Math.sin(start + state.clock.elapsedTime) * 5;
    mesh.current.rotation.x =
      Math.PI / 2 + (Math.sin(start + state.clock.elapsedTime) * Math.PI) / 10;
    mesh.current.rotation.y =
      (Math.sin(start + state.clock.elapsedTime) * Math.PI) / 2;
    group.current.rotation.y +=
      Math.sin((delta * factor) / 2) * Math.cos((delta * factor) / 2) * 1.5;
    mixer.update(delta * speed);
  });
  return (
    <group ref={group} dispose={null}>
      <scene name="Scene" {...props}>
        <mesh
          ref={mesh}
          scale={1.5}
          name="Mesh_0"
          morphTargetDictionary={nodes.Mesh_0.morphTargetDictionary}
          morphTargetInfluences={nodes.Mesh_0.morphTargetInfluences}
          rotation={[Math.PI / 2, 0, 0]}
          geometry={nodes.Mesh_0.geometry}
          material={materials.Black}
        />
      </scene>
    </group>
  );
}

function Birds() {
  return new Array(20).fill().map((_, i) => {
    const x = (400 + Math.random() * 30) * (Math.round(Math.random()) ? -1 : 1);
    const y = 100 + Math.random() * 50;
    const z = -50 + Math.random() * 10;
    const speed = 0.1 / 100;
    const factor = Math.random() * 0.1;

    return (
      <Bird
        key={i}
        position={[x, y, z]}
        rotation={[0, x > 0 ? Math.PI : 0, 0]}
        speed={speed}
        factor={factor}
        url="/models/bird.glb"
      />
    );
  });
}

function CirclingBirds() {
  return (
    <Suspense fallback={null}>
      <Birds />
    </Suspense>
  );
}

export default React.memo(CirclingBirds);
