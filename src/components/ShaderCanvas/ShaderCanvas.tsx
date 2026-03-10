import React, { useRef, forwardRef, useImperativeHandle, useCallback } from 'react';

import { Uniform, Color } from '../../types/webgl';
import { useWebGLContext, useUniformLocations, useRenderLoop } from '../../hooks';
import { resizeCanvasToDisplaySize, updateUniforms } from '../../helpers';

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
	 * Device pixel ratio to be used for rendering.
	 * @default window.devicePixelRatio
	 */
	devicePixelRatio?: number;
	/**
	 * Clear color for the canvas.
	 * @default [0.0, 0.0, 0.0, 1.0]
	 */
	clearColor?: Color;
};

const DEFAULT_CLEAR_COLOR: Color = [0.0, 0.0, 0.0, 1.0];
const DEFAULT_UNIFORMS: Record<string, Uniform> = {
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
		uniforms = DEFAULT_UNIFORMS,
		clearColor = DEFAULT_CLEAR_COLOR,
	} = props;

	useImperativeHandle<HTMLCanvasElement | null, HTMLCanvasElement | null>(ref, () => internalRef.current);

	const { context, buffer } = useWebGLContext(internalRef, vertexShaderSource, fragmentShaderSource);

	const locations = useUniformLocations(context, uniforms);

	const render = useCallback(
		(time: number) => {
			const canvas = internalRef.current;
			if (!canvas || !context || !buffer) return;

			const { gl, shaderProgram } = context;
			const mergedUniforms = { ...DEFAULT_UNIFORMS, ...uniforms };

			resizeCanvasToDisplaySize(canvas);
			updateUniforms(context, { uniforms, mergedUniforms, locations, time });

			gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
			gl.useProgram(shaderProgram);
			gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

			gl.enable(gl.BLEND);
			gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
			gl.clearColor(...clearColor);
			gl.clear(gl.COLOR_BUFFER_BIT);
			gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
		},
		[context, buffer, uniforms, locations, clearColor],
	);

	useRenderLoop(render);

	return (
		<div style={{ width: '100%', height: '100%' }}>
			<canvas ref={internalRef} style={{ width: '100%', height: '100%' }} />
		</div>
	);
});
