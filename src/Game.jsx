import { useGLTF } from "@react-three/drei";
import useOctree from "./useOctree";
import Player from "./Player";
import useOctreeHelper from "./useOctreeHelper";
import Model from "./Platform";
import Sky from "./Sky";
import GalaxyEffect from "./Galaxy";

export default function Physics() {
  const { nodes, scene } = useGLTF("/models/dreamscene.glb");
  const octree = useOctree(scene);
  useOctreeHelper(octree);

  return (
    <>
      {/* <GalaxyEffect /> */}
      <Sky />
      <Model />
      <Player octree={octree} />
    </>
  );
}
