uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform float uColorOffset;
uniform float uColorMultiplier;

varying float vElevation;

#include <fog_pars_fragment>

void main()
{
    float mixStrength = (vElevation + uColorOffset) * uColorMultiplier;
    vec3 color = mix(uDepthColor, uSurfaceColor, mixStrength);
    
    gl_FragColor = vec4(color, 1.0);
    #include <fog_fragment>
    #include <colorspace_fragment>
}