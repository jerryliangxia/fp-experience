import { useMemo } from "react";
import { Octree } from "three/examples/jsm/math/Octree";

export default function useOctree(scene) {
  const octree = useMemo(() => {
    console.log("new Octree");
    return new Octree().fromGraphNode(scene);
  }, [scene]);

  return octree;
}
