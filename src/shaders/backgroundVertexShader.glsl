#version 100
precision mediump float;

attribute vec4 aVertexPosition;

void main(void) {
  gl_Position = aVertexPosition;
}
