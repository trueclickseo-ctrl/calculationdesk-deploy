import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

const BASE_URL = 'https://www.calculationdesk.com';

const STATIC_PAGES = ['', 'about', 'contact', 'privacy', 'terms', 'disclaimer', 'blog', 'editorial-policy', 'formula-verification', 'learn'];

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${STATIC_PAGES.map(page => `
  <url>
    <loc>${page === '' ? `${BASE_URL}/` : `${BASE_URL}/${page}/`}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${page === '' ? '1.0' : '0.5'}</priority>
  </url>`).join('')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
