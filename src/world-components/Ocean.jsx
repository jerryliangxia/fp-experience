import { extend, useThree, useLoader, useFrame } from "@react-three/fiber";
import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { Water } from "three-stdlib";

extend({ Water });

function OceanPlane() {
  const ref = useRef();
  const gl = useThree((state) => state.gl);
  const waterNormals = useLoader(THREE.TextureLoader, "img/waternormals.jpeg");
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
  const geom = useMemo(() => new THREE.PlaneGeometry(10000, 10000), []);
  const config = useMemo(
    () => ({
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x35c7d2,
      distortionScale: 3.7,
      transparent: true,
      format: gl.encoding,
    }),
    [waterNormals]
  );
  useFrame(
    (_, delta) => (ref.current.material.uniforms.time.value += delta / 10)
  );
  return (
    <water
      ref={ref}
      args={[geom, config]}
      rotation-x={-Math.PI / 2}
      position-y={-0.2}
    />
  );
}

export default function Ocean() {
  return <OceanPlane />;
}
