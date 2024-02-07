varying vec2 vUv;
uniform vec3 baseColor;
uniform float multiplier;
uniform sampler2D map;
uniform bool useTexture;

void main() {
    float clarity = ( vUv.y * multiplier ) + 0.125;
    if(useTexture) {
        vec4 texColor = texture2D(map, vUv);
        vec3 mixedColor = mix(baseColor, texColor.rgb, texColor.a);
        gl_FragColor = vec4( mixedColor * clarity, 1 );
    } else {
        gl_FragColor = vec4( baseColor * clarity, 1 );
    }

}