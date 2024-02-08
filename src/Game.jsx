import { useGLTF, Environment } from "@react-three/drei";
import { useRef } from "react";
import SphereCollider from "./SphereCollider";
import Ball from "./Ball";
import useOctree from "./useOctree";
import Player from "./Player";
// import useOctreeHelper from "./useOctreeHelper";
import Model from "./world-components/Platform";
// import RagingSea from "./world-components/RagingSea";
// import Water from "./world-components/Water";
// import Clouds from "./world-components/Clouds";
import GroundFoliage from "./world-components/GroundFoliage";
import TreeLeaves from "./world-components/TreeLeaves";
import Icoplant from "./world-components/Icoplant";
import Planets from "./world-components/Planets";
import * as Constants from "./Constants";
import Platformer from "./world-components/Platformer";
import Ocean from "./world-components/Ocean";
import Beach from "./world-components/Beach";
import Trees from "./world-components/Trees";
import Grass from "./world-components/Grass";
import SpiralPlant from "./world-components/SpiralPlant";
// import Clouds from "./world-components/Clouds";

const hexToVec3 = (hex) => {
  hex = hex.replace(/^#/, "");
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);
  return [+(r / 255).toFixed(2), +(g / 255).toFixed(2), +(b / 255).toFixed(2)];
};

function randomizeBH(baseValue) {
  return baseValue + (Math.random() * 0.2 - 0.1);
}

export default function Game() {
  const { scene } = useGLTF("/2.glb");
  const octree = useOctree(scene);
  // useOctreeHelper(octree);

  const { scene: bouncyScene } = useGLTF("/3.glb");
  const octreeBouncy = useOctree(bouncyScene);
  // useOctreeHelper(octreeBouncy);

  const { scene: ballHitScene } = useGLTF("4.glb");
  const octreeBallHit = useOctree(ballHitScene);
  // useOctreeHelper(octreeBallHit);

  const colliders = useRef([]);

  function checkSphereCollisions(sphere, velocity) {
    for (let i = 0, length = colliders.current.length; i < length; i++) {
      const c = colliders.current[i];

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

  const divideBy = 1.4;

  return (
    <>
      <Environment files="/img/rustig_koppie_puresky_1k.hdr" background />
      <directionalLight intensity={1} position={[85.0, 80.0, 70.0]} />
      <SpiralPlant />
      <GroundFoliage
        position={[-8.932, 0.3, 9.17]}
        rotation-y={Math.PI / 2}
        bushesBaseColor={hexToVec3("#8CD15C")}
      />
      <GroundFoliage
        position={[-7.4, 0.3, 8.5]}
        bushesBaseColor={hexToVec3("#8CD15C")}
      />
      <Grass
        position={[-10, 0, 7]}
        rotation-y={Math.PI / 4}
        options={{ bW: 0.06, bH: randomizeBH(0.5), joints: 5 }}
        width={15}
        instances={1000 / divideBy}
      />
      <Grass
        position={[-7, 0, 8]}
        rotation-y={Math.PI / 3}
        options={{ bW: 0.06, bH: randomizeBH(0.5), joints: 5 }}
        width={15}
        instances={1100 / divideBy}
      />
      <Grass
        position={[-8.5, 0, 7.5]}
        rotation-y={Math.PI / 3}
        options={{ bW: 0.06, bH: randomizeBH(0.5), joints: 5 }}
        width={20}
        instances={100 / divideBy}
      />
      <Grass
        position={[-8.5, 0, 6.5]}
        rotation-y={Math.PI / 3}
        options={{ bW: 0.06, bH: randomizeBH(0.5), joints: 5 }}
        width={25}
        instances={900 / divideBy}
      />
      <Grass
        position={[-8.5, 0, 6.5]}
        rotation-y={Math.PI / 3}
        options={{ bW: 0.06, bH: randomizeBH(0.5), joints: 5 }}
        width={20}
        instances={800 / divideBy}
      />
      <Grass
        position={[-8.5, 0, 4.5]}
        rotation-y={Math.PI / 3}
        options={{ bW: 0.06, bH: randomizeBH(0.5), joints: 5 }}
        width={26}
        instances={600 / divideBy}
      />
      <Grass
        position={[-6.5, 0, 9.5]}
        rotation-y={Math.PI / 3}
        options={{ bW: 0.06, bH: randomizeBH(0.5), joints: 5 }}
        width={22}
        instances={600 / divideBy}
      />
      <Icoplant
        position={[-8.932, 0.1, 9.17]}
        baseColor={hexToVec3("#9670FF")}
        rando={1.0}
      />
      <Icoplant
        position={[-7.39, 0.1, 8.278]}
        baseColor={hexToVec3("#52C7FF")}
        rando={2.0}
      />
      <TreeLeaves
        position={[-11.484, -0.7, 7.669]}
        baseColor={hexToVec3("#8CD15C")}
      />
      <TreeLeaves
        position={[-7.751, 0.6, 5.939]}
        baseColor={hexToVec3("#8CD15C")}
      />
      {/* <Water /> */}
      <Ocean />
      <Beach />
      <Trees position-y={-0.1} />
      {/* <RagingSea /> */}
      {/* <Clouds position-z={-300} position-y={-5} scale={10} /> */}
      <Model />
      <Platformer />
      {Constants.balls.map(({ position }, i) => (
        <SphereCollider
          key={i}
          id={i}
          radius={Constants.radius}
          octree={octree}
          octreeBouncy={octreeBouncy}
          octreeBallHit={octreeBallHit}
          position={position}
          colliders={colliders.current}
          checkSphereCollisions={checkSphereCollisions}
        >
          <Ball radius={Constants.radius} />
        </SphereCollider>
      ))}

      <Planets />
      {/* <Clouds /> */}
      {/* <ContactShadows
        opacity={1}
        scale={10}
        blur={1}
        frames={1}
        far={1000}
        resolution={256}
        color="#000000"
        position-y={1}
      /> */}
      <Player
        ballCount={Constants.ballCount}
        octree={octree}
        octreeBouncy={octreeBouncy}
        colliders={colliders.current}
      />
    </>
  );
}
