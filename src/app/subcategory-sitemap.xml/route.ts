import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

const BASE_URL = 'https://www.calculationdesk.com';

const SUBCATEGORIES = [
  'loan-calculators',
  'investment-calculators',
  'tax-calculators',
  'retirement-calculators',
  'interest-calculators',
  'debt-calculators',
  'algebra-calculators',
  'statistics-calculators',
  'geometry-calculators',
  'percentage-calculators',
  'body-calculators',
  'nutrition-calculators',
  'fitness-calculators'
];

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${SUBCATEGORIES.map(s => `
  <url>
    <loc>${BASE_URL}/subcategory/${s}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>`).join('')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
