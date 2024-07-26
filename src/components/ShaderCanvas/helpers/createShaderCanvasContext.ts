import { ShaderCanvasContext } from '../types';

function createShaderCanvasContext(
	canvas: HTMLCanvasElement,
	vertexShaderSource: string,
	fragmentShaderSource: string,
): ShaderCanvasContext {
	const gl = canvas.getContext('webgl') as WebGLRenderingContext;

	if (!gl) {
		throw new Error('An error occurred creating the webgl context');
	}

	const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
	const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
	const shaderProgram = createProgram(gl, vertexShader, fragmentShader);

	return {
		gl,
		canvas,
		shaderProgram,
		vertexShader,
		fragmentShader,
	};
}

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
	const shader = gl.createShader(type);

	if (!source) {
		throw new Error('An error occurred creating the shaders: empty shader');
	} else if (!shader) {
		throw new Error(`An error occurred creating the shaders: wrong type ${type}`);
	}

	gl.shaderSource(shader, source);
	gl.compileShader(shader);

	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		gl.deleteShader(shader);

		throw new Error(`An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`);
	}

	return shader;
}

function createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
	const program = gl.createProgram();

	if (!program) {
		throw new Error('An error occurred creating the webgl program');
	}

	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);
	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		throw new Error(`Unable to initialize the shader program: ${gl.getProgramInfoLog(program)}`);
	}
	gl.useProgram(program);

	return program;
}

export { createShaderCanvasContext };
