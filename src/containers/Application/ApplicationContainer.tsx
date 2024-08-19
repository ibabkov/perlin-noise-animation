import React, { useRef } from 'react';

import backgroundFragmentShader from '../../shaders/backgroundFragmentShader.glsl';
import { ShaderCanvas } from '../../components/ShaderCanvas';
import { useCoordinates } from '../../hooks';

export const ApplicationContainer: React.FC = () => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const coordinates = useCoordinates(canvasRef);

	return <ShaderCanvas ref={canvasRef} fragmentShader={backgroundFragmentShader} uniforms={{ uCoordinates: coordinates }} />;
};
