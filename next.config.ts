import type { NextConfig } from 'next';

/**
 * Lumina ships as a fully pre-rendered static site: every route is HTML at build
 * time, so there is no server round-trip on first paint and the whole thing can be
 * hosted on any static CDN (GitHub Pages, S3, Netlify…).
 *
 * `NEXT_PUBLIC_BASE_PATH` lets the same build serve from a sub-path
 * (e.g. GitHub Project Pages at /Aspct-First-website) without code changes.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, '') || '';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  images: {
    // Static export has no image optimisation server. All raster art is either an
    // inline SVG or a pre-sized asset, so there is nothing to optimise at runtime.
    unoptimized: true,
  },
  typescript: { ignoreBuildErrors: false },
};

export default nextConfig;
