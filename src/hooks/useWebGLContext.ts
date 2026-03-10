import { useEffect, useState } from 'react';
import { ShaderCanvasContext } from '../types/webgl';
import { createShaderCanvasContext, createBuffer } from '../helpers';

export const useWebGLContext = (
	canvasRef: React.RefObject<HTMLCanvasElement | null>,
	vertexShaderSource: string,
	fragmentShaderSource: string,
) => {
	const [state, setState] = useState<{
		context: ShaderCanvasContext | null;
		buffer: WebGLBuffer | null;
	}>({
		context: null,
		buffer: null,
	});

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const context = createShaderCanvasContext(canvas, vertexShaderSource, fragmentShaderSource);
		const buffer = createBuffer(context);

		setState({ context, buffer });

		return () => {
			const { gl, shaderProgram, vertexShader, fragmentShader } = context;
			gl.deleteProgram(shaderProgram);
			gl.deleteShader(vertexShader);
			gl.deleteShader(fragmentShader);
			gl.deleteBuffer(buffer);
			setState({ context: null, buffer: null });
		};
	}, [canvasRef, vertexShaderSource, fragmentShaderSource]);

	return state;
};
