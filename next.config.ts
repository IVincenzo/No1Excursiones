import type {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import {withPayload} from '@payloadcms/next/withPayload';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{protocol: 'https', hostname: 'images.unsplash.com'}],
  },
  async headers() {
    return [
      {
        source: '/legacy/:path*',
        headers: [{key: 'X-Robots-Tag', value: 'noindex, nofollow'}],
      },
    ];
  },
};

export default withPayload(createNextIntlPlugin('./src/i18n/request.ts')(nextConfig));
