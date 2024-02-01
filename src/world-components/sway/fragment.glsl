varying vec2 vUv;
uniform vec3 baseColor;

void main() {
    float clarity = ( vUv.y * 2.0 ) + 0.125;
    gl_FragColor = vec4( baseColor * clarity, 1 );
}