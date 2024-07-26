import { ShaderCanvasContext } from '../types';

function createBuffer(context: ShaderCanvasContext): WebGLBuffer {
	const { gl, shaderProgram } = context;
	const vertexPosition = gl.getAttribLocation(shaderProgram, 'aPosition');
	const vertices = new Float32Array([-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0]);

	const vertexBuffer = gl.createBuffer();

	if (!vertexBuffer) {
		throw new Error('An error occurred creating the vertex buffer');
	}

	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

	gl.vertexAttribPointer(vertexPosition, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vertexPosition);

	return vertexBuffer;
}

export { createBuffer };
