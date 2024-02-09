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

export default function Player({ octree, octreeBouncy, colliders, ballCount }) {
  const { controlsMobile } = useContext(GameContext);
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

  function playFootstep() {
    const playerYPosition = capsule.start.y;

    if (playerYPosition < 0.6) {
      playRandomWaterSound();
    } else if (playerYPosition < 1.3) {
      playSandSound();
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

  const onPointerDown = () => {
    if (!canMove() || !isDesktop) return;
    throwBall(camera, capsule, playerDirection, playerVelocity, clicked++);
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
      const now = Date.now();
      if (now - lastBoingTime > boingCooldown) {
        playBoingSound();
        setLastBoingTime(now);
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
