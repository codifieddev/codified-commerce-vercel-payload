import { withPayload } from "@payloadcms/next/withPayload";
import createNextIntlPlugin from "next-intl/plugin";
import { withPlausibleProxy } from "next-plausible";

import redirects from "./redirects.js";

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined || process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "standalone",
  images: {
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
        const url = new URL(item);

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(":", ""),
        };
      }),
    ],
  },
  reactStrictMode: true,
  redirects,
  experimental: {
    reactCompiler: true,
    viewTransition: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Updated for Next.js 15 - moved from experimental.serverComponentsExternalPackages
  serverExternalPackages: [
    'nodemailer',
    '@payloadcms/payload-cloud',
    'sharp',
    'detect-libc'
  ],
  // Remove transpilePackages that conflict with serverExternalPackages
  // transpilePackages: [
  //   '@payloadcms/payload-cloud',
  //   '@payloadcms/next'
  // ],
  // Add webpack configuration to handle Node.js modules in client components
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Fallback for Node.js modules that don't work in the browser
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        dns: false,
        child_process: false,
        tls: false,
        crypto: false,
        stream: false,
        url: false,
        zlib: false,
        http: false,
        https: false,
        assert: false,
        os: false,
        path: false,
      };
    }

    // Handle specific modules that cause issues
    config.module.rules.push({
      test: /\.node$/,
      use: 'raw-loader',
    });

    return config;
  },
};

export default withNextIntl(withPayload(nextConfig));
