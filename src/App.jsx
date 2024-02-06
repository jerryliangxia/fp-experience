import { PointerLockControls as PointerLockControlsDesktop } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Game from "./Game";
import { useThree } from "@react-three/fiber";
import Overlay from "./ui-components/Overlay";
import React, { useState } from "react";
import { PointerLockControls as PointerLockControlsImpl } from "./PointerLockControls";
import { GameContext } from "./GameContext";
import { isDesktop } from "react-device-detect";
import FullScreenControl from "./ui-components/FullScreenControl";
import { LoadingTransition, DreiLoader } from "./ui-components/Loading";

function PointerLockControlsMobile() {
  const { camera, gl } = useThree();
  const controls = React.useRef();

  React.useEffect(() => {
    controls.current = new PointerLockControlsImpl(camera, gl.domElement);
  }, [camera, gl.domElement]);

  return null;
}

export default function App() {
  const [loadingOpaque, setLoadingOpaque] = useState(true);
  const [controlsMobile, setControlsMobile] = useState({
    upPressed: false,
    downPressed: false,
    leftPressed: false,
    rightPressed: false,
    spacePressed: false,
  });

  const handleControlChange = (control, value) => {
    setControlsMobile((prevControls) => ({
      ...prevControls,
      [control]: value,
    }));
  };

  return (
    <>
      <GameContext.Provider value={{ controlsMobile, handleControlChange }}>
        <div
          style={{
            position: "fixed",
            width: "100%",
            height: "100%",
            backgroundColor: "#171717",
          }}
        >
          <LoadingTransition loadingOpaque={loadingOpaque} />
          <Canvas
            onCreated={({ gl }) => {
              gl.domElement.style.zIndex = "0";
            }}
            style={{
              position: "fixed",
              pointerEvents: "auto",
            }}
          >
            <fog attach="fog" args={["white", 10, 1500]} />
            <Game />
            {isDesktop ? (
              <PointerLockControlsDesktop />
            ) : (
              <PointerLockControlsMobile />
            )}
          </Canvas>
          <Overlay />
          {!loadingOpaque && isDesktop && <FullScreenControl />}
        </div>
      </GameContext.Provider>
      <DreiLoader setLoadingOpaque={setLoadingOpaque} />
    </>
  );
}
