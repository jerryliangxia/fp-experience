import { useGLTF } from "@react-three/drei";
import useOctree from "./useOctree";
import Player from "./Player";
import useOctreeHelper from "./useOctreeHelper";
import Model from "./Platform";
import Sky from "./Sky";
import Ocean from "./Ocean";
import Clouds from "./Clouds";
import Grass from "./Grass";

export default function Physics() {
  const { nodes, scene } = useGLTF("/dreamscene.glb");
  const octree = useOctree(scene);
  useOctreeHelper(octree);

  return (
    <>
      {/* <Sky /> */}
      <Grass position={[0, 0, 13.5]} />
      <Ocean />
      <Clouds position-z={-300} position-y={-5} scale={10} />
      <Model />
      <Player octree={octree} />
    </>
  );
}
