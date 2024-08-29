import { GameContext } from "../GameContext";
import { useContext, useRef, useState, useEffect } from "react";
import { bw, bh } from "../Constants";

export default function Overlay() {
  const { handleControlChange } = useContext(GameContext);
  const dpadRef = useRef();
  const throwButtonRef = useRef();
  const jumpButtonRef = useRef();
  const [isTouched, setIsTouched] = useState(false);
  const [isThrowButtonTouched, setIsThrowButtonTouched] = useState(false);
  const [isJumpButtonTouched, setIsJumpButtonTouched] = useState(false);
  const [touchPosition, setTouchPosition] = useState({ x: 0, y: 0 });

  const handleJump = () => {
    event.stopPropagation();
    handleControlChange("spacePressed", true);
    setTimeout(() => handleControlChange("spacePressed", false), 100);
    setIsJumpButtonTouched(true);
    setTimeout(() => setIsJumpButtonTouched(false), 500);
  };

  const handleThrowButtonPress = () => {
    event.stopPropagation();
    handleControlChange("throwPressed", true);
    setTimeout(() => handleControlChange("throwPressed", false), 100);
    setIsThrowButtonTouched(true);
    setTimeout(() => setIsThrowButtonTouched(false), 500);
  };

  const handleTouchMove = (event) => {
    event.stopPropagation();
    if (!dpadRef.current) return;

    const dpadRect = dpadRef.current.getBoundingClientRect();
    const dpadCenter = {
      x: dpadRect.left + dpadRect.width / 2,
      y: dpadRect.top + dpadRect.height / 2,
    };

    const touchPos = {
      x: event.touches[0].clientX - dpadCenter.x,
      y: event.touches[0].clientY - dpadCenter.y,
    };

    const radius = dpadRect.width / 2;
    const distance = Math.sqrt(touchPos.x ** 2 + touchPos.y ** 2);
    const angle = Math.atan2(touchPos.y, touchPos.x);

    const clampedDistance = Math.min(distance, radius);
    const clampedX = clampedDistance * Math.cos(angle);
    const clampedY = clampedDistance * Math.sin(angle);

    setTouchPosition({ x: clampedX, y: clampedY });

    const direction = (angle + Math.PI * 2) % (Math.PI * 2);
    resetAllControls();

    if (direction < Math.PI / 4 || direction > (Math.PI * 7) / 4) {
      handleControlChange("rightPressed", true);
    } else if (direction < (Math.PI * 3) / 4) {
      handleControlChange("downPressed", true);
    } else if (direction < (Math.PI * 5) / 4) {
      handleControlChange("leftPressed", true);
    } else if (direction < (Math.PI * 7) / 4) {
      handleControlChange("upPressed", true);
    }
  };

  function resetAllControls() {
    handleControlChange("upPressed", false);
    handleControlChange("downPressed", false);
    handleControlChange("leftPressed", false);
    handleControlChange("rightPressed", false);
  }

  useEffect(() => {
    let animationFrameId;
    const lerpTouchPosition = () => {
      setTouchPosition((prev) => ({
        x: prev.x * 0.8,
        y: prev.y * 0.8,
      }));
      animationFrameId = requestAnimationFrame(lerpTouchPosition);
    };

    if (!isTouched) {
      lerpTouchPosition();
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [isTouched]);

  const buttonOpacity = (isButtonTouched) =>
    isButtonTouched || isTouched ? 0.5 : 0;

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
          transition: "opacity 0.5s ease-in-out",
          width: bw * 0.8,
          height: bw * 0.8,
          borderRadius: "50%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        onTouchStart={(event) => {
          setIsTouched(true);
          handleTouchMove(event);
        }}
        onTouchMove={handleTouchMove}
        onTouchEnd={() => {
          resetAllControls();
          setIsTouched(false);
        }}
      >
        <div
          style={{
            position: "absolute",
            left: `calc(50% + ${touchPosition.x}px)`,
            top: `calc(50% + ${touchPosition.y}px)`,
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            border: "2px solid white",
            transform: "translate(-50%, -50%)",
            opacity: isTouched ? 1 : 0,
            transition: "opacity 0.5s ease-in-out",
          }}
        />
      </div>
      <div
        ref={throwButtonRef}
        id="throwButton"
        style={{
          position: "fixed",
          right: "1vw",
          bottom: "calc(1vh + 30% + 10px)",
          zIndex: 3,
          opacity: buttonOpacity(isThrowButtonTouched),
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
          opacity: buttonOpacity(isJumpButtonTouched),
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
