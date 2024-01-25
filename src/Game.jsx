import { useGLTF } from "@react-three/drei";
import useOctree from "./useOctree";
import Player from "./Player";
import useOctreeHelper from "./useOctreeHelper";
import Model from "./Platform";
import Sky from "./Sky";

export default function Physics() {
  const { nodes, scene } = useGLTF("/models/scene.glb");
  const octree = useOctree(scene);
  useOctreeHelper(octree);

  return (
    <>
      <Sky />
      <Model />
      <Player octree={octree} />
    </>
  );
}
