/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useContext } from "react";
import { GameContext } from "../GameContext";

function LoadedPlatforms() {
  const { nodes, materials } = useGLTF("/1.glb");
  const { visibleSequences } = useContext(GameContext);

  return (
    <group dispose={null}>
      {visibleSequences >= 1 && (
        <>
          <group
            position={[18.14, 0.651, 35.252]}
            scale={[1.948, 0.196, 1.948]}
            userData={{ name: "Platform.001" }}
          >
            <mesh
              geometry={nodes.Cube013.geometry}
              material={materials.LightBridge}
            />
            <mesh
              geometry={nodes.Cube013_1.geometry}
              material={materials["Future Grey 1"]}
            />
            <mesh
              geometry={nodes.Cube013_2.geometry}
              material={materials["Future Grey 2"]}
            />
            <mesh
              geometry={nodes.Cube013_3.geometry}
              material={materials["Future Grey 4"]}
            />
          </group>
          <group
            position={[18.14, 1.293, 42.219]}
            scale={[1.948, 0.196, 1.948]}
            userData={{ name: "Platform.002" }}
          >
            <mesh
              geometry={nodes.Cube014.geometry}
              material={materials.LightBridge}
            />
            <mesh
              geometry={nodes.Cube014_1.geometry}
              material={materials["Future Grey 1"]}
            />
            <mesh
              geometry={nodes.Cube014_2.geometry}
              material={materials["Future Grey 2"]}
            />
            <mesh
              geometry={nodes.Cube014_3.geometry}
              material={materials["Future Grey 4"]}
            />
          </group>
          <group
            position={[16.19, 1.941, 49.222]}
            rotation={[-Math.PI, 0, 0]}
            scale={[-1.948, -0.196, -1.948]}
            userData={{ name: "3_4Platform.001" }}
          >
            <mesh
              geometry={nodes.Cube019.geometry}
              material={materials.LightBridge}
            />
            <mesh
              geometry={nodes.Cube019_1.geometry}
              material={materials["Future Grey 1"]}
            />
            <mesh
              geometry={nodes.Cube019_2.geometry}
              material={materials["Future Grey 2"]}
            />
            <mesh
              geometry={nodes.Cube019_3.geometry}
              material={materials["Future Grey 4"]}
            />
          </group>
          <group
            position={[7.198, 2.813, 53.106]}
            scale={[1.948, 0.196, 1.948]}
            userData={{ name: "Platform.004" }}
          >
            <mesh
              geometry={nodes.Cube016.geometry}
              material={materials.LightBridge}
            />
            <mesh
              geometry={nodes.Cube016_1.geometry}
              material={materials["Future Grey 1"]}
            />
            <mesh
              geometry={nodes.Cube016_2.geometry}
              material={materials["Future Grey 2"]}
            />
            <mesh
              geometry={nodes.Cube016_3.geometry}
              material={materials["Future Grey 4"]}
            />
          </group>
          <group
            position={[-1.75, 3.255, 53.106]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[1.948, 0.196, 1.948]}
            userData={{ name: "LongPlatformBig.001" }}
          >
            <mesh
              geometry={nodes.Cube018.geometry}
              material={materials.LightBridge}
            />
            <mesh
              geometry={nodes.Cube018_1.geometry}
              material={materials["Future Grey 1"]}
            />
            <mesh
              geometry={nodes.Cube018_2.geometry}
              material={materials["Future Grey 2"]}
            />
            <mesh
              geometry={nodes.Cube018_3.geometry}
              material={materials["Future Grey 4"]}
            />
          </group>
          <group
            position={[-3.671, 3.249, 48.211]}
            scale={[1.948, 0.196, 1.948]}
            userData={{ name: "BouncyPlatform" }}
          >
            <mesh
              geometry={nodes.Cube001.geometry}
              material={materials.BouncyBridge}
            />
            <mesh
              geometry={nodes.Cube001_1.geometry}
              material={materials["Bouncy 1"]}
            />
            <mesh
              geometry={nodes.Cube001_2.geometry}
              material={materials["Bouncy 2"]}
            />
            <mesh
              geometry={nodes.Cube001_3.geometry}
              material={materials["Bouncy 4"]}
            />
          </group>
          <group
            position={[-5.619, 17.368, 37.448]}
            scale={[1.948, 0.196, 1.948]}
            userData={{ name: "BouncyPlatform.001" }}
          >
            <mesh
              geometry={nodes.Cube002.geometry}
              material={materials.BouncyBridge}
            />
            <mesh
              geometry={nodes.Cube002_1.geometry}
              material={materials["Bouncy 1"]}
            />
            <mesh
              geometry={nodes.Cube002_2.geometry}
              material={materials["Bouncy 2"]}
            />
            <mesh
              geometry={nodes.Cube002_3.geometry}
              material={materials["Bouncy 4"]}
            />
          </group>
          <group
            position={[-11.965, 36.511, 37.019]}
            rotation={[Math.PI, 1.571, 0]}
            scale={[-1.948, -0.196, -1.948]}
            userData={{ name: "3_4Platform.003" }}
          >
            <mesh
              geometry={nodes.Cube015.geometry}
              material={materials.LightBridge}
            />
            <mesh
              geometry={nodes.Cube015_1.geometry}
              material={materials["Future Grey 1"]}
            />
            <mesh
              geometry={nodes.Cube015_2.geometry}
              material={materials["Future Grey 2"]}
            />
            <mesh
              geometry={nodes.Cube015_3.geometry}
              material={materials["Future Grey 4"]}
            />
          </group>
          <group
            position={[-22.755, 40.039, 38.72]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
            scale={[1.948, 0.196, 1.948]}
            userData={{ name: "BallPlatform" }}
          >
            <mesh
              geometry={nodes.Cube003.geometry}
              material={materials.LightBridgePink}
            />
            <mesh
              geometry={nodes.Cube003_1.geometry}
              material={materials["Future Grey 1"]}
            />
            <mesh
              geometry={nodes.Cube003_2.geometry}
              material={materials["Future Grey 2"]}
            />
            <mesh
              geometry={nodes.Cube003_3.geometry}
              material={materials["Future Grey 3"]}
            />
            <mesh
              geometry={nodes.Cube003_4.geometry}
              material={materials["Future Grey 4"]}
            />
          </group>
          <mesh
            geometry={nodes.HitThis.geometry}
            material={materials.LightBridgePink}
            position={[-22.755, 40.03, 38.721]}
            rotation={[0, Math.PI / 2, 0]}
            scale={0.387}
            userData={{ name: "HitThis" }}
          />
        </>
      )}
      {visibleSequences >= 2 && (
        <>
          <group
            position={[-15.911, 36.504, 30.341]}
            scale={[1.948, 0.196, 1.948]}
            userData={{ name: "BouncyPlatform.002" }}
          >
            <mesh
              geometry={nodes.Cube004.geometry}
              material={materials.BouncyBridge}
            />
            <mesh
              geometry={nodes.Cube004_1.geometry}
              material={materials["Bouncy 1"]}
            />
            <mesh
              geometry={nodes.Cube004_2.geometry}
              material={materials["Bouncy 2"]}
            />
            <mesh
              geometry={nodes.Cube004_3.geometry}
              material={materials["Bouncy 4"]}
            />
          </group>
          <group
            position={[-22.377, 36.992, 11.772]}
            rotation={[Math.PI, 0, Math.PI]}
            scale={[1.948, 0.196, 1.948]}
            userData={{ name: "LongPlatformBig.004" }}
          >
            <mesh
              geometry={nodes.Cube026.geometry}
              material={materials.LightBridge}
            />
            <mesh
              geometry={nodes.Cube026_1.geometry}
              material={materials["Future Grey 1"]}
            />
            <mesh
              geometry={nodes.Cube026_2.geometry}
              material={materials["Future Grey 2"]}
            />
            <mesh
              geometry={nodes.Cube026_3.geometry}
              material={materials["Future Grey 4"]}
            />
          </group>
          <group
            position={[-22.373, 37.732, 3.463]}
            scale={[1.948, 0.196, 1.948]}
            userData={{ name: "Platform.006" }}
          >
            <mesh
              geometry={nodes.Cube012.geometry}
              material={materials.LightBridge}
            />
            <mesh
              geometry={nodes.Cube012_1.geometry}
              material={materials["Future Grey 1"]}
            />
            <mesh
              geometry={nodes.Cube012_2.geometry}
              material={materials["Future Grey 2"]}
            />
            <mesh
              geometry={nodes.Cube012_3.geometry}
              material={materials["Future Grey 4"]}
            />
          </group>
          <group
            position={[-30.879, 38.174, 3.463]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[1.948, 0.196, 1.948]}
            userData={{ name: "LongPlatformBig.002" }}
          >
            <mesh
              geometry={nodes.Cube020.geometry}
              material={materials.LightBridge}
            />
            <mesh
              geometry={nodes.Cube020_1.geometry}
              material={materials["Future Grey 1"]}
            />
            <mesh
              geometry={nodes.Cube020_2.geometry}
              material={materials["Future Grey 2"]}
            />
            <mesh
              geometry={nodes.Cube020_3.geometry}
              material={materials["Future Grey 4"]}
            />
          </group>
          <group
            position={[-39.629, 38.56, 3.502]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[1.948, 0.196, 1.948]}
            userData={{ name: "Platform.005" }}
          >
            <mesh
              geometry={nodes.Cube009.geometry}
              material={materials.LightBridge}
            />
            <mesh
              geometry={nodes.Cube009_1.geometry}
              material={materials["Future Grey 1"]}
            />
            <mesh
              geometry={nodes.Cube009_2.geometry}
              material={materials["Future Grey 2"]}
            />
            <mesh
              geometry={nodes.Cube009_3.geometry}
              material={materials["Future Grey 4"]}
            />
          </group>
          <group
            position={[-46.31, 39.08, 3.502]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[1.948, 0.196, 1.948]}
            userData={{ name: "Platform.003" }}
          >
            <mesh
              geometry={nodes.Cube008.geometry}
              material={materials.LightBridge}
            />
            <mesh
              geometry={nodes.Cube008_1.geometry}
              material={materials["Future Grey 1"]}
            />
            <mesh
              geometry={nodes.Cube008_2.geometry}
              material={materials["Future Grey 2"]}
            />
            <mesh
              geometry={nodes.Cube008_3.geometry}
              material={materials["Future Grey 4"]}
            />
          </group>
          <group
            position={[-53.219, 39.77, 1.609]}
            rotation={[Math.PI, 1.571, 0]}
            scale={[-1.948, -0.196, -1.948]}
            userData={{ name: "3_4Platform.002" }}
          >
            <mesh
              geometry={nodes.Cube021.geometry}
              material={materials.LightBridge}
            />
            <mesh
              geometry={nodes.Cube021_1.geometry}
              material={materials["Future Grey 1"]}
            />
            <mesh
              geometry={nodes.Cube021_2.geometry}
              material={materials["Future Grey 2"]}
            />
            <mesh
              geometry={nodes.Cube021_3.geometry}
              material={materials["Future Grey 4"]}
            />
          </group>
          <group
            position={[-63.074, 39.775, -0.242]}
            scale={[1.948, 0.196, 1.948]}
            userData={{ name: "BouncyPlatform.005" }}
          >
            <mesh
              geometry={nodes.Cube022.geometry}
              material={materials.BouncyBridge}
            />
            <mesh
              geometry={nodes.Cube022_1.geometry}
              material={materials["Bouncy 1"]}
            />
            <mesh
              geometry={nodes.Cube022_2.geometry}
              material={materials["Bouncy 2"]}
            />
            <mesh
              geometry={nodes.Cube022_3.geometry}
              material={materials["Bouncy 4"]}
            />
          </group>
          <group
            position={[-55.74, 50.227, -14.578]}
            scale={[1.948, 0.196, 1.948]}
            userData={{ name: "BouncyPlatform.007" }}
          >
            <mesh
              geometry={nodes.Cube079.geometry}
              material={materials.BouncyBridge}
            />
            <mesh
              geometry={nodes.Cube079_1.geometry}
              material={materials["Bouncy 1"]}
            />
            <mesh
              geometry={nodes.Cube079_2.geometry}
              material={materials["Bouncy 2"]}
            />
            <mesh
              geometry={nodes.Cube079_3.geometry}
              material={materials["Bouncy 4"]}
            />
          </group>
          <group
            position={[-49.709, 60.996, -27.476]}
            scale={[1.948, 0.196, 1.948]}
            userData={{ name: "LongPlatformBig.003" }}
          >
            <mesh
              geometry={nodes.Cube025.geometry}
              material={materials.LightBridge}
            />
            <mesh
              geometry={nodes.Cube025_1.geometry}
              material={materials["Future Grey 1"]}
            />
            <mesh
              geometry={nodes.Cube025_2.geometry}
              material={materials["Future Grey 2"]}
            />
            <mesh
              geometry={nodes.Cube025_3.geometry}
              material={materials["Future Grey 4"]}
            />
          </group>
          <group
            position={[-34.44, 51.752, -29.407]}
            rotation={[0, -Math.PI / 2, 0]}
            scale={[1.948, 0.196, 1.948]}
            userData={{ name: "BouncyPlatform.003" }}
          >
            <mesh
              geometry={nodes.Cube042.geometry}
              material={materials.BouncyBridge}
            />
            <mesh
              geometry={nodes.Cube042_1.geometry}
              material={materials["Bouncy 1"]}
            />
            <mesh
              geometry={nodes.Cube042_2.geometry}
              material={materials["Bouncy 2"]}
            />
            <mesh
              geometry={nodes.Cube042_3.geometry}
              material={materials["Bouncy 4"]}
            />
          </group>
          <group
            position={[-13.062, 51.727, -27.485]}
            rotation={[Math.PI, 1.571, 0]}
            scale={[-1.948, -0.196, -1.948]}
            userData={{ name: "3_4Platform.004" }}
          >
            <mesh
              geometry={nodes.Cube035.geometry}
              material={materials.LightBridge}
            />
            <mesh
              geometry={nodes.Cube035_1.geometry}
              material={materials["Future Grey 1"]}
            />
            <mesh
              geometry={nodes.Cube035_2.geometry}
              material={materials["Future Grey 2"]}
            />
            <mesh
              geometry={nodes.Cube035_3.geometry}
              material={materials["Future Grey 4"]}
            />
          </group>
          <group
            position={[-4.53, 51.037, -25.592]}
            rotation={[0, 1.571, 0]}
            scale={[1.948, 0.196, 1.948]}
            userData={{ name: "Platform.008" }}
          >
            <mesh
              geometry={nodes.Cube031.geometry}
              material={materials.LightBridge}
            />
            <mesh
              geometry={nodes.Cube031_1.geometry}
              material={materials["Future Grey 1"]}
            />
            <mesh
              geometry={nodes.Cube031_2.geometry}
              material={materials["Future Grey 2"]}
            />
            <mesh
              geometry={nodes.Cube031_3.geometry}
              material={materials["Future Grey 4"]}
            />
          </group>
          <group
            position={[3.632, 50.518, -25.592]}
            rotation={[0, 1.571, 0]}
            scale={[1.948, 0.196, 1.948]}
            userData={{ name: "Platform.009" }}
          >
            <mesh
              geometry={nodes.Cube032.geometry}
              material={materials.LightBridge}
            />
            <mesh
              geometry={nodes.Cube032_1.geometry}
              material={materials["Future Grey 1"]}
            />
            <mesh
              geometry={nodes.Cube032_2.geometry}
              material={materials["Future Grey 2"]}
            />
            <mesh
              geometry={nodes.Cube032_3.geometry}
              material={materials["Future Grey 4"]}
            />
          </group>
          <group
            position={[11.542, 49.689, -25.632]}
            scale={[1.948, 0.196, 1.948]}
            userData={{ name: "Platform.010" }}
          >
            <mesh
              geometry={nodes.Cube033.geometry}
              material={materials.LightBridge}
            />
            <mesh
              geometry={nodes.Cube033_1.geometry}
              material={materials["Future Grey 1"]}
            />
            <mesh
              geometry={nodes.Cube033_2.geometry}
              material={materials["Future Grey 2"]}
            />
            <mesh
              geometry={nodes.Cube033_3.geometry}
              material={materials["Future Grey 4"]}
            />
          </group>
          <group
            position={[17.871, 48.315, -18.401]}
            scale={[1.948, 0.196, 1.948]}
            userData={{ name: "Platform.011" }}
          >
            <mesh
              geometry={nodes.Cube040.geometry}
              material={materials.LightBridge}
            />
            <mesh
              geometry={nodes.Cube040_1.geometry}
              material={materials["Future Grey 1"]}
            />
            <mesh
              geometry={nodes.Cube040_2.geometry}
              material={materials["Future Grey 2"]}
            />
            <mesh
              geometry={nodes.Cube040_3.geometry}
              material={materials["Future Grey 4"]}
            />
          </group>
          <group
            position={[26.736, 51.778, -18.378]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
            scale={[1.948, 0.196, 1.948]}
            userData={{ name: "BallPlatform.001" }}
          >
            <mesh
              geometry={nodes.Cube030.geometry}
              material={materials.LightBridgePink}
            />
            <mesh
              geometry={nodes.Cube030_1.geometry}
              material={materials["Future Grey 1"]}
            />
            <mesh
              geometry={nodes.Cube030_2.geometry}
              material={materials["Future Grey 2"]}
            />
            <mesh
              geometry={nodes.Cube030_3.geometry}
              material={materials["Future Grey 3"]}
            />
            <mesh
              geometry={nodes.Cube030_4.geometry}
              material={materials["Future Grey 4"]}
            />
          </group>
          <mesh
            geometry={nodes.HitThis001.geometry}
            material={materials.LightBridgePink}
            position={[26.736, 51.77, -18.377]}
            rotation={[0, Math.PI / 2, 0]}
            scale={0.387}
            userData={{ name: "HitThis.001" }}
          />
        </>
      )}
      {visibleSequences >= 3 && (
        <>
          <group
            position={[23.16, 48.268, -18.389]}
            rotation={[0, -Math.PI / 2, 0]}
            scale={[1.948, 0.196, 1.948]}
            userData={{ name: "BouncyPlatform.009" }}
          >
            <mesh
              geometry={nodes.Cube049.geometry}
              material={materials.BouncyBridge}
            />
            <mesh
              geometry={nodes.Cube049_1.geometry}
              material={materials["Bouncy 1"]}
            />
            <mesh
              geometry={nodes.Cube049_2.geometry}
              material={materials["Bouncy 2"]}
            />
            <mesh
              geometry={nodes.Cube049_3.geometry}
              material={materials["Bouncy 4"]}
            />
          </group>
          <group
            position={[30.298, 56.663, -18.389]}
            rotation={[0, -Math.PI / 2, 0]}
            scale={[1.948, 0.196, 1.948]}
            userData={{ name: "BouncyPlatform.010" }}
          >
            <mesh
              geometry={nodes.Cube051.geometry}
              material={materials.BouncyBridge}
            />
            <mesh
              geometry={nodes.Cube051_1.geometry}
              material={materials["Bouncy 1"]}
            />
            <mesh
              geometry={nodes.Cube051_2.geometry}
              material={materials["Bouncy 2"]}
            />
            <mesh
              geometry={nodes.Cube051_3.geometry}
              material={materials["Bouncy 4"]}
            />
          </group>
          <group
            position={[46.906, 52.238, -29.129]}
            rotation={[0, -Math.PI / 2, 0]}
            scale={[1.948, 0.196, 1.948]}
            userData={{ name: "BouncyPlatform.004" }}
          >
            <mesh
              geometry={nodes.Cube037.geometry}
              material={materials.BouncyBridge}
            />
            <mesh
              geometry={nodes.Cube037_1.geometry}
              material={materials["Bouncy 1"]}
            />
            <mesh
              geometry={nodes.Cube037_2.geometry}
              material={materials["Bouncy 2"]}
            />
            <mesh
              geometry={nodes.Cube037_3.geometry}
              material={materials["Bouncy 4"]}
            />
          </group>
          <group
            position={[55.8, 63.896, -19.875]}
            rotation={[0, -Math.PI / 2, 0]}
            scale={[1.948, 0.196, 1.948]}
            userData={{ name: "BouncyPlatform.006" }}
          >
            <mesh
              geometry={nodes.Cube053.geometry}
              material={materials.BouncyBridge}
            />
            <mesh
              geometry={nodes.Cube053_1.geometry}
              material={materials["Bouncy 1"]}
            />
            <mesh
              geometry={nodes.Cube053_2.geometry}
              material={materials["Bouncy 2"]}
            />
            <mesh
              geometry={nodes.Cube053_3.geometry}
              material={materials["Bouncy 4"]}
            />
          </group>
          <group
            position={[70.55, 75.9, -19.88]}
            rotation={[0, -Math.PI / 2, 0]}
            scale={[1.948, 0.196, 1.948]}
            userData={{ name: "LongPlatformBig.009" }}
          >
            <mesh
              geometry={nodes.Cube056.geometry}
              material={materials.LightBridge}
            />
            <mesh
              geometry={nodes.Cube056_1.geometry}
              material={materials["Future Grey 1"]}
            />
            <mesh
              geometry={nodes.Cube056_2.geometry}
              material={materials["Future Grey 2"]}
            />
            <mesh
              geometry={nodes.Cube056_3.geometry}
              material={materials["Future Grey 4"]}
            />
          </group>
          <group
            position={[80.409, 75.918, -13.002]}
            rotation={[0, -Math.PI / 2, 0]}
            scale={[1.948, 0.196, 1.948]}
            userData={{ name: "LongPlatformBig.008" }}
          >
            <mesh
              geometry={nodes.Cube055.geometry}
              material={materials.LightBridge}
            />
            <mesh
              geometry={nodes.Cube055_1.geometry}
              material={materials["Future Grey 1"]}
            />
            <mesh
              geometry={nodes.Cube055_2.geometry}
              material={materials["Future Grey 2"]}
            />
            <mesh
              geometry={nodes.Cube055_3.geometry}
              material={materials["Future Grey 4"]}
            />
          </group>
          <group
            position={[82.285, 75.873, -5.919]}
            rotation={[-Math.PI, 0, -Math.PI]}
            scale={[1.948, 0.196, 1.948]}
            userData={{ name: "BouncyPlatform.011" }}
          >
            <mesh
              geometry={nodes.Cube058.geometry}
              material={materials.BouncyBridge}
            />
            <mesh
              geometry={nodes.Cube058_1.geometry}
              material={materials["Bouncy 1"]}
            />
            <mesh
              geometry={nodes.Cube058_2.geometry}
              material={materials["Bouncy 2"]}
            />
            <mesh
              geometry={nodes.Cube058_3.geometry}
              material={materials["Bouncy 4"]}
            />
          </group>
          <group
            position={[80.363, 75.848, 15.459]}
            rotation={[0, 0, -Math.PI]}
            scale={[-1.948, -0.196, -1.948]}
            userData={{ name: "3_4Platform.006" }}
          >
            <mesh
              geometry={nodes.Cube057.geometry}
              material={materials.LightBridge}
            />
            <mesh
              geometry={nodes.Cube057_1.geometry}
              material={materials["Future Grey 1"]}
            />
            <mesh
              geometry={nodes.Cube057_2.geometry}
              material={materials["Future Grey 2"]}
            />
            <mesh
              geometry={nodes.Cube057_3.geometry}
              material={materials["Future Grey 4"]}
            />
          </group>
          <group
            position={[71.445, 80.205, 15.461]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
            scale={[1.948, 0.196, 1.948]}
            userData={{ name: "BallPlatform.002" }}
          >
            <mesh
              geometry={nodes.Cube059.geometry}
              material={materials.LightBridgePink}
            />
            <mesh
              geometry={nodes.Cube059_1.geometry}
              material={materials["Future Grey 1"]}
            />
            <mesh
              geometry={nodes.Cube059_2.geometry}
              material={materials["Future Grey 2"]}
            />
            <mesh
              geometry={nodes.Cube059_3.geometry}
              material={materials["Future Grey 3"]}
            />
            <mesh
              geometry={nodes.Cube059_4.geometry}
              material={materials["Future Grey 4"]}
            />
          </group>
          <mesh
            geometry={nodes.HitThis002.geometry}
            material={materials.LightBridgePink}
            position={[71.445, 80.196, 15.462]}
            rotation={[0, Math.PI / 2, 0]}
            scale={0.387}
            userData={{ name: "HitThis.002" }}
          />
        </>
      )}
      {visibleSequences >= 4 && (
        <>
          <group
            position={[73.173, 75.873, 11.552]}
            rotation={[-Math.PI, 0, -Math.PI]}
            scale={[1.948, 0.196, 1.948]}
            userData={{ name: "BouncyPlatform.008" }}
          >
            <mesh
              geometry={nodes.Cube060.geometry}
              material={materials.BouncyBridge}
            />
            <mesh
              geometry={nodes.Cube060_1.geometry}
              material={materials["Bouncy 1"]}
            />
            <mesh
              geometry={nodes.Cube060_2.geometry}
              material={materials["Bouncy 2"]}
            />
            <mesh
              geometry={nodes.Cube060_3.geometry}
              material={materials["Bouncy 4"]}
            />
          </group>
          <group
            position={[54.48, 75.869, 1.271]}
            scale={[1.948, 0.196, 1.948]}
            userData={{ name: "Platform.013" }}
          >
            <mesh
              geometry={nodes.Cube063.geometry}
              material={materials.LightBridge}
            />
            <mesh
              geometry={nodes.Cube063_1.geometry}
              material={materials["Future Grey 1"]}
            />
            <mesh
              geometry={nodes.Cube063_2.geometry}
              material={materials["Future Grey 2"]}
            />
            <mesh
              geometry={nodes.Cube063_3.geometry}
              material={materials["Future Grey 4"]}
            />
          </group>
          <group
            position={[47.941, 76.359, 1.311]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[1.948, 0.196, 1.948]}
            userData={{ name: "Platform.012" }}
          >
            <mesh
              geometry={nodes.Cube062.geometry}
              material={materials.LightBridge}
            />
            <mesh
              geometry={nodes.Cube062_1.geometry}
              material={materials["Future Grey 1"]}
            />
            <mesh
              geometry={nodes.Cube062_2.geometry}
              material={materials["Future Grey 2"]}
            />
            <mesh
              geometry={nodes.Cube062_3.geometry}
              material={materials["Future Grey 4"]}
            />
          </group>
          <group
            position={[41.261, 76.879, 1.311]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[1.948, 0.196, 1.948]}
            userData={{ name: "Platform.007" }}
          >
            <mesh
              geometry={nodes.Cube061.geometry}
              material={materials.LightBridge}
            />
            <mesh
              geometry={nodes.Cube061_1.geometry}
              material={materials["Future Grey 1"]}
            />
            <mesh
              geometry={nodes.Cube061_2.geometry}
              material={materials["Future Grey 2"]}
            />
            <mesh
              geometry={nodes.Cube061_3.geometry}
              material={materials["Future Grey 4"]}
            />
          </group>
          <group
            position={[30.504, 77.569, 3.165]}
            rotation={[Math.PI, -1.571, 0]}
            scale={[-1.948, -0.196, -1.948]}
            userData={{ name: "3_4Platform.005" }}
          >
            <mesh
              geometry={nodes.Cube065.geometry}
              material={materials.LightBridge}
            />
            <mesh
              geometry={nodes.Cube065_1.geometry}
              material={materials["Future Grey 1"]}
            />
            <mesh
              geometry={nodes.Cube065_2.geometry}
              material={materials["Future Grey 2"]}
            />
            <mesh
              geometry={nodes.Cube065_3.geometry}
              material={materials["Future Grey 4"]}
            />
          </group>
          <group
            position={[34.241, 81.872, 11.409]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[1.948, 0.196, 1.948]}
            userData={{ name: "BallPlatform.003" }}
          >
            <mesh
              geometry={nodes.Cube068.geometry}
              material={materials.LightBridgePink}
            />
            <mesh
              geometry={nodes.Cube068_1.geometry}
              material={materials["Future Grey 1"]}
            />
            <mesh
              geometry={nodes.Cube068_2.geometry}
              material={materials["Future Grey 2"]}
            />
            <mesh
              geometry={nodes.Cube068_3.geometry}
              material={materials["Future Grey 3"]}
            />
            <mesh
              geometry={nodes.Cube068_4.geometry}
              material={materials["Future Grey 4"]}
            />
          </group>
          <mesh
            geometry={nodes.HitThis003.geometry}
            material={materials.LightBridgePink}
            position={[34.239, 81.863, 11.409]}
            scale={0.387}
            userData={{ name: "HitThis.003" }}
          />
        </>
      )}
      {visibleSequences >= 5 && (
        <>
          <group
            position={[28.883, 77.573, 6.68]}
            rotation={[Math.PI, 0, Math.PI]}
            scale={[1.948, 0.196, 1.948]}
            userData={{ name: "BouncyPlatform.012" }}
          >
            <mesh
              geometry={nodes.Cube066.geometry}
              material={materials.BouncyBridge}
            />
            <mesh
              geometry={nodes.Cube066_1.geometry}
              material={materials["Bouncy 1"]}
            />
            <mesh
              geometry={nodes.Cube066_2.geometry}
              material={materials["Bouncy 2"]}
            />
            <mesh
              geometry={nodes.Cube066_3.geometry}
              material={materials["Bouncy 4"]}
            />
          </group>
          <group
            position={[12.514, 77.573, 6.68]}
            rotation={[Math.PI, 0, Math.PI]}
            scale={[1.948, 0.196, 1.948]}
            userData={{ name: "BouncyPlatform.013" }}
          >
            <mesh
              geometry={nodes.Cube069.geometry}
              material={materials.BouncyBridge}
            />
            <mesh
              geometry={nodes.Cube069_1.geometry}
              material={materials["Bouncy 1"]}
            />
            <mesh
              geometry={nodes.Cube069_2.geometry}
              material={materials["Bouncy 2"]}
            />
            <mesh
              geometry={nodes.Cube069_3.geometry}
              material={materials["Bouncy 4"]}
            />
          </group>
          <group
            position={[-4.764, 77.573, 6.68]}
            rotation={[Math.PI, 0, Math.PI]}
            scale={[1.948, 0.196, 1.948]}
            userData={{ name: "BouncyPlatform.014" }}
          >
            <mesh
              geometry={nodes.Cube070.geometry}
              material={materials.BouncyBridge}
            />
            <mesh
              geometry={nodes.Cube070_1.geometry}
              material={materials["Bouncy 1"]}
            />
            <mesh
              geometry={nodes.Cube070_2.geometry}
              material={materials["Bouncy 2"]}
            />
            <mesh
              geometry={nodes.Cube070_3.geometry}
              material={materials["Bouncy 4"]}
            />
          </group>
          <group
            position={[-15.922, 89.94, 6.64]}
            scale={[1.948, 0.196, 1.948]}
            userData={{ name: "Platform.014" }}
          >
            <mesh
              geometry={nodes.Cube071.geometry}
              material={materials.LightBridge}
            />
            <mesh
              geometry={nodes.Cube071_1.geometry}
              material={materials["Future Grey 1"]}
            />
            <mesh
              geometry={nodes.Cube071_2.geometry}
              material={materials["Future Grey 2"]}
            />
            <mesh
              geometry={nodes.Cube071_3.geometry}
              material={materials["Future Grey 4"]}
            />
          </group>
          <group
            position={[-11.957, 89.941, 17.061]}
            rotation={[Math.PI, 1.571, 0]}
            scale={[-1.948, -0.196, -1.948]}
            userData={{ name: "3_4Platform.007" }}
          >
            <mesh
              geometry={nodes.Cube072.geometry}
              material={materials.LightBridge}
            />
            <mesh
              geometry={nodes.Cube072_1.geometry}
              material={materials["Future Grey 1"]}
            />
            <mesh
              geometry={nodes.Cube072_2.geometry}
              material={materials["Future Grey 2"]}
            />
            <mesh
              geometry={nodes.Cube072_3.geometry}
              material={materials["Future Grey 4"]}
            />
          </group>
          <group
            position={[-4.303, 90.713, 18.91]}
            rotation={[Math.PI, 0, Math.PI]}
            scale={[1.948, 0.196, 1.948]}
            userData={{ name: "BouncyPlatform.016" }}
          >
            <mesh
              geometry={nodes.Cube078.geometry}
              material={materials.BouncyBridge}
            />
            <mesh
              geometry={nodes.Cube078_1.geometry}
              material={materials["Bouncy 1"]}
            />
            <mesh
              geometry={nodes.Cube078_2.geometry}
              material={materials["Bouncy 2"]}
            />
            <mesh
              geometry={nodes.Cube078_3.geometry}
              material={materials["Bouncy 4"]}
            />
          </group>
          <group
            position={[5.28, 100.278, 18.766]}
            rotation={[Math.PI, 0, Math.PI]}
            scale={[1.948, 0.196, 1.948]}
            userData={{ name: "BouncyPlatform.015" }}
          >
            <mesh
              geometry={nodes.Cube076.geometry}
              material={materials.BouncyBridge}
            />
            <mesh
              geometry={nodes.Cube076_1.geometry}
              material={materials["Bouncy 1"]}
            />
            <mesh
              geometry={nodes.Cube076_2.geometry}
              material={materials["Bouncy 2"]}
            />
            <mesh
              geometry={nodes.Cube076_3.geometry}
              material={materials["Bouncy 4"]}
            />
          </group>
          <group
            position={[3.069, 113.376, 10.72]}
            rotation={[0, -Math.PI / 2, 0]}
            scale={[1.948, 0.196, 1.948]}
            userData={{ name: "BigSquarePlatform" }}
          >
            <mesh
              geometry={nodes.Cube077.geometry}
              material={materials.LightBridge}
            />
            <mesh
              geometry={nodes.Cube077_1.geometry}
              material={materials["Future Grey 1"]}
            />
            <mesh
              geometry={nodes.Cube077_2.geometry}
              material={materials["Future Grey 2"]}
            />
            <mesh
              geometry={nodes.Cube077_3.geometry}
              material={materials["Future Grey 4"]}
            />
          </group>
        </>
      )}
    </group>
  );
}

useGLTF.preload("/1.glb");

export default React.memo(LoadedPlatforms);
