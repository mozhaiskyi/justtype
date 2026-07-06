import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({ extension: /\.mdx?$/ });

const BASE_PATH = "/justtype";

const nextConfig: NextConfig = {
  output: "export",
  basePath: BASE_PATH,
  env: { NEXT_PUBLIC_BASE_PATH: BASE_PATH },
  images: { unoptimized: true },
  pageExtensions: ["ts", "tsx", "mdx"],
  turbopack: {
    root: __dirname,
  },
};

export default withMDX(nextConfig);
