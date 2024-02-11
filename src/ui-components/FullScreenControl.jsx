import React, { useState, useEffect, useContext } from "react";
import { Flex, Text, Card, Heading } from "@radix-ui/themes";
import { GameContext } from "../GameContext";
import * as SwitchPrimitive from "@radix-ui/react-switch";

export default function FullScreenControl() {
  const { fscIsVisible, setFscIsVisible } = useContext(GameContext);
  const [isFullScreen, setFullScreen] = useState(false);
  const { setWasJustReset } = useContext(GameContext);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullscreen =
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement;
      setFscIsVisible(!isFullscreen);
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
        setFscIsVisible(true);
        // The following is for the game over screen; we don't want to show it when the user presses R to restart
        //(i.e.the game over screen is not shown),
        // so we introduce a new variable and set it depending on if the game was just reset
        setWasJustReset(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFullScreen]);

  function PSButton() {
    const [isHovered, setIsHovered] = useState(false);

    const baseColor = "#35C7D2";
    const hoverColor = "#39D6E1";
    return (
      <button
        className="Button"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          width: "35%",
          height: "90%",
          backgroundColor: isHovered ? hoverColor : baseColor,
          borderRadius: "4px",
          cursor: "pointer",
          color: "#FFFFFF",
          padding: "8px 20px",
          transition: "transform 0.3s ease, background-color 0.3s ease",
          transform: isHovered ? "scale(1.1)" : "scale(1)",
        }}
        onClick={() => {
          const canvas = document.querySelector("canvas");
          const event = new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: true,
          });
          canvas.dispatchEvent(event);
          setFscIsVisible(false);
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
        <Text size="2" style={{ color: "white", fontFamily: "OrbitronLight" }}>
          Play
        </Text>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "4px",
            zIndex: -1,
            content: '""',
          }}
        />
      </button>
    );
  }

  return (
    fscIsVisible && (
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
            <Flex gap="3" direction="column" align="center">
              <Heading
                size="10"
                style={{ color: "white", fontFamily: "OrbitronLight" }}
              >
                TRAPPIST-1 System
              </Heading>
              <Text style={{ color: "white", fontFamily: "OrbitronLight" }}>
                A Frutiger Aero-inspired experience.
              </Text>
              <PSButton />
              <Flex direction="row" gap="1" align="center">
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
                <Text
                  style={{ color: "white", fontFamily: "OrbitronLight" }}
                  size="1"
                >
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
