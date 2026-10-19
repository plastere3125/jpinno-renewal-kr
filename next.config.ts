import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages.
 * NEXT_PUBLIC_BASE_PATH is set by the deploy workflow to "/<repository>" so that
 * routes and assets resolve under https://<user>.github.io/<repository>/.
 * Locally it is empty, so `npm run dev` serves from "/".
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
