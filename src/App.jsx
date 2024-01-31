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
import React, { Suspense, useState } from "react";
import { PointerLockControls as PointerLockControlsImpl } from "./PointerLockControls";
import { GameContext } from "./GameContext";
import { isDesktop } from "react-device-detect";
import { motion } from "framer-motion";

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
              {/* <ambientLight intensity={1} /> */}
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
