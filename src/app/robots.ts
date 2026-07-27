export const dynamic = 'force-static';

import { MetadataRoute } from 'next';

const BASE_URL = 'https://www.calculationdesk.com';

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
    sitemap: [
      `${BASE_URL}/calculator-sitemap.xml`,
      `${BASE_URL}/category-sitemap.xml`,
      `${BASE_URL}/page-sitemap.xml`,
      `${BASE_URL}/pillar-sitemap.xml`,
      `${BASE_URL}/guide-sitemap.xml`,
      `${BASE_URL}/subcategory-sitemap.xml`
    ]
  };
}
