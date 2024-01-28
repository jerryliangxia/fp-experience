import {
  Stats,
  Environment,
  PointerLockControls as PointerLockControlsr,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Game from "./Game";
import { useThree, useFrame } from "@react-three/fiber";
import Overlay from "./Overlay";
import React, { useState } from "react";
import { PointerLockControls as PointerLockControlsImpl } from "./PointerLockControls";
import { GameContext } from "./GameContext";
import { isTablet, isMobile } from "./Constants";

function PointerLockControls() {
  const { camera, gl } = useThree();
  const controls = React.useRef();

  React.useEffect(() => {
    controls.current = new PointerLockControlsImpl(camera, gl.domElement);
  }, [camera, gl.domElement]);

  return null;
}

export default function App() {
  const bw = isTablet ? document.body.clientWidth / 5 : 200;
  const bh = isTablet ? document.body.clientHeight / 5 : 200;

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
        <Canvas
          onCreated={({ gl }) => {
            gl.domElement.style.zIndex = "0";
          }}
          shadows
          style={{ position: "fixed" }}
        >
          <directionalLight
            intensity={1}
            castShadow={true}
            shadow-bias={-0.00015}
            shadow-radius={4}
            shadow-blur={10}
            shadow-mapSize={[2048, 2048]}
            position={[85.0, 80.0, 70.0]}
            shadow-camera-left={-30}
            shadow-camera-right={30}
            shadow-camera-top={30}
            shadow-camera-bottom={-30}
          />
          {/* <Environment files="/img/rustig_koppie_puresky_1k.hdr" background /> */}
          <Game />
          {isMobile || isTablet ? (
            <PointerLockControls bw={bw} bh={bh} />
          ) : (
            <PointerLockControlsr />
          )}
          <Stats />
        </Canvas>
        <Overlay bw={bw} bh={bh} />
      </GameContext.Provider>
    </>
  );
}
