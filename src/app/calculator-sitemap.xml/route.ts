import { NextResponse } from 'next/server';
import { CALCULATORS } from '@/calculators.config';

export const dynamic = 'force-static';

const BASE_URL = 'https://www.calculationdesk.com';

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${CALCULATORS.map(calc => `
  <url>
    <loc>${BASE_URL}/calculators/${calc.slug}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${calc.implemented ? 'weekly' : 'monthly'}</changefreq>
    <priority>${calc.implemented ? '0.8' : '0.5'}</priority>
  </url>`).join('')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
