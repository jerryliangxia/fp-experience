import React, { useMemo } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model({ url = "/1.glb" }) {
  const { scene, materials } = useGLTF(url);

  useMemo(() => {
    if (materials["Future Grey 1"]) {
      materials["Future Grey 1"].transparent = true;
      materials["Future Grey 1"].opacity = 0.5;
    }

    if (materials["Bouncy 1"]) {
      materials["Bouncy 1"].transparent = true;
      materials["Bouncy 1"].opacity = 0.5;
    }
  }, [materials]);

  return <primitive object={scene} />;
}

useGLTF.preload("/1.glb");
