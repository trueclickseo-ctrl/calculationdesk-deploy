import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

const BASE_URL = 'https://www.calculationdesk.com';

import { GUIDES_CONFIG } from '@/data/guides-data';

const GUIDES = Object.keys(GUIDES_CONFIG);

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${GUIDES.map(g => `
  <url>
    <loc>${BASE_URL}/guides/${g}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
