import { GameContext } from "./GameContext";
import { useContext, useRef } from "react";
import { isMobile } from "react-device-detect";
import { Button, Flex } from "@radix-ui/themes";

export default function Overlay() {
  const { handleControlChange } = useContext(GameContext);
  const dpadRef = useRef();
  const buttonOpacity = 0;

  const handleTouchMove = (event) => {
    if (!dpadRef.current) return;

    const dpadRect = dpadRef.current.getBoundingClientRect();
    const dpadCenter = {
      x: dpadRect.left + dpadRect.width / 2,
      y: dpadRect.top + dpadRect.height / 2,
    };

    const touchPos = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    };

    const dx = touchPos.x - dpadCenter.x;
    const dy = touchPos.y - dpadCenter.y;

    // Reset all controls
    handleControlChange("upPressed", false);
    handleControlChange("downPressed", false);
    handleControlChange("leftPressed", false);
    handleControlChange("rightPressed", false);

    // Determine which direction is pressed based on the touch position
    if (Math.abs(dx) > Math.abs(dy)) {
      // Left or right
      if (dx > 0) {
        handleControlChange("rightPressed", true);
      } else {
        handleControlChange("leftPressed", true);
      }
    } else {
      // Up or down
      if (dy > 0) {
        handleControlChange("downPressed", true);
      } else {
        handleControlChange("upPressed", true);
      }
    }
  };

  function resetAllControls() {
    handleControlChange("upPressed", false);
    handleControlChange("downPressed", false);
    handleControlChange("leftPressed", false);
    handleControlChange("rightPressed", false);
  }

  return (
    isMobile && (
      <div
        ref={dpadRef}
        id="controls"
        style={{
          position: "fixed",
          bottom: "5vh",
          left: "10vw",
          zIndex: 1,
        }}
        onTouchMove={handleTouchMove}
        onTouchEnd={resetAllControls}
      >
        <Flex direction="column" align="center" justify="center">
          <Flex direction="row" align="center" justify="center">
            <Button
              style={{ userSelect: "none", opacity: buttonOpacity }}
              onTouchStart={() => {
                handleControlChange("upPressed", true);
                handleControlChange("leftPressed", true);
              }}
              onTouchEnd={() => {
                resetAllControls();
              }}
            ></Button>
            <Button
              style={{ userSelect: "none", opacity: buttonOpacity }}
              onTouchStart={() => handleControlChange("upPressed", true)}
              onTouchEnd={() => handleControlChange("upPressed", false)}
            ></Button>
            <Button
              style={{ userSelect: "none", opacity: buttonOpacity }}
              onTouchStart={() => {
                handleControlChange("upPressed", true);
                handleControlChange("rightPressed", true);
              }}
              onTouchEnd={() => {
                resetAllControls();
              }}
            ></Button>
          </Flex>
          <Flex direction="row" align="center" justify="center">
            <Button
              style={{ userSelect: "none", opacity: buttonOpacity }}
              onTouchStart={() => handleControlChange("leftPressed", true)}
              onTouchEnd={() => handleControlChange("leftPressed", false)}
            ></Button>
            <Button
              style={{ userSelect: "none", opacity: buttonOpacity }}
              // onTouchStart={() => handleControlChange("spacePressed", true)}
              // onTouchEnd={() => resetAllControls()}
            ></Button>
            <Button
              style={{ userSelect: "none", opacity: buttonOpacity }}
              onTouchStart={() => handleControlChange("rightPressed", true)}
              onTouchEnd={() => resetAllControls()}
            ></Button>
          </Flex>
          <Flex direction="row" align="center" justify="center">
            <Button
              style={{ userSelect: "none", opacity: buttonOpacity }}
              onTouchStart={() => {
                handleControlChange("downPressed", true);
                handleControlChange("leftPressed", true);
              }}
              onTouchEnd={() => {
                resetAllControls();
              }}
            ></Button>
            <Button
              style={{ userSelect: "none", opacity: buttonOpacity }}
              onTouchStart={() => handleControlChange("downPressed", true)}
              onTouchEnd={() => resetAllControls()}
            ></Button>
            <Button
              style={{ userSelect: "none", opacity: buttonOpacity }}
              onTouchStart={() => {
                handleControlChange("downPressed", true);
                handleControlChange("rightPressed", true);
              }}
              onTouchEnd={() => {
                resetAllControls();
              }}
            ></Button>
          </Flex>
        </Flex>
      </div>
    )
  );
}
