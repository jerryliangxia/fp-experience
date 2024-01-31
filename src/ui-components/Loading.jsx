import React from "react";
import { motion } from "framer-motion";
import { Loader } from "@react-three/drei";

export function LoadingTransition({ loadingOpaque }) {
  const overlayVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  return (
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
  );
}

export function DreiLoader({ setLoadingOpaque }) {
  return (
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
  );
}
