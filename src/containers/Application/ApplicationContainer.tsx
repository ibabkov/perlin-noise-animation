'use client';

import React, { useRef } from 'react';

import backgroundFragmentShader from '../../shaders/backgroundFragmentShader.glsl';
import { ShaderCanvas } from '../../components/ShaderCanvas';
import { useCoordinates } from '../../hooks';

export const ApplicationContainer = () => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const coordinates = useCoordinates(canvasRef);
	const uniforms = React.useMemo(() => ({ uCoordinates: coordinates }), [coordinates]);

	return <ShaderCanvas ref={canvasRef} fragmentShader={backgroundFragmentShader} uniforms={uniforms} />;
};
