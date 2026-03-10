import { useEffect, useState } from 'react';
import { ShaderCanvasContext, Uniform } from '../types/webgl';
import { createUniformLocations } from '../helpers';

const DEFAULT_UNIFORMS: Record<string, Uniform> = {
	uResolution: { type: '2f', value: [0, 0] },
	uTime: { type: '1f', value: 0 },
};

export const useUniformLocations = (context: ShaderCanvasContext | null, uniforms: Record<string, Uniform>) => {
	const [locations, setLocations] = useState<Record<string, WebGLUniformLocation>>({});

	useEffect(() => {
		if (!context) return;

		const mergedUniforms = { ...DEFAULT_UNIFORMS, ...uniforms };
		setLocations(createUniformLocations(context, mergedUniforms));
	}, [context, uniforms]);

	return locations;
};
