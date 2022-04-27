#define PI 3.1415926
#define GRID_SIZE 0.25
#define GRID_SCALE 10.0
#define GRID_ROTATION_TIME_SCALE 0.02

#define BACKGROUND_TIME_SCALE 0.02
#define BACKGROUND_INITIAL_X_SHIFT 1.5

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
  vec2 staticUv = gl_FragCoord.xy/iResolution.xy;
  vec2 uv = staticUv;
  float aspectRatio = iResolution.x / iResolution.y;

  // Initial background shift
  uv.x += BACKGROUND_INITIAL_X_SHIFT;
  // Moving background
  uv += vec2(sin(iTime * BACKGROUND_TIME_SCALE), iTime * BACKGROUND_TIME_SCALE);
  // Fit bacground using aspect ratio
  uv.x *= aspectRatio;

  float strength = sin(getPerlinValue(uv, GRID_SIZE) * GRID_SCALE);
  vec4 backgroundColor = getBackgroundColor(staticUv, strength);

  gl_FragColor = vec4(backgroundColor);
}
