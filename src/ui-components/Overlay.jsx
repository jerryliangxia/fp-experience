import { GameContext } from "../GameContext";
import { useContext, useRef, useState } from "react";
import { bw, bh } from "../Constants";

export default function Overlay() {
  const { handleControlChange } = useContext(GameContext);
  const dpadRef = useRef();
  const throwButtonRef = useRef();
  const jumpButtonRef = useRef();
  const [isTouched, setIsTouched] = useState(false);

  const handleJump = () => {
    handleControlChange("spacePressed", true);
    setTimeout(() => handleControlChange("spacePressed", false), 100);
  };

  const handleThrowButtonPress = () => {
    handleControlChange("throwPressed", true);
    setTimeout(() => handleControlChange("throwPressed", false), 100);
  };

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
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div
        ref={dpadRef}
        id="controls"
        style={{
          position: "fixed",
          left: "1vw",
          bottom: "1vh",
          zIndex: 3,
          opacity: isTouched ? 0.5 : 0,
          transition: "opacity 0.25s ease-in-out",
          width: bw,
          height: bh,
        }}
        onTouchStart={() => setIsTouched(true)}
        onTouchMove={handleTouchMove}
        onTouchEnd={() => {
          resetAllControls();
          setIsTouched(false);
        }}
      >
        <div
          style={{
            background: "black",
            width: "100%",
            height: "100%",
            borderRadius: "8px",
          }}
        ></div>
      </div>
      <div
        ref={throwButtonRef}
        id="throwButton"
        style={{
          position: "fixed",
          right: "1vw",
          bottom: "calc(1vh + 30% + 10px)",
          zIndex: 3,
          opacity: 0.5,
          transition: "opacity 0.25s ease-in-out",
          width: bw / 2,
          height: bh / 2,
          backgroundColor: "#000",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.5rem",
          color: "#FFF",
          userSelect: "none",
        }}
        onTouchStart={handleThrowButtonPress}
      >
        Throw
      </div>
      <div
        ref={jumpButtonRef}
        id="jumpButton"
        style={{
          position: "fixed",
          right: "1vw",
          bottom: "1vh",
          zIndex: 3,
          opacity: isTouched ? 0.5 : 0,
          transition: "opacity 0.25s ease-in-out",
          width: bw / 2,
          height: bh / 2,
          backgroundColor: "#000",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.5rem",
          color: "#FFF",
          userSelect: "none",
        }}
        onTouchStart={handleJump}
      >
        Jump
      </div>
    </div>
  );
}
