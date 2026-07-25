export const dynamic = 'force-static';

import { MetadataRoute } from 'next';

const BASE_URL = 'https://www.calculationdesk.com'; // Replace with the actual deployment domain

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      {
        userAgent: ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended'],
        allow: '/',
        disallow: ['/api/', '/_next/'],
      }
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
