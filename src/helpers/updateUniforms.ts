import { ShaderCanvasContext, Uniform } from '../types/webgl';

export type UpdateUniformsOptions = {
	uniforms: Record<string, Uniform>;
	mergedUniforms: Record<string, Uniform>;
	locations: Record<string, WebGLUniformLocation>;
	time: number;
};

function updateUniforms(context: ShaderCanvasContext, options: UpdateUniformsOptions): void {
	const { gl } = context;

	for (const uniformName in options.locations) {
		const uniform = getUpdatedUniform(context, uniformName, options);
		const location = options.locations[uniformName];

		const methodName = `uniform${uniform.type}` as keyof WebGLRenderingContext;
		const method = gl[methodName];

		if (typeof method === 'function') {
			const values = Array.isArray(uniform.value) ? uniform.value : [uniform.value];
			(method as any).apply(gl, [location, ...values]);
		}
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
