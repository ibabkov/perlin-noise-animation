import { ShaderCanvasContext, Uniform } from '../types';

function createUniformLocations(
	context: ShaderCanvasContext,
	uniforms: Record<string, Uniform>,
	shaderSources: string,
): Record<string, WebGLUniformLocation> {
	const { gl, shaderProgram } = context;
	const locations: Record<string, WebGLUniformLocation> = {};

	for (const uniformName in uniforms) {
		if (shaderSources.indexOf(uniformName) === -1) {
			continue;
		}

		const location = gl.getUniformLocation(shaderProgram, uniformName);

		if (!location) {
			throw new Error(`Uniform ${uniformName} not found in shader program`);
		}

		locations[uniformName] = location;
	}

	return locations;
}

export { createUniformLocations };
