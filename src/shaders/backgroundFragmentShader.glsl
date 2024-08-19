#version 100
precision highp float;

#define PI 3.1415926
#define GRID_SIZE 0.25
#define GRID_SCALE 10.0
#define GRID_ROTATION_TIME_SCALE 0.02

#define BACKGROUND_THRESHOLD 0.42
#define BACKGROUND_TIME_SCALE 0.02
#define BACKGROUND_INITIAL_X_SHIFT 2.0
#define BACKGROUND_DISTORTION 5.0

uniform vec2 uCoordinates;
uniform vec2 uResolution;
uniform float uTime;

@import ./hash;
@import ./getRandomVector;
@import ./getBilinearInterpolation;
@import ./getPerlinValue;

vec4 getBackgroundColor(vec2 uv, float s) {
	float strength = sin(s);
  vec4 transparentColor = vec4(0.1, 0.1, 0.1, 1.0);
  vec4 uvColor = vec4((uv.y + uv.x) * 0.6, 0.0, 0.6, 1.0);

	strength *= step(BACKGROUND_THRESHOLD, sin(s));

  return mix(transparentColor, uvColor, strength);
}

void main(void) {
	float aspectRatio = uResolution.x / uResolution.y;
	vec2 staticUv = vec2(gl_FragCoord.x / uResolution.x * aspectRatio, gl_FragCoord.y / uResolution.y);
	vec2 coordinates = vec2(uCoordinates.x * aspectRatio, uCoordinates.y);
	vec2 uv = vec2(staticUv.x + BACKGROUND_INITIAL_X_SHIFT, staticUv.y);
	float distance = length(staticUv - coordinates);

	// Moving background
	uv += vec2(sin(uTime * BACKGROUND_TIME_SCALE), uTime * BACKGROUND_TIME_SCALE);

  float strength = getPerlinValue(uv, distance, GRID_SIZE) * GRID_SCALE;
  vec4 backgroundColor = getBackgroundColor(staticUv, strength);

  gl_FragColor = backgroundColor;
}
