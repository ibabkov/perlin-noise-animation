export type ShaderCanvasContext = {
	canvas: HTMLCanvasElement;
	gl: WebGLRenderingContext;
	shaderProgram: WebGLProgram;
	vertexShader: WebGLShader;
	fragmentShader: WebGLShader;
};

// prettier-ignore
export type UniformType = '1f' | '2f' | '3f' | '4f' | '1fv' | '2fv' | '3fv' | '4fv' | '1i' | '2i' | '3i' | '4i' | '1iv' | '2iv' | '3iv' | '4iv';
// prettier-ignore
export type UniformMethod = 'uniform1f' | 'uniform2f' | 'uniform3f' | 'uniform4f' | 'uniform1fv' | 'uniform2fv' | 'uniform3fv' | 'uniform4fv' | 'uniform1i' | 'uniform2i' | 'uniform3i' | 'uniform4i' | 'uniform1iv' | 'uniform2iv' | 'uniform3iv' | 'uniform4iv';
export type Uniform<T = any> = {
	type: UniformType;
	value: T;
};
export type Color = [number, number, number, number];
