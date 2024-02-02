import React, { useRef, useMemo, useEffect, useState } from "react";
import { useFrame, useThree, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import vertexShader from "./sway/vertex.glsl";
import fragmentShader from "./sway/fragment.glsl";

const hexToVec3 = (hex) => {
  hex = hex.replace(/^#/, "");
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);
  return [+(r / 255).toFixed(2), +(g / 255).toFixed(2), +(b / 255).toFixed(2)];
};

export default function GroundFoliage(props) {
  const meshRefDense = useRef();
  const meshRefSparse = useRef();
  const bushesMeshRef = useRef();
  const { clock } = useThree();

  const baseColor = hexToVec3("#69FF80");
  const bushesBaseColor = hexToVec3("#8CD15C");

  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      baseColor: { value: baseColor },
      multiplier: { value: 0.875 },
    }),
    []
  );

  const uniformsBushes = useMemo(
    () => ({
      time: { value: 0 },
      baseColor: { value: bushesBaseColor },
      multiplier: { value: 0.875 },
    }),
    []
  );

  const leavesMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms,
        side: THREE.DoubleSide,
      }),
    [uniforms]
  );

  const bushesMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: uniformsBushes,
        side: THREE.DoubleSide,
      }),
    [uniformsBushes]
  );

  const geometry = useMemo(() => {
    const gltf2 = useLoader(GLTFLoader, "/grass2.glb");
    const geo = gltf2.nodes.Grass.geometry;
    return geo;
  }, []);

  const bushesGeometry = useMemo(() => {
    const gltf = useLoader(GLTFLoader, "/bush2.glb");
    return gltf.nodes.TropicalTree.geometry;
  }, []);

  const initInstances = (meshRef, instanceNumber, ovalRadiusMultiplier) => {
    const dummy = new THREE.Object3D();
    const ovalRadiusX = 16 * ovalRadiusMultiplier;
    const ovalRadiusZ = 12 * ovalRadiusMultiplier;

    for (let i = 0; i < instanceNumber; i++) {
      const angle = Math.random() * Math.PI * 2; // Random angle
      const radiusValue = Math.sqrt(Math.random()); // Uniformly distributed radius
      const x = Math.cos(angle) * ovalRadiusX * radiusValue;
      const z = Math.sin(angle) * ovalRadiusZ * radiusValue;

      dummy.position.set(x, 0, z);
      dummy.scale.setScalar(0.5 + Math.random() * 0.5);
      dummy.rotation.y = Math.random() * Math.PI;
      dummy.position.y = Math.random() * 0.3;

      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  };

  useEffect(() => {
    initInstances(meshRefDense, 5000, 1); // Dense grass
    initInstances(meshRefSparse, 1000, 1.1);
    initInstances(bushesMeshRef, 100, 1.15);
  }, []);

  useFrame(() => {
    uniforms.time.value = clock.getElapsedTime();
    uniformsBushes.time.value = clock.getElapsedTime();
  });

  return (
    <>
      <instancedMesh
        position={[
          props.position[0],
          props.position[1] + 1.0,
          props.position[2],
        ]}
        rotation-x={Math.PI}
        rotation-y={Math.PI}
        ref={meshRefDense}
        args={[geometry, leavesMaterial, 5000]}
      />
      <instancedMesh
        position={[
          props.position[0],
          props.position[1] + 1.0,
          props.position[2],
        ]}
        rotation-x={Math.PI}
        rotation-y={Math.PI}
        ref={meshRefSparse}
        args={[geometry, leavesMaterial, 1000]}
      />
      <instancedMesh
        position={[
          props.position[0],
          props.position[1] + 0.4,
          props.position[2],
        ]}
        ref={bushesMeshRef}
        args={[bushesGeometry, bushesMaterial, 100]}
      />
    </>
  );
}
