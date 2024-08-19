import { ShaderCanvasContext, Uniform } from '../types';

export type UpdateUniformsOptions = {
	uniforms: Record<string, Uniform>;
	mergedUniforms: Record<string, Uniform>;
	locations: Record<string, WebGLUniformLocation>;
	time: number;
};

function updateUniforms(context: ShaderCanvasContext, options: UpdateUniformsOptions): void {
	for (const uniformName in options.locations) {
		const uniform = getUpdatedUniform(context, uniformName, options);
		const location = options.locations[uniformName];

		const method = context.gl[`uniform${uniform.type}`].bind(context.gl) as unknown as (...args: any[]) => void;
		const values = Array.isArray(uniform.value) ? uniform.value : [uniform.value];

		method(location, ...values);
	}
}

function getUpdatedUniform(context: ShaderCanvasContext, uniformName: string, options: UpdateUniformsOptions) {
	const { uniforms, mergedUniforms, time } = options;

	if (uniforms[uniformName]) {
		return uniforms[uniformName];
	}

	if (uniformName === 'uTime') {
		mergedUniforms[uniformName].value = time * 0.001;
	} else if (uniformName === 'uResolution') {
		mergedUniforms[uniformName].value = [context.canvas.width, context.canvas.height];
	}

	return mergedUniforms[uniformName];
}

export { updateUniforms };
