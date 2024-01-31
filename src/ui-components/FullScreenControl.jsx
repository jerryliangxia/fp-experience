import React, { useState, useEffect } from "react";
import { Flex, Button, Switch, Text } from "@radix-ui/themes";

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

  return (
    isVisible && (
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
          <Flex direction="row" gap="2" align="center">
            <Switch
              checked={isFullScreen}
              onClick={() => setFullScreen(!isFullScreen)}
            />
            <Text size="1">Fullscreen</Text>
          </Flex>
        </Flex>
      </div>
    )
  );
}
