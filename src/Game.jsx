import { useGLTF, Environment } from "@react-three/drei";
import useOctree from "./useOctree";
import Player from "./Player";
import useOctreeHelper from "./useOctreeHelper";
import Model from "./world-components/Platform";
import Ocean from "./world-components/Ocean";
import Clouds from "./world-components/Clouds";
import GroundFoliage from "./world-components/GroundFoliage";
import TreeLeaves from "./world-components/TreeLeaves";
import Icoplant from "./world-components/Icoplant";

const hexToVec3 = (hex) => {
  hex = hex.replace(/^#/, "");
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);
  return [+(r / 255).toFixed(2), +(g / 255).toFixed(2), +(b / 255).toFixed(2)];
};

export default function Physics() {
  const { nodes, scene } = useGLTF("/octree.glb");
  const octree = useOctree(scene);
  useOctreeHelper(octree);

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
    </>
  );
}
