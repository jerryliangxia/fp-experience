import { useGLTF, Environment } from "@react-three/drei";
import useOctree from "./useOctree";
import Player from "./Player";
import useOctreeHelper from "./useOctreeHelper";
import Model from "./world-components/Platform";
import Ocean from "./world-components/Ocean";
import Clouds from "./world-components/Clouds";
import Grass from "./world-components/Grass";

export default function Physics() {
  const { nodes, scene } = useGLTF("/octree.glb");
  const octree = useOctree(scene);
  useOctreeHelper(octree);

  return (
    <>
      <directionalLight intensity={1} position={[85.0, 80.0, 70.0]} />
      <Environment files="/img/rustig_koppie_puresky_1k.hdr" background />
      <Grass position={[0, 0, 13.5]} />
      <Ocean />
      <Clouds position-z={-300} position-y={-5} scale={10} />
      <Model />
      <Player octree={octree} />
    </>
  );
}
