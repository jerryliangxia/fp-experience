import React, { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import vertexShader from "./sway/vertex.glsl";
import fragmentShader from "./sway/fragment.glsl";

export default function GroundFoliage(props) {
  const meshRefDense = useRef();
  const meshRefSparse = useRef();
  const bushesMeshRef = useRef();
  const { clock } = useThree();

  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      baseColor: { value: props.baseColor },
      multiplier: { value: 0.875 },
    }),
    [props.baseColor]
  );

  const uniformsBushes = useMemo(
    () => ({
      time: { value: 0 },
      baseColor: { value: props.bushesBaseColor },
      multiplier: { value: 0.875 },
    }),
    [props.bushesBaseColor]
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
    const geo = new THREE.PlaneGeometry(0.1, 1, 1, 4);
    geo.translate(0, 0.5, 0);
    return geo;
  }, []);

  const bushesGeometry = useMemo(() => {
    const gltf = useLoader(GLTFLoader, "/tree.glb");
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

      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  };

  useEffect(() => {
    initInstances(meshRefDense, 5000, 1); // Dense grass
    initInstances(meshRefSparse, 1000, 1.1);
    initInstances(bushesMeshRef, 100, 1.15);
  }, [props.baseColor, props.bushesBaseColor]);

  useFrame(() => {
    uniforms.time.value = clock.getElapsedTime();
    uniformsBushes.time.value = clock.getElapsedTime();
  });

  return (
    <>
      <instancedMesh
        position={props.position}
        ref={meshRefDense}
        args={[geometry, leavesMaterial, 5000]}
      />
      <instancedMesh
        position={props.position}
        ref={meshRefSparse}
        args={[geometry, leavesMaterial, 1000]}
      />
      <instancedMesh
        position={props.position}
        ref={bushesMeshRef}
        args={[bushesGeometry, bushesMaterial, 100]}
      />
    </>
  );
}
