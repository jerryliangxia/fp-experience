import { PointerLockControls as PointerLockControlsDesktop } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Game from "./Game";
import { useThree } from "@react-three/fiber";
import Overlay from "./ui-components/Overlay";
import React, { useState, useEffect } from "react";
import { PointerLockControls as PointerLockControlsImpl } from "./PointerLockControls";
import { GameContext } from "./GameContext";
import { isDesktop } from "react-device-detect";
import FullScreenControl from "./ui-components/FullScreenControl";
import { LoadingTransition, DreiLoader } from "./ui-components/Loading";
import CompleteGame from "./ui-components/CompleteGame";
import useSound from "use-sound";
import backgroundMusic from "/sounds/equatorialcomplex.mp3";

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
    throwPressed: false,
  });

  const handleControlChange = (control, value) => {
    setControlsMobile((prevControls) => ({
      ...prevControls,
      [control]: value,
    }));
  };

  const [visibleSequences, setVisibleSequences] = useState(0);
  const incrementVisibleSequences = () => {
    setVisibleSequences((prev) => prev + 1);
  };

  const [completeGameVisible, setCompleteGameVisible] = useState(false);
  const [resetGame, setResetGame] = useState(false);
  // The following is for the game over screen; we don't want to show it when the user presses R to restart
  // (i.e.the game over screen is not shown),
  // so we introduce a new variable and set it depending on if the game was just reset
  const [wasJustReset, setWasJustReset] = useState(false);
  const [fscIsVisible, setFscIsVisible] = useState(true);
  const [isMobileFsc, setIsMobileFsc] = useState(true);
  const [playAudio, setPlayAudio] = useState(true);
  const [playMusic, setPlayMusic] = useState(true);
  const [play, { stop }] = useSound(backgroundMusic, {
    volume: 0.2,
    loop: true,
  });

  // When both full screen and game over are not visible, set the full screen to be visible
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setWasJustReset(false);
        setFscIsVisible(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // function fullscreenchanged(event) {
  //   if (!document.fullscreenElement && !isDesktop) {
  //     setFscIsVisible(false);
  //     setWasJustReset(false);
  //   }
  // }

  // document.addEventListener("fullscreenchange", fullscreenchanged);

  return (
    <>
      <GameContext.Provider
        value={{
          controlsMobile,
          handleControlChange,
          visibleSequences,
          setVisibleSequences,
          incrementVisibleSequences,
          completeGameVisible,
          setCompleteGameVisible,
          resetGame,
          setResetGame,
          wasJustReset,
          setWasJustReset,
          fscIsVisible,
          setFscIsVisible,
          isMobileFsc,
          setIsMobileFsc,
          playAudio,
          setPlayAudio,
          playMusic,
          setPlayMusic,
          play,
          stop,
        }}
      >
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
            ) : !fscIsVisible ? (
              <PointerLockControlsMobile />
            ) : (
              <></>
            )}
          </Canvas>
          {!isDesktop && <Overlay />}
          {!loadingOpaque && !completeGameVisible && !wasJustReset && (
            <FullScreenControl />
          )}
          {completeGameVisible && <CompleteGame />}
        </div>
      </GameContext.Provider>
      <DreiLoader setLoadingOpaque={setLoadingOpaque} />
    </>
  );
}
