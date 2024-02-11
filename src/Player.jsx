import { useRef, useState, useContext, useEffect, useMemo } from "react";
import { Capsule } from "three/examples/jsm/math/Capsule.js";
import { Vector3 } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import useKeyboard from "./useKeyboard";
import { GameContext } from "./GameContext";
import useSound from "use-sound";
import soundFile from "/sounds/step.mp3";
import { isDesktop } from "react-device-detect";
import boingSound from "/sounds/boing.mp3";
import { useMultipleSounds } from "./useMultipleSounds";
import throwSound from "/sounds/throw.mp3";

const GRAVITY = 30;
const STEPS_PER_FRAME = 5;
const soundFiles = [
  "/sounds/concrete/1.mp3",
  "/sounds/concrete/3.mp3",
  "/sounds/concrete/2.mp3",
  "/sounds/concrete/4.mp3",
];
const waterSoundFiles = [
  "/sounds/water/1.mp3",
  "/sounds/water/2.mp3",
  "/sounds/water/3.mp3",
  "/sounds/water/4.mp3",
];

const checkpoints = [
  new Vector3(0, 0 + 1, 0),
  new Vector3(-15.387361630881388, 37.20735549926758 + 1, 38.861433807706554), // Adjusted Y position to prevent collisions
  new Vector3(17.85489054645034, 48.99660110473633 + 1, -18.579042307572948),
  new Vector3(78.42452415093283, 76.54497528076172 + 1, 12.671296962801945),
  new Vector3(33.89271564199533, 78.26509857177734 + 1, 1.7014784453861904),
  new Vector3(4.11610902625964, 114.0535888671875 + 1, 12.244482022397724),
];

