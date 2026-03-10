import { ShaderCanvasContext, Uniform } from '../types/webgl';

function createUniformLocations(context: ShaderCanvasContext, uniforms: Record<string, Uniform>): Record<string, WebGLUniformLocation> {
	const { gl, shaderProgram } = context;
	const locations: Record<string, WebGLUniformLocation> = {};

	for (const uniformName in uniforms) {
		const location = gl.getUniformLocation(shaderProgram, uniformName);

		if (location) {
			locations[uniformName] = location;
		}
	}

	return locations;
}

export { createUniformLocations };
