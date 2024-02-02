import React, { useState, useEffect } from "react";
import { Flex, Button, Switch, Text, Card, Heading } from "@radix-ui/themes";
import { motion } from "framer-motion";
import * as SwitchPrimitive from "@radix-ui/react-switch";

export default function FullScreenControl() {
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

  function PlayButton() {
    return (
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
            } else if (document.documentElement.mozRequestFullScreen) {
              document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
              document.documentElement.webkitRequestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) {
              document.documentElement.msRequestFullscreen();
            }
          }
        }}
      >
        Play
      </Button>
    );
  }

  function PSButton() {
    return (
      <Flex
        style={{
          width: "50%",
          paddingLeft: "0 !important",
          paddingRight: "0 !important",
        }}
      >
        <motion.div
          whileHover={{ backgroundPosition: "0%" }}
          animate={{ backgroundPosition: "100%" }} // Set back to 100% for a clearer transition
          transition={{ duration: 0.3, type: "tween" }}
          style={{
            background: `linear-gradient(270deg, transparent 50.13%, #35C7D2 50%)`, // Adjust the gradient stops
            backgroundSize: "200% 100%",
            backgroundPosition: "100%", // Adjusted for a smoother transition
            color: "white",
            padding: "4px 0px",
            border: "none",
            cursor: "pointer",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "4px",
          }}
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
              } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
              } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen();
              } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
              }
            }
          }}
        >
          <Text size="2">Play</Text>
        </motion.div>
      </Flex>
    );
  }

  return (
    isVisible && (
      <div
        id="fullscreen-control-container"
        style={{
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          zIndex: 4,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Card
          variant="ghost"
          style={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <div
            style={{
              backgroundColor: "#35C7D2",
              opacity: "40%",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1,
              borderRadius: "inherit",
            }}
          />
          <div
            style={{
              position: "relative",
              zIndex: 2,
            }}
          >
            <Flex gap="2" direction="column" align="center">
              <Heading size="10" style={{ color: "white" }}>
                TRAPPIST-1 SYSTEM
              </Heading>
              <Text style={{ color: "white" }}>
                A Frutiger Aero inspired experience.
              </Text>
              <PSButton />
              <Flex direction="row" gap="2" align="center">
                <SwitchPrimitive.Root
                  className="switch-root"
                  checked={isFullScreen}
                  onCheckedChange={setFullScreen}
                  style={{
                    backgroundColor: isFullScreen ? "#35C7D2" : "transparent",
                    borderRadius: "9999px",
                    width: "42px",
                    height: "25px",
                    position: "relative",
                  }}
                >
                  <SwitchPrimitive.Thumb
                    className="switch-thumb"
                    style={{
                      display: "block",
                      width: "21px",
                      height: "21px",
                      backgroundColor: "#fff",
                      borderRadius: "9999px",
                      transition: "transform 100ms",
                      transform: isFullScreen
                        ? "translateX(11px) translateY(-1px)"
                        : "translateX(-6px) translateY(-1px)",
                    }}
                  />
                </SwitchPrimitive.Root>
                <Text style={{ color: "white" }} size="1">
                  Fullscreen
                </Text>
              </Flex>
            </Flex>
          </div>
        </Card>
      </div>
    )
  );
}