export default function Player({ octree, octreeBouncy, colliders, ballCount }) {
  const {
    controlsMobile,
    visibleSequences,
    setVisibleSequences,
    completeGameVisible,
    setCompleteGameVisible,
    resetGame,
    setResetGame,
    playAudio,
  } = useContext(GameContext);

  const {
    upPressed,
    downPressed,
    leftPressed,
    rightPressed,
    spacePressed,
    throwPressed,
  } = controlsMobile;

  const playRandomFootstep = useMultipleSounds(soundFiles);
  const playRandomWaterSound = useMultipleSounds(waterSoundFiles);

  const [playSandSound] = useSound(soundFile, {
    volume: Math.random() * 0.015 + 0.06,
  });
  const [playBoingSound] = useSound(boingSound, { volume: 0.2 });
  const [playThrowSound] = useSound(throwSound, { volume: 0.05 });

  function playFootstep() {
    const playerYPosition = capsule.start.y;

    if (playerYPosition < 0.6) {
      playRandomWaterSound();
    } else if (playerYPosition < 1.3) {
      playSandSound();
    } else if (
      playerYPosition > 114 &&
      capsule.start.z < 14.5 &&
      !completeGameVisible
    ) {
      setCompleteGameVisible(true);
    } else {
      playRandomFootstep();
    }
  }

  const playerOnFloor = useRef(false);
  const playerVelocity = useMemo(() => new Vector3(), []);
  const playerDirection = useMemo(() => new Vector3(), []);
  const capsule = useMemo(
    () => new Capsule(new Vector3(0, 0, 0), new Vector3(0, 1, 0), 0.5),
    []
  );
  const { camera } = useThree();
  let clicked = 0;

  useEffect(() => {
    if (resetGame) {
      // Reset game state
      setVisibleSequences(0);

      // Return player to spawn position
      const spawnPosition = new Vector3(0, 1, 0); // Assuming this is the spawn position
      capsule.end.copy(spawnPosition.clone().add(new Vector3(0, 1, 0))); // Adjust end position based on capsule height
      playerVelocity.set(0, 0, 0); // Reset velocity
      camera.position.copy(capsule.end); // Update camera position to match the capsule
      capsule.start.copy(spawnPosition);
      setCompleteGameVisible(false);
      setTimeout(() => {
        const canvas = document.querySelector("canvas");
        if (canvas) {
          // Ensure the canvas element exists before dispatching the event
          const event = new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: true,
          });
          canvas.dispatchEvent(event);
        }
        setResetGame(false);
      }, 1000); // Delay in milliseconds
    }
  }, [
    resetGame,
    setVisibleSequences,
    setResetGame,
    capsule,
    playerVelocity,
    camera,
  ]);

  const onPointerDown = () => {
    if (!canMove() || !isDesktop) return;
    throwBall(camera, capsule, playerDirection, playerVelocity, clicked++);
    if (playAudio) playThrowSound();
  };
  useEffect(() => {
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
    };
  });

  useEffect(() => {
    if (throwPressed) {
      // Assuming throwBall is a function that handles throwing the ball
      throwBall(camera, capsule, playerDirection, playerVelocity, clicked++);
      if (playAudio) playThrowSound();
      // Reset throwPressed state if necessary
      // handleThrowChange(false); // You'll need to pass handleThrowChange from GameContext
    }
  }, [throwPressed, camera, capsule, playerDirection, playerVelocity, clicked]);

  useEffect(() => {
    colliders[ballCount] = { capsule: capsule, velocity: playerVelocity };
  }, [colliders, ballCount, capsule, playerVelocity]);

  const keyboard = useKeyboard();

  const canMove = () => {
    const fullscreenControl = document.querySelector(
      "#fullscreen-control-container"
    );
    // Check if the element exists and is visible
    return !(
      fullscreenControl &&
      getComputedStyle(fullscreenControl).display !== "none"
    );
  };

  function getForwardVector(camera, playerDirection) {
    camera.getWorldDirection(playerDirection);
    playerDirection.y = 0;
    playerDirection.normalize();
    return playerDirection;
  }

  function getSideVector(camera, playerDirection) {
    camera.getWorldDirection(playerDirection);
    playerDirection.y = 0;
    playerDirection.normalize();
    playerDirection.cross(camera.up);
    return playerDirection;
  }

  function controlsWASD(
    camera,
    delta,
    playerVelocity,
    playerOnFloor,
    playerDirection
  ) {
    if (!canMove()) return;
    const speedDelta = delta * (playerOnFloor ? 36 : 12);
    keyboard["KeyA"] &&
      playerVelocity.add(
        getSideVector(camera, playerDirection).multiplyScalar(-speedDelta)
      );
    keyboard["KeyD"] &&
      playerVelocity.add(
        getSideVector(camera, playerDirection).multiplyScalar(speedDelta)
      );
    keyboard["KeyW"] &&
      playerVelocity.add(
        getForwardVector(camera, playerDirection).multiplyScalar(speedDelta)
      );
    keyboard["KeyS"] &&
      playerVelocity.add(
        getForwardVector(camera, playerDirection).multiplyScalar(-speedDelta)
      );
    if (playerOnFloor) {
      if (keyboard["Space"]) {
        playerVelocity.y = 15;
      }
    }
  }

  function updatePlayer(
    camera,
    delta,
    octree,
    octreeBouncy,
    capsule,
    playerVelocity,
    playerOnFloor
  ) {
    if (resetGame) return;
    let damping = Math.exp(-8 * delta) - 1;
    if (!playerOnFloor) {
      playerVelocity.y -= GRAVITY * delta;
      damping *= 0.1; // small air resistance
    }
    playerVelocity.addScaledVector(playerVelocity, damping);
    const deltaPosition = playerVelocity.clone().multiplyScalar(delta);
    capsule.translate(deltaPosition);
    playerOnFloor = playerCollisions(
      capsule,
      octree,
      octreeBouncy,
      playerVelocity
    );

    if (capsule.start.y < 20 && visibleSequences > 1) {
      const checkpoint = checkpoints[visibleSequences - 1];
      capsule.start.copy(checkpoint);
      capsule.end.copy(checkpoint.clone().add(new Vector3(0, 1, 0))); // Adjust end position based on capsule height
      playerVelocity.set(0, 0, 0); // Reset velocity
      camera.position.copy(capsule.end); // Update camera position to match the capsule
    }

    camera.position.copy(capsule.end);
    return playerOnFloor;
  }

  function throwBall(camera, capsule, playerDirection, playerVelocity, count) {
    const { sphere, velocity } = colliders[count % ballCount];

    camera.getWorldDirection(playerDirection);

    sphere.center
      .copy(capsule.end)
      .addScaledVector(playerDirection, capsule.radius * 1.5);

    velocity.copy(playerDirection).multiplyScalar(50);
    velocity.addScaledVector(playerVelocity, 2);
  }

  const [lastBoingTime, setLastBoingTime] = useState(0);
  const boingCooldown = 1000;

  function playerCollisions(capsule, octree, octreeBouncy, playerVelocity) {
    const result = octree.capsuleIntersect(capsule);
    const otherResult = octreeBouncy.capsuleIntersect(capsule);
    let playerOnFloor = false;
    if (result) {
      playerOnFloor = result.normal.y > 0;
      if (!playerOnFloor) {
        playerVelocity.addScaledVector(
          result.normal,
          -result.normal.dot(playerVelocity)
        );
      }
      capsule.translate(result.normal.multiplyScalar(result.depth));
    } else if (otherResult) {
      playerVelocity.y = 50;
      if (playAudio) {
        const now = Date.now();
        if (now - lastBoingTime > boingCooldown) {
          playBoingSound();
          setLastBoingTime(now);
        }
      }
    }
    return playerOnFloor;
  }

  function teleportPlayerIfOob(camera, capsule, playerVelocity) {
    if (camera.position.y <= -100) {
      playerVelocity.set(0, 0, 0);
      capsule.start.set(0, 10, 0);
      capsule.end.set(0, 11, 0);
      camera.position.copy(capsule.end);
      camera.rotation.set(0, 0, 0);
    }
  }

  const [isSoundPlayed, setIsSoundPlayed] = useState(false);
  const [lastPlayed, setLastPlayed] = useState(Date.now());

  useFrame(({ camera }, delta) => {
    controlsWASD(
      camera,
      delta,
      playerVelocity,
      playerOnFloor.current,
      playerDirection
    );
    const velocityMagnitude = playerVelocity.length();
    if (playerOnFloor.current) {
      if (playAudio) {
        if (
          velocityMagnitude > 1 &&
          !isSoundPlayed &&
          Date.now() - lastPlayed > 500
        ) {
          setIsSoundPlayed(true);
          playFootstep();
          setLastPlayed(Date.now());
          setTimeout(() => {
            setIsSoundPlayed(false);
          }, 500);
        } else if (velocityMagnitude <= 1) {
          setIsSoundPlayed(false);
        }
      }
    }
    const deltaSteps = Math.min(0.05, delta) / STEPS_PER_FRAME;
    for (let i = 0; i < STEPS_PER_FRAME; i++) {
      playerOnFloor.current = updatePlayer(
        camera,
        deltaSteps,
        octree,
        octreeBouncy,
        capsule,
        playerVelocity,
        playerOnFloor.current
      );
    }
    teleportPlayerIfOob(camera, capsule, playerVelocity);
  });

  useEffect(() => {
    keyboard["KeyW"] = upPressed;
    keyboard["KeyS"] = downPressed;
    keyboard["KeyA"] = leftPressed;
    keyboard["KeyD"] = rightPressed;
    keyboard["Space"] = spacePressed;
  }, [upPressed, downPressed, leftPressed, rightPressed, spacePressed]);
}
