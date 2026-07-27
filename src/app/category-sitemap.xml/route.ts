import { NextResponse } from 'next/server';
import { CATEGORIES } from '@/calculators.config';

export const dynamic = 'force-static';

const BASE_URL = 'https://www.calculationdesk.com';

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${CATEGORIES.map(cat => `
  <url>
    <loc>${BASE_URL}/categories/${cat.slug}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
