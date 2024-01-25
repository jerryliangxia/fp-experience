import { useGLTF } from "@react-three/drei";
import useOctree from "./useOctree";
import Player from "./Player";
import useOctreeHelper from "./useOctreeHelper";
import Model from "./Platform";

export default function Physics() {
  const { nodes, scene } = useGLTF("/models/scene.glb");
  const octree = useOctree(scene);
  useOctreeHelper(octree);

  return (
    <>
      <Model />
      {/* <group dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Suzanne007.geometry}
          material={nodes.Suzanne007.material}
          position={[1.74, 1.04, 24.97]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Suzanne.geometry}
          material={nodes.Suzanne.material}
          position={[0, 1, 0]}
        />
      </group> */}
      <Player octree={octree} />
    </>
  );
}
