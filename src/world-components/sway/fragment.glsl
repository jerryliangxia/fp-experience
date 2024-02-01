varying vec2 vUv;
uniform vec3 baseColor;
uniform float multiplier;

void main() {
    float clarity = ( vUv.y * multiplier ) + 0.125;
    gl_FragColor = vec4( baseColor * clarity, 1 );
}