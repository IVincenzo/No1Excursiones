import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  agentRules: false,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default withPayload(
  createNextIntlPlugin("./src/i18n/request.ts")(nextConfig),
);
