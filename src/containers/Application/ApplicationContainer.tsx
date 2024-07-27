import React from 'react';

import backgroundFragmentShader from '../../shaders/backgroundFragmentShader.glsl';
import { ShaderCanvas } from '../../components/ShaderCanvas';

export const ApplicationContainer: React.FC = () => {
	return <ShaderCanvas fragmentShader={backgroundFragmentShader} />;
};
