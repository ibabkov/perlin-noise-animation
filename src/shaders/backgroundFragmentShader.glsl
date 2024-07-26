#version 100
precision mediump float;

#define PI 3.1415926
#define GRID_SIZE 0.25
#define GRID_SCALE 10.0
#define GRID_ROTATION_TIME_SCALE 0.02

#define BACKGROUND_TIME_SCALE 0.02
#define BACKGROUND_INITIAL_X_SHIFT 1.5

uniform vec2 uResolution;
uniform float uTime;


@import ./hash;
@import ./getRandomVector;
@import ./getBilinearInterpolation;
@import ./getPerlinValue;


vec4 getBackgroundColor(vec2 uv, float strength) {
  vec4 transparentColor = vec4(0.0);
  vec4 uvColor = vec4((uv.y + uv.x) * 0.5, 0.0, 0.5, 0.01);

  return mix(transparentColor, uvColor, strength);
}

void main(void) {
  vec2 staticUv = gl_FragCoord.xy / uResolution;
  vec2 uv = staticUv;
  float aspectRatio = uResolution.x / uResolution.y;

  // Initial background shift
  uv.x += BACKGROUND_INITIAL_X_SHIFT;
  // Moving background
  uv += vec2(sin(uTime * BACKGROUND_TIME_SCALE), uTime * BACKGROUND_TIME_SCALE);
  // Fit background using aspect ratio
  uv.x *= aspectRatio;

  float strength = sin(getPerlinValue(uv, GRID_SIZE) * GRID_SCALE);
  vec4 backgroundColor = getBackgroundColor(staticUv, strength);

  gl_FragColor = backgroundColor;
}
