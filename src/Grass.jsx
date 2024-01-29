import React, { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const vertexShader = `
varying vec2 vUv;
uniform float time;

float N (vec2 st) { // https://thebookofshaders.com/10/
    return fract( sin( dot( st.xy, vec2(12.9898,78.233 ) ) ) *  43758.5453123);
}

float smoothNoise( vec2 ip ){ // https://www.youtube.com/watch?v=zXsWftRdsvU
    vec2 lv = fract( ip );
  vec2 id = floor( ip );
  
  lv = lv * lv * ( 3. - 2. * lv );
  
  float bl = N( id );
  float br = N( id + vec2( 1, 0 ));
  float b = mix( bl, br, lv.x );
  
  float tl = N( id + vec2( 0, 1 ));
  float tr = N( id + vec2( 1, 1 ));
  float t = mix( tl, tr, lv.x );
  
  return mix( b, t, lv.y );
}

  void main() {

  vUv = uv;
  float t = time * 2.;
  
  // VERTEX POSITION
  
  vec4 mvPosition = vec4( position, 1.0 );
  #ifdef USE_INSTANCING
      mvPosition = instanceMatrix * mvPosition;
  #endif
  
  // DISPLACEMENT
  
  float noise = smoothNoise(mvPosition.xz * 0.5 + vec2(0., t));
  noise = pow(noise * 0.5 + 0.5, 2.) * 2.;
  
  // here the displacement is made stronger on the blades tips.
  float dispPower = 1. - cos( uv.y * 3.1416 * 0.5 );
  
  float displacement = noise * ( 0.3 * dispPower );
  mvPosition.z -= displacement;
  
  //
  
  vec4 modelViewPosition = modelViewMatrix * mvPosition;
  gl_Position = projectionMatrix * modelViewPosition;

  }
`; // Your vertex shader code
const fragmentShader = `
varying vec2 vUv;

void main() {
    vec3 baseColor = vec3( 0.41, 1.0, 0.5 );
  float clarity = ( vUv.y * 0.875 ) + 0.125;
  gl_FragColor = vec4( baseColor * clarity, 1 );
}
`; // Your fragment shader code

export default function Grass(props) {
  const meshRef = useRef();
  const { clock } = useThree();
  const { nodes } = useGLTF("/grass.glb");

  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
    }),
    []
  );

  const leavesMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
        side: THREE.DoubleSide,
      }),
    [uniforms]
  );

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(0.1, 1, 1, 4);
    geo.translate(0, 0.5, 0);
    return geo;
  }, []);

  useEffect(() => {
    const instanceNumber = 30000;
    const dummy = new THREE.Object3D();
    const ovalRadiusX = 20 * props.scale; // The x radius of the oval
    const ovalRadiusZ = 10 * props.scale; // The z radius of the oval

    for (let i = 0; i < instanceNumber; i++) {
      const angle = Math.random() * Math.PI * 2; // Random angle
      const radiusValue = Math.sqrt(Math.random()); // Uniformly distributed radius
      const x = Math.cos(angle) * ovalRadiusX * radiusValue;
      const z = Math.sin(angle) * ovalRadiusZ * radiusValue;

      dummy.position.set(x, 0, z);
      dummy.scale.setScalar(0.5 + Math.random() * 0.5);
      dummy.rotation.y = Math.random() * Math.PI;

      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  useFrame(() => {
    uniforms.time.value = clock.getElapsedTime();
  });

  return (
    <instancedMesh
      position={props.position}
      ref={meshRef}
      args={[geometry, leavesMaterial, 5000]}
    />
  );
}