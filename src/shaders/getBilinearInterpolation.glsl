float getBilinearInterpolation(float f0, float f1, float f2, float f3, float lerpX, float lerpY) {
  float upper = mix(f1, f2, lerpX);
  float lower = mix(f0, f3, lerpX);

  return mix(lower, upper, lerpY);
}
