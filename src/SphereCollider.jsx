import { useFrame } from "@react-three/fiber";
import { useEffect } from "react";
import { useMemo, useRef } from "react";
import { Sphere, Vector3 } from "three";
import * as Constants from "./Constants";

export default function SphereCollider({
  id,
  radius,
  octree,
  octreeBouncy,
  position,
  colliders,
  checkSphereCollisions,
  children,
}) {
  const ref = useRef();

  const sphere = useMemo(
    () => new Sphere(new Vector3(...position), radius),
    [position, radius]
  );
  const velocity = useMemo(() => new Vector3(), []);

  useEffect(() => {
    console.log("adding reference to this sphere collider");
    colliders[id] = { sphere: sphere, velocity: velocity };
  }, [colliders, id, sphere, velocity]);

  function updateSphere(delta, octree, octreeBouncy, sphere, velocity) {
    sphere.center.addScaledVector(velocity, delta);

    const result =
      octree.sphereIntersect(sphere) || octreeBouncy.sphereIntersect(sphere);

    if (result) {
      const bounceFactor = result === octree ? 1.5 : 5.5;
      const factor = -result.normal.dot(velocity) * bounceFactor;
      velocity.addScaledVector(result.normal, factor);
      sphere.center.add(result.normal.multiplyScalar(result.depth));
    } else {
      velocity.y -= Constants.Gravity * delta;
    }

    const dampingFactor = Math.exp(-1.5 * delta) - 1;
    velocity.addScaledVector(velocity, dampingFactor);

    checkSphereCollisions(sphere, velocity);

    ref.current.position.copy(sphere.center);
  }

  useFrame((_, delta) => {
    const deltaSteps = Math.min(0.05, delta) / Constants.frameSteps;
    for (let i = 0; i < Constants.frameSteps; i++) {
      updateSphere(deltaSteps, octree, octreeBouncy, sphere, velocity);
    }
  });

  return (
    <>
      <group ref={ref}>{children}</group>
    </>
  );
}
