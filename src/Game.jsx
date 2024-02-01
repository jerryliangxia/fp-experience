import { useGLTF, Environment } from "@react-three/drei";
import useOctree from "./useOctree";
import Player from "./Player";
import useOctreeHelper from "./useOctreeHelper";
import Model from "./world-components/Platform";
import Ocean from "./world-components/Ocean";
import Clouds from "./world-components/Clouds";
import Grass from "./world-components/Grass";
import Bushes from "./world-components/Bushes";
import TreeLeaves from "./world-components/TreeLeaves";
import Icoplant from "./world-components/Icoplant";

export default function Physics() {
  const { nodes, scene } = useGLTF("/octree.glb");
  const octree = useOctree(scene);
  useOctreeHelper(octree);

  return (
    <>
      <directionalLight intensity={1} position={[85.0, 80.0, 70.0]} />
      <Environment files="/img/rustig_koppie_puresky_1k.hdr" background />
      <Grass position={[0, 0, 13.5]} dense={true} />
      <Grass position={[0, 0, 13.5]} dense={false} />
      <Icoplant
        position={[-8.932, 0.35, 9.17]}
        baseColor={"#9670FF"}
        rando={1.0}
      />
      <Icoplant
        position={[-7.39, 0.381, 8.278]}
        baseColor={"#52C7FF"}
        rando={2.0}
      />
      <Bushes position={[0, 0, 13.5]} />
      <TreeLeaves position={[-11.184, -0.8, 7.569]} />
      <TreeLeaves position={[-7.151, 0.6, 5.939]} />
      <Ocean />
      <Clouds position-z={-300} position-y={-5} scale={10} />
      <Model />
      <Player octree={octree} />
    </>
  );
}
