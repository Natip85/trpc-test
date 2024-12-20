/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env";
import type { NextConfig } from "next";

const config: NextConfig = {
  skipTrailingSlashRedirect: true,
  reactStrictMode: true,
  experimental: {
    reactCompiler: true,
    turbo: {
      rules: {
        "*.svg": {
          loaders: [
            {
              loader: "@svgr/webpack",
              options: {
                typescript: true,
                ext: "tsx",
              },
            },
          ],
          as: "*.tsx",
        },
      },
    },
  },
  webpack: (webpackConfig) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    webpackConfig.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            typescript: true,
            ext: "tsx",
          },
        },
      ],
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return webpackConfig;
  },
  // TODO enable when adding posthog
  // async rewrites() {
  //   return [
  //     {
  //       source: "/ingest/static/:path*",
  //       destination: "https://eu-assets.i.posthog.com/static/:path*",
  //     },
  //     {
  //       source: "/ingest/:path*",
  //       destination: "https://eu.i.posthog.com/:path*",
  //     },
  //     {
  //       source: "/ingest/decide",
  //       destination: "https://eu.i.posthog.com/decide",
  //     },
  //   ];
  // },
};

export default config;
