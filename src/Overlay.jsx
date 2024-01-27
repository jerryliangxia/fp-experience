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
          <Button
            style={{ userSelect: "none", width: "80%" }}
            onTouchStart={() => handleControlChange("upPressed", true)}
            onTouchEnd={() => handleControlChange("upPressed", false)}
          ></Button>
          <Flex direction="row" gap="2" align="center" justify="center">
            <Button
              style={{ userSelect: "none", width: "80%" }}
              onTouchStart={() => handleControlChange("leftPressed", true)}
              onTouchEnd={() => handleControlChange("leftPressed", false)}
            ></Button>
            <Button
              style={{ userSelect: "none", width: "80%" }}
              onTouchStart={() => handleControlChange("rightPressed", true)}
              onTouchEnd={() => handleControlChange("rightPressed", false)}
            ></Button>
          </Flex>
          <Button
            style={{ userSelect: "none", width: "80%" }}
            onTouchStart={() => handleControlChange("downPressed", true)}
            onTouchEnd={() => handleControlChange("downPressed", false)}
          ></Button>
        </Flex>
      </div>
    )
  );
}
