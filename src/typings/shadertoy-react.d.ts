declare module 'shadertoy-react' {
  type IShadertoyReactTexture = {
    url: string;
    wrapS?: number;
    wrapT?: number;
    minFilter?: number;
    magFilter?: number;
    flipY?: number;
  };

  export interface IShadertoyReactUniform {
    type: string;
    value: number | Array<number>;
  }

  export interface IShadertoyReactProps {
    fs: string;
    vs?: string;
    textures?: Array<IShadertoyReactTexture>;
    uniforms?: Array<IShadertoyReactUniform>;
    clearColor?: Array<number>;
    precision?: string;
    style?: string;
    contextAttributes?: object;
    onDoneLoadingTextures?: () => void;
    lerp?: number;
    devicePixelRatio?: number;
  }

  export default class ShadertoyReact extends React.Component<IShadertoyReactProps> {}
}
