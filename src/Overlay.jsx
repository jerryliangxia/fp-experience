import { GameContext } from "./GameContext";
import { useContext } from "react";
import { isMobile } from "react-device-detect";

export default function Overlay() {
  const { handleControlChange } = useContext(GameContext);

  return (
    isMobile && (
      <div
        id="controls"
        style={{ position: "absolute", bottom: "10px", left: "10px" }}
      >
        <button
          onTouchStart={() => handleControlChange("upPressed", true)}
          onTouchEnd={() => handleControlChange("upPressed", false)}
        >
          Up
        </button>
        <button
          onTouchStart={() => handleControlChange("downPressed", true)}
          onTouchEnd={() => handleControlChange("downPressed", false)}
        >
          Down
        </button>
        <button
          onTouchStart={() => handleControlChange("leftPressed", true)}
          onTouchEnd={() => handleControlChange("leftPressed", false)}
        >
          Left
        </button>
        <button
          onTouchStart={() => handleControlChange("rightPressed", true)}
          onTouchEnd={() => handleControlChange("rightPressed", false)}
        >
          Right
        </button>
      </div>
    )
  );
}
