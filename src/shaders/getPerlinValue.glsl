mat2 createRotationMatrix(float rotation) {
  return mat2(
    cos(rotation), -sin(rotation),
    sin(rotation), cos(rotation)
  );
}

float getModifiedDot(vec2 uv, vec2 p, float gridDimension, float pHash) {
  float rotation = sin(uTime * GRID_ROTATION_TIME_SCALE + pHash) * 2. * PI;
  if (pHash < .5) {
    rotation *= -1.;
  }
  mat2 rotationMatrix = createRotationMatrix(rotation);

  return dot((uv - p) / gridDimension, getRandomVector(pHash) * rotationMatrix);
}

float getPerlinValue(vec2 uv, float gridDimension) {
  float xCoord = floor(uv.x / gridDimension) * gridDimension;
  float yCoord = floor(uv.y / gridDimension) * gridDimension;

  float xIndex = floor(uv.x / gridDimension);
  float yIndex = floor(uv.y / gridDimension);

  float p0Hash = hash(vec2(xIndex, yIndex));
  float p1Hash = hash(vec2(xIndex, yIndex + 1.));
  float p2Hash = hash(vec2(xIndex + 1., yIndex + 1.));
  float p3Hash = hash(vec2(xIndex + 1., yIndex));

  vec2 p0 = vec2(xCoord, yCoord);
  vec2 p1 = vec2(xCoord, yCoord + gridDimension);
  vec2 p2 = vec2(xCoord + gridDimension, yCoord + gridDimension);
  vec2 p3 = vec2(xCoord + gridDimension, yCoord);

  float rotation = sin(uTime * .15) * 2. * PI;
  mat2 rotationMatrix = createRotationMatrix(rotation);

  float dot0 = getModifiedDot(uv, p0, gridDimension, p0Hash);
  float dot1 = getModifiedDot(uv, p1, gridDimension, p1Hash);
  float dot2 = getModifiedDot(uv, p2, gridDimension, p2Hash);
  float dot3 = getModifiedDot(uv, p3, gridDimension, p3Hash);

  float xInterp = smoothstep(p0.x, p2.x, uv.x);
  float yInterp = smoothstep(p0.y, p2.y, uv.y);

  float value = getBilinearInterpolation(dot0, dot1, dot2, dot3, xInterp, yInterp);

  return abs(value);
}
