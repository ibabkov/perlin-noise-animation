import React from 'react';

import ShadertoyReact from 'shadertoy-react';

import backgroundFragment from '../../shaders/backgroundFragment.glsl';

export const ApplicationContainer: React.FC = () => {
  return <ShadertoyReact fs={backgroundFragment} />;
};
