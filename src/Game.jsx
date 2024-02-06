import { useGLTF, Environment } from "@react-three/drei";
import { useRef } from "react";
import SphereCollider from "./SphereCollider";
import Ball from "./Ball";
import useOctree from "./useOctree";
import Player from "./Player";
import useOctreeHelper from "./useOctreeHelper";
import Model from "./world-components/Platform";
import BouncyPlatform from "./world-components/BouncyPlatformer";
import Ocean from "./world-components/Ocean";
import Clouds from "./world-components/Clouds";
import GroundFoliage from "./world-components/GroundFoliage";
import TreeLeaves from "./world-components/TreeLeaves";
import Icoplant from "./world-components/Icoplant";
import Planets from "./world-components/Planets";
import * as Constants from "./Constants";
import Platformer from "./world-components/Platformer";
import { Physics, CuboidCollider, RigidBody } from "@react-three/rapier";

const hexToVec3 = (hex) => {
  hex = hex.replace(/^#/, "");
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);
  return [+(r / 255).toFixed(2), +(g / 255).toFixed(2), +(b / 255).toFixed(2)];
};

export default function Game() {
  const { scene } = useGLTF("/2.glb");
  const octree = useOctree(scene);
  useOctreeHelper(octree);

  const { scene: bouncyScene } = useGLTF("/4.glb");
  const octreeBouncy = useOctree(bouncyScene);
  useOctreeHelper(octreeBouncy);

  const colliders = useRef([]);
  console.log(colliders);

  function checkSphereCollisions(sphere, velocity) {
    for (let i = 0, length = colliders.current.length; i < length; i++) {
      const c = colliders.current[i];
      // console.log(c)

      if (c.sphere) {
        const d2 = sphere.center.distanceToSquared(c.sphere.center);
        const r = sphere.radius + c.sphere.radius;
        const r2 = r * r;

        if (d2 < r2) {
          const normal = Constants.v1
            .subVectors(sphere.center, c.sphere.center)
            .normalize();
          const impact1 = Constants.v2
            .copy(normal)
            .multiplyScalar(normal.dot(velocity));
          const impact2 = Constants.v3
            .copy(normal)
            .multiplyScalar(normal.dot(c.velocity));
          velocity.add(impact2).sub(impact1);
          c.velocity.add(impact1).sub(impact2);
          const d = (r - Math.sqrt(d2)) / 2;
          sphere.center.addScaledVector(normal, d);
          c.sphere.center.addScaledVector(normal, -d);
        }
      } else if (c.capsule) {
        const center = Constants.v1
          .addVectors(c.capsule.start, c.capsule.end)
          .multiplyScalar(0.5);
        const r = sphere.radius + c.capsule.radius;
        const r2 = r * r;
        for (const point of [c.capsule.start, c.capsule.end, center]) {
          const d2 = point.distanceToSquared(sphere.center);
          if (d2 < r2) {
            const normal = Constants.v1
              .subVectors(point, sphere.center)
              .normalize();
            const impact1 = Constants.v2
              .copy(normal)
              .multiplyScalar(normal.dot(c.velocity));
            const impact2 = Constants.v3
              .copy(normal)
              .multiplyScalar(normal.dot(velocity));
            c.velocity.add(impact2).sub(impact1);
            velocity.add(impact1).sub(impact2);
            const d = (r - Math.sqrt(d2)) / 2;
            sphere.center.addScaledVector(normal, -d);
          }
        }
      }
    }
  }

  return (
    <>
      <directionalLight intensity={1} position={[85.0, 80.0, 70.0]} />
      <Environment files="/img/rustig_koppie_puresky_1k.hdr" background />
      <GroundFoliage
        position={[0, 0, 13.5]}
        baseColor={hexToVec3("#69FF80")}
        bushesBaseColor={hexToVec3("#8CD15C")}
      />
      <Icoplant
        position={[-8.932, 0.35, 9.17]}
        baseColor={hexToVec3("#9670FF")}
        rando={1.0}
      />
      <Icoplant
        position={[-7.39, 0.381, 8.278]}
        baseColor={hexToVec3("#52C7FF")}
        rando={2.0}
      />
      <TreeLeaves
        position={[-11.184, -0.7, 7.569]}
        baseColor={hexToVec3("#8CD15C")}
      />
      <TreeLeaves
        position={[-7.151, 0.6, 5.939]}
        baseColor={hexToVec3("#8CD15C")}
      />
      <Ocean />
      <Clouds position-z={-300} position-y={-5} scale={10} />
      <Model />
      <BouncyPlatform />
      <Platformer />
      {Constants.balls.map(({ position }, i) => (
        <SphereCollider
          key={i}
          id={i}
          radius={Constants.radius}
          octree={octree}
          octreeBouncy={octreeBouncy}
          position={position}
          colliders={colliders.current}
          checkSphereCollisions={checkSphereCollisions}
        >
          <Ball radius={Constants.radius} />
        </SphereCollider>
      ))}
      <Player
        ballCount={Constants.ballCount}
        octree={octree}
        octreeBouncy={octreeBouncy}
        colliders={colliders.current}
      />
      <Planets />
      <Physics debug={true}>
        <RigidBody
          colliders="hull"
          gravityScale={0}
          onCollisionEnter={() => {
            console.log("Collision occureed");
          }}
        >
          <mesh position={[0, 5, 0]}>
            <CuboidCollider args={[1, 1, 1]} />
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="blue" />
          </mesh>
        </RigidBody>
      </Physics>
    </>
  );
}
