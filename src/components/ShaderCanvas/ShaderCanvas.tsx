import React, { useEffect, useRef } from 'react';
import { Color, Uniform } from './types';
import { createShaderCanvasContext, updateUniforms, createUniformLocations, resizeCanvasToDisplaySize, createBuffer } from './helpers';

export type ShaderCanvasProps = {
	/**
	 * Fragmet shader to be used in the shader program.
	 */
	fragmentShader: string;
	/**
	 * Vertex shader to be used in the shader program.
	 * @default `
	 *  attribute vec4 aPosition;
	 *  void main(void) {
	 *  gl_Position = aPosition;
	 *  }
	 *  `
	 */
	vertexShader?: string;
	/**
	 * Uniforms to be passed to the shader program.
	 * @default {
	 *   uResolution: { type: '2f', value: [number, number] },
	 *   uTime: { type: '1f', value: number },
	 * }
	 * uResolution: Resolution of the canvas.
	 * uTime: Time in seconds since the start of the program.
	 */
	uniforms?: Record<string, Uniform>;
	/**
	 * Clear color to be used when clearing the canvas.
	 * @default [0.0, 0.0, 0.0, 1.0]
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/clearColor
	 */
	clearColor?: Color;
	/**
	 * Device pixel ratio to be used for rendering.
	 * @default window.devicePixelRatio
	 */
	devicePixelRatio?: number;
};

const DEFAULT_CLEAR_COLOR: ShaderCanvasProps['clearColor'] = [0.0, 0.0, 0.0, 1.0];
const DEFAULT_UNIFORMS: ShaderCanvasProps['uniforms'] = {
	uResolution: { type: '2f', value: [0, 0] },
	uTime: { type: '1f', value: 0 },
};
const DEFAULT_VERTEX_SHADER: ShaderCanvasProps['vertexShader'] = `
  attribute vec4 aPosition;

  void main(void) {
    gl_Position = aPosition;
  }
`;

export const ShaderCanvas: React.FC<ShaderCanvasProps> = props => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const {
		vertexShader: vertexShaderSource = DEFAULT_VERTEX_SHADER,
		fragmentShader: fragmentShaderSource,
		uniforms = {},
		devicePixelRatio = typeof window === 'undefined' ? 1 : window.devicePixelRatio,
		clearColor = DEFAULT_CLEAR_COLOR,
	} = props;

	useEffect(() => {
		if (canvasRef.current) {
			let requestId: number | null = null;
			const mergedUniforms = { ...DEFAULT_UNIFORMS, ...uniforms };
			const context = createShaderCanvasContext(canvasRef.current, vertexShaderSource, fragmentShaderSource);
			const vertexBuffer = createBuffer(context);
			const locations = createUniformLocations(context, mergedUniforms, fragmentShaderSource + vertexShaderSource);
			const { gl } = context;

			const render = (time: number) => {
				if (!canvasRef.current) return;

				resizeCanvasToDisplaySize(canvasRef.current, devicePixelRatio);
				updateUniforms(context, { uniforms, mergedUniforms, locations, time });

				gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
				gl.useProgram(context.shaderProgram);
				gl.clearColor(...clearColor);
				gl.clear(gl.COLOR_BUFFER_BIT);
				gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

				requestId = requestAnimationFrame(render);
			};

			requestId = requestAnimationFrame(render);

			return () => {
				// Cleanup WebGL resources
				gl.deleteProgram(context.shaderProgram);
				gl.deleteShader(context.vertexShader);
				gl.deleteShader(context.fragmentShader);
				gl.deleteBuffer(vertexBuffer);

				if (requestId) {
					cancelAnimationFrame(requestId);
				}
			};
		}
	}, [vertexShaderSource, fragmentShaderSource, canvasRef.current, clearColor, devicePixelRatio]);

	return (
		<div style={{ width: '100%', height: '100%' }}>
			<canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
		</div>
	);
};
