// Based on https://codepen.io/al-ro/pen/jJJygQ by al-ro, but rewritten in react-three-fiber
import * as THREE from "three";
import React, { useRef, useMemo, useEffect } from "react";
import SimplexNoise from "simplex-noise";
import { useFrame, useLoader } from "@react-three/fiber";
//These have been taken from "Realistic real-time grass rendering" by Eddie Lee, 2010
import bladeDiffuse from "/textures/grass/blade_diffuse.jpg";
import bladeAlpha from "/textures/grass/blade_alpha.jpg";
import "./GrassMaterial";

const simplex = new SimplexNoise(Math.random);

export default function Grass({
  options = { bW: 0.06, bH: 0.5, joints: 5 },
  width = 100,
  instances = 10000,
  ...props
}) {
  const { bW, bH, joints } = options;
  const materialRef = useRef();
  const [texture, alphaMap] = useLoader(THREE.TextureLoader, [
    bladeDiffuse,
    bladeAlpha,
  ]);
  const attributeData = useMemo(
    () => getAttributeData(instances, width),
    [instances, width]
  );
  const baseGeom = useMemo(
    () => new THREE.PlaneGeometry(bW, bH, 1, joints).translate(0, bH / 2, 0),
    [options]
  );
  const groundGeo = useMemo(() => {
    const geo = new THREE.PlaneGeometry(width, width, 32, 32);
    const positions = geo.attributes.position.array; // Access the positions array

    // Loop through the position array. Since each vertex position is represented by x, y, z,
    // you need to increment by 3 for each vertex.
    for (let i = 0; i < positions.length; i += 3) {
      // Access the x and z positions of the vertex
      const x = positions[i];
      const z = positions[i + 2];
      // Modify the y position based on your getYPosition function
      positions[i + 1] = getYPosition(x, z); // Update the y position
    }

    // After modifying the vertices, you need to tell Three.js that the position needs to be updated
    geo.attributes.position.needsUpdate = true;

    // Recompute vertex normals to reflect the changes in the geometry
    geo.computeVertexNormals();

    return geo;
  }, [width]);
  useFrame(
    (state) =>
      (materialRef.current.uniforms.time.value = state.clock.elapsedTime / 4)
  );

  const groundMeshRef = useRef(); // Create a ref for the ground mesh

  useEffect(() => {
    if (groundMeshRef.current) {
      groundMeshRef.current.frustumCulled = false; // Disable frustum culling
    }
  }, []);

  return (
    <group {...props}>
      <mesh ref={groundMeshRef}>
        <instancedBufferGeometry
          index={baseGeom.index}
          attributes-position={baseGeom.attributes.position}
          attributes-uv={baseGeom.attributes.uv}
        >
          <instancedBufferAttribute
            attach="attributes-offset"
            args={[new Float32Array(attributeData.offsets), 3]}
          />
          <instancedBufferAttribute
            attach="attributes-orientation"
            args={[new Float32Array(attributeData.orientations), 4]}
          />
          <instancedBufferAttribute
            attach="attributes-stretch"
            args={[new Float32Array(attributeData.stretches), 1]}
          />
          <instancedBufferAttribute
            attach="attributes-halfRootAngleSin"
            args={[new Float32Array(attributeData.halfRootAngleSin), 1]}
          />
          <instancedBufferAttribute
            attach="attributes-halfRootAngleCos"
            args={[new Float32Array(attributeData.halfRootAngleCos), 1]}
          />
        </instancedBufferGeometry>
        <grassMaterial
          ref={materialRef}
          map={texture}
          alphaMap={alphaMap}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0, 0, 0]} geometry={groundGeo}>
        <meshStandardMaterial color="#000f00" />
      </mesh>
    </group>
  );
}

