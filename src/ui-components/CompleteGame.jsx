import React, { useState, useEffect, useContext } from "react";
import { Flex, Text, Card, Heading } from "@radix-ui/themes";
import { GameContext } from "../GameContext";
import { isDesktop, isMobile } from "react-device-detect";

export default function CompleteGame() {
  const { completeGameVisible, setResetGame, setWasJustReset } =
    useContext(GameContext);

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
          setResetGame(true);
          setWasJustReset(true);
          const isFullscreen =
            document.fullscreenElement ||
            document.mozFullScreenElement ||
            document.webkitFullscreenElement ||
            document.msFullscreenElement;
          if (isFullscreen) {
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
          Reset
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

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "r" && completeGameVisible) {
        setResetGame(true);
        setWasJustReset(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      id="fullscreen-control-container"
      style={{
        position: "fixed",
        top: 0,
        left: isMobile ? "10vw" : 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: isMobile ? "80vw" : "100vw",
        height: "100vh",
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
              Game Complete!
            </Heading>
            {isDesktop ? (
              <Text style={{ color: "white", fontFamily: "OrbitronLight" }}>
                Press R to reset
              </Text>
            ) : (
              <PSButton />
            )}
          </Flex>
        </div>
      </Card>
    </div>
  );
}
