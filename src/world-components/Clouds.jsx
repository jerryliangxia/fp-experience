import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Clouds, Cloud } from "@react-three/drei";
import { useControls } from "leva";

export default function App() {
  return (
    <>
      <Sky />
      {/* <ambientLight intensity={Math.PI / 1.5} /> */}
      {/* <spotLight
        position={[0, 40, 0]}
        decay={0}
        distance={45}
        penumbra={1}
        intensity={100}
      />
      <spotLight
        position={[-20, 0, 10]}
        color="red"
        angle={0.15}
        decay={0}
        penumbra={-1}
        intensity={30}
      />
      <spotLight
        position={[20, -10, 10]}
        color="red"
        angle={0.2}
        decay={0}
        penumbra={-1}
        intensity={20}
      /> */}
    </>
  );
}

function Sky() {
  const ref = useRef();
  const cloud0 = useRef();
  const { color, x, y, z, range, ...config } = useControls({
    seed: { value: 1, min: 1, max: 100, step: 1 },
    segments: { value: 20, min: 1, max: 80, step: 1 }, // Keep as is for detail
    volume: { value: 6, min: 0, max: 100, step: 0.1 }, // Volume can stay to maintain cloud thickness
    opacity: { value: 0.5, min: 0, max: 1, step: 0.01 }, // Adjusted for slight transparency
    fade: { value: 400, min: 0, max: 400, step: 1 }, // Increased to ensure clouds fade out at a greater distance
    growth: { value: 1, min: 0, max: 20, step: 1 }, // Keep as is, adjust based on visual preference
    speed: { value: 0.001, min: 0, max: 1, step: 0.001 }, // Slowed down significantly
    x: { value: 1000, min: -1000, max: 1000, step: 10 }, // Adjusted for a wider range
    y: { value: 500, min: 100, max: 1000, step: 10 }, // Adjusted for higher placement
    z: { value: 1000, min: -1000, max: 1000, step: 10 }, // Adjusted for a wider range
    color: "white",
  });
  useFrame((state, delta) => {
    ref.current.rotation.y = Math.cos(state.clock.elapsedTime / 2) / 2000;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime / 2) / 2000;
    cloud0.current.rotation.y -= delta / 1000;
  });
  return (
    <>
      <group ref={ref}>
        <Clouds material={THREE.MeshLambertMaterial} limit={400} range={range}>
          <Cloud ref={cloud0} {...config} bounds={[x, y, z]} color={color} />
          <Cloud
            {...config}
            bounds={[x, y, z]}
            color="#ffffff"
            seed={2}
            position={[15, 0, 0]}
          />
          <Cloud
            {...config}
            bounds={[x, y, z]}
            color="#ffffff"
            seed={3}
            position={[-15, 0, 0]}
          />
          <Cloud
            {...config}
            bounds={[x, y, z]}
            color="#ffffff"
            seed={4}
            position={[0, 0, -12]}
          />
          <Cloud
            {...config}
            bounds={[x, y, z]}
            color="#ffffff"
            seed={5}
            position={[0, 0, 12]}
          />
          <Cloud
            concentrate="outside"
            growth={100}
            color="#ffffff"
            opacity={1.25}
            seed={0.3}
            bounds={200}
            volume={200}
          />
        </Clouds>
      </group>
    </>
  );
}
