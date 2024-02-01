varying vec2 vUv;

void main() {
    vec3 baseColor = vec3(140.0 / 255.0, 209.0 / 255.0, 92.0 / 255.0);
    float clarity = ( vUv.y * 0.875 ) + 0.125;
    gl_FragColor = vec4( baseColor * clarity, 1.0 );
}