import { useRef, useState, useContext, useEffect, useMemo } from "react";
import { Capsule } from "three/examples/jsm/math/Capsule.js";
import { Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import useKeyboard from "./useKeyboard";
import { GameContext } from "./GameContext";
import useSound from "use-sound";
import soundFile from "/sounds/step.mp3";

const GRAVITY = 30;
const STEPS_PER_FRAME = 5;

export default function Player({ octree }) {
  const { controlsMobile } = useContext(GameContext);
  const { upPressed, downPressed, leftPressed, rightPressed, spacePressed } =
    controlsMobile;

  const [playSound, sound] = useSound(soundFile, { volume: 0.2 });

  const playerOnFloor = useRef(false);
  const playerVelocity = useMemo(() => new Vector3(), []);
  const playerDirection = useMemo(() => new Vector3(), []);
  const capsule = useMemo(
    () => new Capsule(new Vector3(0, 0, 0), new Vector3(0, 1, 0), 0.5),
    []
  );

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
    const speedDelta = delta * (playerOnFloor ? 25 : 8);
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
    capsule,
    playerVelocity,
    playerOnFloor
  ) {
    let damping = Math.exp(-8 * delta) - 1;
    if (!playerOnFloor) {
      playerVelocity.y -= GRAVITY * delta;
      damping *= 0.1; // small air resistance
    }
    playerVelocity.addScaledVector(playerVelocity, damping);
    const deltaPosition = playerVelocity.clone().multiplyScalar(delta);
    capsule.translate(deltaPosition);
    playerOnFloor = playerCollisions(capsule, octree, playerVelocity);
    camera.position.copy(capsule.end);
    return playerOnFloor;
  }

  function playerCollisions(capsule, octree, playerVelocity) {
    const result = octree.capsuleIntersect(capsule);
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
      if (
        velocityMagnitude > 1 &&
        !isSoundPlayed &&
        Date.now() - lastPlayed > 500
      ) {
        setIsSoundPlayed(true);
        if (!sound.isPlaying) {
          playSound();
          setLastPlayed(Date.now());
          setTimeout(() => {
            setIsSoundPlayed(false);
          }, 500);
        }
      } else if (velocityMagnitude <= 1) {
        setIsSoundPlayed(false);
      }
    }
    const deltaSteps = Math.min(0.05, delta) / STEPS_PER_FRAME;
    for (let i = 0; i < STEPS_PER_FRAME; i++) {
      playerOnFloor.current = updatePlayer(
        camera,
        deltaSteps,
        octree,
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
