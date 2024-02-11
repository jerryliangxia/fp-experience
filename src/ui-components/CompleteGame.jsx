import React, { useState, useEffect, useContext } from "react";
import { Flex, Text, Card, Heading } from "@radix-ui/themes";
import { GameContext } from "../GameContext";

export default function CompleteGame() {
  const { completeGameVisible, setResetGame, setWasJustReset } =
    useContext(GameContext);

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
              Game Complete!
            </Heading>
            <Text style={{ color: "white", fontFamily: "OrbitronLight" }}>
              Press R to reset
            </Text>
          </Flex>
        </div>
      </Card>
    </div>
  );
}
