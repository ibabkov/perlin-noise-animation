import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

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
	 *  #version 100
	 *  precision mediump float;
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
  #version 100
  precision mediump float;
  attribute vec4 aPosition;

  void main(void) {
    gl_Position = aPosition;
  }
`;

export const ShaderCanvas = forwardRef<HTMLCanvasElement | null, ShaderCanvasProps>(function ShaderCanvas(props, ref) {
	const internalRef = useRef<HTMLCanvasElement | null>(null);
	const {
		vertexShader: vertexShaderSource = DEFAULT_VERTEX_SHADER,
		fragmentShader: fragmentShaderSource,
		uniforms = {},
		clearColor = DEFAULT_CLEAR_COLOR,
	} = props;

	useImperativeHandle<HTMLCanvasElement | null, HTMLCanvasElement | null>(ref, () => internalRef.current);

	useEffect(() => {
		const canvas = internalRef.current;
		if (canvas) {
			let requestId: number | null = null;
			const mergedUniforms = { ...DEFAULT_UNIFORMS, ...uniforms };
			const context = createShaderCanvasContext(canvas, vertexShaderSource, fragmentShaderSource);
			const vertexBuffer = createBuffer(context);
			const locations = createUniformLocations(context, mergedUniforms, fragmentShaderSource + vertexShaderSource);
			const { gl } = context;

			const render = (time: number) => {
				if (!canvas) return;

				resizeCanvasToDisplaySize(canvas);
				updateUniforms(context, { uniforms, mergedUniforms, locations, time });

				gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
				gl.useProgram(context.shaderProgram);
				gl.enable(gl.BLEND);
				gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
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
	}, [vertexShaderSource, fragmentShaderSource, internalRef.current, clearColor, uniforms]);

	return (
		<div style={{ width: '100%', height: '100%' }}>
			<canvas ref={internalRef} style={{ width: '100%', height: '100%' }} />
		</div>
	);
});
