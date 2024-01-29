import { useEffect } from "react";
import { OctreeHelper } from "three/examples/jsm/helpers/OctreeHelper";
import { useThree } from "@react-three/fiber";
import { useControls } from "leva";

export default function useOctreeHelper(octree) {
  const { scene } = useThree();
  useEffect(() => {
    const helper = new OctreeHelper(octree, "hotpink");
    helper.name = "octreeHelper";
    helper.visible = false;
    scene.add(helper);
    return () => {
      scene.remove(helper);
    };
  }, [octree, scene]);

  // useControls("Octree Helper", {
  //   visible: {
  //     value: false,
  //     onChange: (v) => {
  //       scene.getObjectByName("octreeHelper").visible = v;
  //       //if (document.getElementById('Octree Helper.visible')) document.getElementById('Octree Helper.visible').blur()
  //     },
  //   },
  // });
}
