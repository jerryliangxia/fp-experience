import React, { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import vertexShader from "./sway/vertex.glsl";
import fragmentShader from "./sway/fragment.glsl";

export default function Tree(props) {
  const meshRef = useRef();
  const { clock } = useThree();

  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      baseColor: { value: props.baseColor },
      multiplier: { value: 0.875 },
    }),
    [props.baseColor]
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

  const geometry = useMemo(() => {
    const gltf = useLoader(GLTFLoader, "/tree.glb");
    return gltf.nodes.TropicalTree.geometry;
  }, []);

  useEffect(() => {
    const instanceNumber = 100;
    const dummy = new THREE.Object3D();
    const ovalRadiusX = 16 * 1.15; // The x radius of the oval
    const ovalRadiusZ = 12 * 1.1; // The z radius of the oval

    for (let i = 0; i < instanceNumber; i++) {
      const angle = Math.random() * Math.PI * 2; // Random angle
      const radiusValue = Math.sqrt(Math.random()); // Uniformly distributed radius
      const x = Math.cos(angle) * ovalRadiusX * radiusValue;
      const z = Math.sin(angle) * ovalRadiusZ * radiusValue;

      dummy.position.set(x, 0, z);
      dummy.scale.setScalar(0.5 + Math.random() * 0.5);
      dummy.rotation.y = Math.random() * Math.PI;

      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [props.dense, props.baseColor]);

  useFrame(() => {
    uniforms.time.value = clock.getElapsedTime();
  });

  return (
    <instancedMesh
      position={props.position}
      ref={meshRef}
      args={[geometry, leavesMaterial, 100]}
    />
  );
}
