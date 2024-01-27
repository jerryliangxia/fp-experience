import { GameContext } from "./GameContext";
import { useContext } from "react";
import { isMobile } from "react-device-detect";
import { Button, Flex } from "@radix-ui/themes";

export default function Overlay() {
  const { handleControlChange } = useContext(GameContext);

  return (
    isMobile && (
      <div
        id="controls"
        style={{
          position: "fixed",
          bottom: "5vh",
          left: "10vw",
          zIndex: 1,
        }}
      >
        <Flex direction="column" gap="2" align="center" justify="center">
          <Flex direction="row" gap="1" align="center" justify="center">
            <Button
              style={{ userSelect: "none" }}
              onTouchStart={() => {
                handleControlChange("upPressed", true);
                handleControlChange("leftPressed", true);
              }}
              onTouchEnd={() => {
                handleControlChange("upPressed", false);
                handleControlChange("leftPressed", false);
              }}
            ></Button>
            <Button
              style={{ userSelect: "none" }}
              onTouchStart={() => handleControlChange("upPressed", true)}
              onTouchEnd={() => handleControlChange("upPressed", false)}
            ></Button>
            <Button
              style={{ userSelect: "none" }}
              onTouchStart={() => {
                handleControlChange("upPressed", true);
                handleControlChange("rightPressed", true);
              }}
              onTouchEnd={() => {
                handleControlChange("upPressed", false);
                handleControlChange("rightPressed", false);
              }}
            ></Button>
          </Flex>
          <Flex direction="row" gap="1" align="center" justify="center">
            <Button
              style={{ userSelect: "none" }}
              onTouchStart={() => handleControlChange("leftPressed", true)}
              onTouchEnd={() => handleControlChange("leftPressed", false)}
            ></Button>
            <Button
              style={{ userSelect: "none" }}
              onTouchStart={() => handleControlChange("spacePressed", true)}
              onTouchEnd={() => handleControlChange("spacePressed", false)}
            ></Button>
            <Button
              style={{ userSelect: "none" }}
              onTouchStart={() => handleControlChange("rightPressed", true)}
              onTouchEnd={() => handleControlChange("rightPressed", false)}
            ></Button>
          </Flex>
          <Flex direction="row" gap="1" align="center" justify="center">
            <Button
              style={{ userSelect: "none" }}
              onTouchStart={() => {
                handleControlChange("downPressed", true);
                handleControlChange("leftPressed", true);
              }}
              onTouchEnd={() => {
                handleControlChange("downPressed", false);
                handleControlChange("leftPressed", false);
              }}
            ></Button>
            <Button
              style={{ userSelect: "none" }}
              onTouchStart={() => handleControlChange("downPressed", true)}
              onTouchEnd={() => handleControlChange("downPressed", false)}
            ></Button>
            <Button
              style={{ userSelect: "none" }}
              onTouchStart={() => {
                handleControlChange("downPressed", true);
                handleControlChange("rightPressed", true);
              }}
              onTouchEnd={() => {
                handleControlChange("downPressed", false);
                handleControlChange("rightPressed", false);
              }}
            ></Button>
          </Flex>
        </Flex>
      </div>
    )
  );
}
