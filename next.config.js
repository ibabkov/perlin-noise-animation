/* eslint-disable @typescript-eslint/no-var-requires */
const withPlugins = require('next-compose-plugins');

const IS_DEV_MODE = process.env.NODE_ENV !== 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack5: true,
  eslint: {
    ignoreDuringBuilds: true,
    dirs: ['pages', 'src'],
  },
  publicRuntimeConfig: {
    IS_DEV_MODE: IS_DEV_MODE,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.glsl$/,
      loader: 'webpack-glsl-loader',
    });

    return config;
  },
};

module.exports = withPlugins([], nextConfig);