function getAttributeData(instances, width) {
  const offsets = [];
  const orientations = [];
  const stretches = [];
  const halfRootAngleSin = [];
  const halfRootAngleCos = [];

  let quaternion_0 = new THREE.Vector4();
  let quaternion_1 = new THREE.Vector4();

  // The min and max angle for the growth direction (in radians)
  const min = -0.25;
  const max = 0.25;

  // Define the radii for the ellipse
  const radiusX = width / 4; // Full width of the plane
  const radiusY = width / 8; // Half the width of the plane, making radiusX : radiusY = 2

  // For each instance of the grass blade
  for (let i = 0; i < instances; i++) {
    // Generate offsets within an ellipse
    let angle = Math.random() * 2 * Math.PI; // Random angle
    let r = Math.sqrt(Math.random()); // Random distance from center, square root for uniform distribution
    const offsetX = r * Math.cos(angle) * radiusX;
    const offsetZ = r * Math.sin(angle) * radiusY;
    const offsetY = getYPosition(offsetX, offsetZ); // Assuming getYPosition is defined elsewhere
    offsets.push(offsetX, offsetY, offsetZ);

    // Define random growth directions
    // Rotate around Y
    angle = Math.PI - Math.random() * (2 * Math.PI);
    halfRootAngleSin.push(Math.sin(0.5 * angle));
    halfRootAngleCos.push(Math.cos(0.5 * angle));

    let RotationAxis = new THREE.Vector3(0, 1, 0);
    let x = RotationAxis.x * Math.sin(angle / 2.0);
    let y = RotationAxis.y * Math.sin(angle / 2.0);
    let z = RotationAxis.z * Math.sin(angle / 2.0);
    let w = Math.cos(angle / 2.0);
    quaternion_0.set(x, y, z, w).normalize();

    // Rotate around X
    angle = Math.random() * (max - min) + min;
    RotationAxis = new THREE.Vector3(1, 0, 0);
    x = RotationAxis.x * Math.sin(angle / 2.0);
    y = RotationAxis.y * Math.sin(angle / 2.0);
    z = RotationAxis.z * Math.sin(angle / 2.0);
    w = Math.cos(angle / 2.0);
    quaternion_1.set(x, y, z, w).normalize();

    // Combine rotations to a single quaternion
    quaternion_0 = multiplyQuaternions(quaternion_0, quaternion_1);

    // Rotate around Z
    angle = Math.random() * (max - min) + min;
    RotationAxis = new THREE.Vector3(0, 0, 1);
    x = RotationAxis.x * Math.sin(angle / 2.0);
    y = RotationAxis.y * Math.sin(angle / 2.0);
    z = RotationAxis.z * Math.sin(angle / 2.0);
    w = Math.cos(angle / 2.0);
    quaternion_1.set(x, y, z, w).normalize();

    // Combine rotations to a single quaternion
    quaternion_0 = multiplyQuaternions(quaternion_0, quaternion_1);

    orientations.push(
      quaternion_0.x,
      quaternion_0.y,
      quaternion_0.z,
      quaternion_0.w
    );

    // Define variety in height
    if (i < instances / 3) {
      stretches.push(Math.random() * 1.8);
    } else {
      stretches.push(Math.random());
    }
  }

  return {
    offsets,
    orientations,
    stretches,
    halfRootAngleCos,
    halfRootAngleSin,
  };
}

function multiplyQuaternions(q1, q2) {
  const x = q1.x * q2.w + q1.y * q2.z - q1.z * q2.y + q1.w * q2.x;
  const y = -q1.x * q2.z + q1.y * q2.w + q1.z * q2.x + q1.w * q2.y;
  const z = q1.x * q2.y - q1.y * q2.x + q1.z * q2.w + q1.w * q2.z;
  const w = -q1.x * q2.x - q1.y * q2.y - q1.z * q2.z + q1.w * q2.w;
  return new THREE.Vector4(x, y, z, w);
}

// function getYPosition(x, z) {
//   var y = 2 * simplex.noise2D(x / 50, z / 50);
//   y += 4 * simplex.noise2D(x / 100, z / 100);
//   y += 0.2 * simplex.noise2D(x / 10, z / 10);
//   return y;
// }
function getYPosition(x, z) {
  return 0; // Fixed y position for all grass blades
}
