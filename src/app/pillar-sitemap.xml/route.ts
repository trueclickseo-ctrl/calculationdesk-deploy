import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

const BASE_URL = 'https://www.calculationdesk.com';

const PILLAR_PAGES = [
  'finance-calculators',
  'percentage-calculators',
  'math-calculators',
  'date-time-calculators',
  'conversion-calculators',
  'health-calculators',
  'statistics-calculators',
  'education-calculators'
];

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${PILLAR_PAGES.map(p => `
  <url>
    <loc>${BASE_URL}/pillar/${p}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`).join('')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
