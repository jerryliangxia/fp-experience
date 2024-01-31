import {
  // Stats,
  Environment,
  PointerLockControls as PointerLockControlsr,
  Loader,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Game from "./Game";
import { useThree } from "@react-three/fiber";
import Overlay from "./Overlay";
import React, { Suspense, useState, useEffect } from "react";
import { PointerLockControls as PointerLockControlsImpl } from "./PointerLockControls";
import { GameContext } from "./GameContext";
import { isDesktop } from "react-device-detect";
import { motion } from "framer-motion";
import { Button, Text, Flex, Switch } from "@radix-ui/themes";

function PointerLockControls() {
  const { camera, gl } = useThree();
  const controls = React.useRef();

  React.useEffect(() => {
    controls.current = new PointerLockControlsImpl(camera, gl.domElement);
  }, [camera, gl.domElement]);

  return null;
}

export default function App() {
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

  const [loadingOpaque, setLoadingOpaque] = useState(true);
  const overlayVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const [isVisible, setIsVisible] = useState(true);
  const [isFullScreen, setFullScreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullscreen =
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement;
      setIsVisible(!isFullscreen);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "msfullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !isFullScreen) {
        setIsVisible(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFullScreen]);

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
          <Suspense
            fallback={
              <div
                style={{
                  position: "fixed",
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#171717",
                  opacity: loadingOpaque ? 1 : 0,
                  transition: "opacity 1s",
                }}
              />
            }
          >
            <motion.div
              initial="visible"
              animate={loadingOpaque ? "visible" : "hidden"}
              variants={overlayVariants}
              transition={{ duration: 1.0 }}
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                backgroundColor: "#171717",
                zIndex: 2,
              }}
            />
            <Canvas
              onCreated={({ gl }) => {
                gl.domElement.style.zIndex = "0";
              }}
              // shadows
              style={{
                position: "fixed",
                // pointerEvents: isVisible ? "none" : "auto",
                pointerEvents: "auto",
                // cursor: isVisible ? "auto" : "none",
              }}
            >
              <directionalLight intensity={1} position={[85.0, 80.0, 70.0]} />
              <Environment
                files="/img/rustig_koppie_puresky_1k.hdr"
                background
                intensity={0.05}
              />

              <Game />
              {!isDesktop ? <PointerLockControls /> : <PointerLockControlsr />}
              {/* <Stats /> */}
            </Canvas>
            <Overlay />
            {!loadingOpaque && isVisible && isDesktop && (
              <>
                <div
                  style={{
                    position: "absolute",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 4,
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Flex gap="2" direction="column">
                    <Button
                      style={{ zIndex: 5 }}
                      onClick={() => {
                        const canvas = document.querySelector("canvas");
                        const event = new MouseEvent("click", {
                          view: window,
                          bubbles: true,
                          cancelable: true,
                        });
                        canvas.dispatchEvent(event);
                        setIsVisible(false);
                        if (isFullScreen) {
                          if (document.documentElement.requestFullscreen) {
                            document.documentElement.requestFullscreen();
                          } else if (
                            document.documentElement.mozRequestFullScreen
                          ) {
                            document.documentElement.mozRequestFullScreen();
                          } else if (
                            document.documentElement.webkitRequestFullscreen
                          ) {
                            document.documentElement.webkitRequestFullscreen();
                          } else if (
                            document.documentElement.msRequestFullscreen
                          ) {
                            document.documentElement.msRequestFullscreen();
                          }
                        } else {
                        }
                      }}
                    >
                      Play
                    </Button>
                    <Flex direction="row" gap="2" align="center">
                      <Switch
                        checked={isFullScreen}
                        onClick={() => setFullScreen(!isFullScreen)}
                      />
                      <Text size="1">Fullscreen</Text>
                    </Flex>
                  </Flex>
                </div>
              </>
            )}
          </Suspense>
        </div>
      </GameContext.Provider>
      <Loader
        className="loader-container"
        containerStyles={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        dataInterpolation={(p) => `Loading ${p.toFixed(0)}%`}
        initialState={(active) => {
          if (!active) {
            setTimeout(() => {
              setLoadingOpaque(false);
            }, 20);
          }
          return active;
        }}
      />
    </>
  );
}
