import webpack from "webpack"
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env.mjs"));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack(config, { buildId }) {
    config.module.rules.push({ test: /\.svg$/, use: ["@svgr/webpack"] });
    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env.BUILD_ID": JSON.stringify(buildId),
      })
    );
    config.resolve.fallback = { fs: false, module: false, path: false };
    return config;
  },

  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: false,
      },
    ];
  },
};
export default config;
