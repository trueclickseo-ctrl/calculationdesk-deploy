export const dynamic = 'force-static';

import { MetadataRoute } from 'next';

const BASE_URL = 'https://calculationdesk.com'; // Replace with the actual deployment domain

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
