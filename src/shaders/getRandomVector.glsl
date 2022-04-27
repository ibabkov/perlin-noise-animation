vec2 getRandomVector(float seed) {
  vec2 vec;

  if (seed < .25) {
    vec = vec2(1., 1.);
  } else if (seed < .5) {
    vec = vec2(-1., 1.);
  } else if (seed < .75) {
    vec = vec2(1., -1.);
  } else {
    vec = vec2(-1., -1.);
  }

  return vec;
}
