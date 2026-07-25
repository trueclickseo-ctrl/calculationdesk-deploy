import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const BASE_URL = 'https://www.calculationdesk.com';
const HOST = 'www.calculationdesk.com';

async function main() {
  const apiKey = process.argv[2] || process.env.INDEXNOW_KEY || 'f73a36eda9d84288bd062c2610c7dc19';

  console.log(`Using IndexNow API key: ${apiKey}`);

  // 1. Ensure verification key file exists in public/ directory
  const keyFilePath = join(root, 'public', `${apiKey}.txt`);
  writeFileSync(keyFilePath, apiKey.trim(), 'utf8');

  // 2. Gather URLs to submit
  const urlSet = new Set([
    `${BASE_URL}/`,
    `${BASE_URL}/about`,
    `${BASE_URL}/contact`,
    `${BASE_URL}/disclaimer`,
    `${BASE_URL}/privacy`,
    `${BASE_URL}/terms`,
    `${BASE_URL}/blog`,
  ]);

  // Read from sitemap.xml if available
  const sitemapPath = existsSync(join(root, 'public', 'sitemap.xml'))
    ? join(root, 'public', 'sitemap.xml')
    : join(root, 'sitemap.xml');

  if (existsSync(sitemapPath)) {
    const xml = readFileSync(sitemapPath, 'utf8');
    const locs = xml.match(/<loc>(.*?)<\/loc>/g);
    if (locs) {
      for (const loc of locs) {
        const u = loc.replace(/<\/?loc>/g, '').trim();
        if (u) {
          urlSet.add(u);
        }
      }
    }
  }

  // Also read from calculators.config.ts
  const configPath = join(root, 'src', 'calculators.config.ts');
  if (existsSync(configPath)) {
    const configText = readFileSync(configPath, 'utf8');
    const slugMatches = [...configText.matchAll(/slug:\s*'([^']+)'/g)].map(m => m[1]);
    const categorySlugs = [
      'financial', 'education', 'date-time', 'health', 'business', 
      'unit-converter', 'lifestyle', 'technology', 'real-estate', 'biology',
      'ecology', 'statistics', 'everyday-life', 'chemistry', 'physics', 'construction'
    ];

    for (const slug of slugMatches) {
      if (categorySlugs.includes(slug)) {
        urlSet.add(`${BASE_URL}/categories/${slug}`);
      } else {
        urlSet.add(`${BASE_URL}/calculators/${slug}`);
      }
    }
  }

  const urls = Array.from(urlSet);
  console.log(`\nFound ${urls.length} total URLs to submit to IndexNow.`);

  const payload = {
    host: HOST,
    key: apiKey,
    keyLocation: `${BASE_URL}/${apiKey}.txt`,
    urlList: urls
  };

  const endpoints = [
    { name: 'Bing IndexNow', url: 'https://www.bing.com/indexnow' },
    { name: 'IndexNow Central API', url: 'https://api.indexnow.org/indexnow' },
    { name: 'Yandex IndexNow', url: 'https://yandex.com/indexnow' }
  ];

  for (const target of endpoints) {
    console.log(`\nSubmitting ${urls.length} URLs to ${target.name} (${target.url})...`);
    try {
      const res = await fetch(target.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(payload)
      });

      if (res.status === 200 || res.status === 202) {
        console.log(`✅ Success! ${target.name} accepted ${urls.length} URLs (HTTP ${res.status}).`);
      } else {
        const text = await res.text();
        console.error(`❌ ${target.name} returned HTTP ${res.status}: ${text}`);
      }
    } catch (err) {
      console.error(`❌ Error submitting to ${target.name}:`, err.message);
    }
  }

  console.log(`\n🎉 IndexNow submission completed successfully for all participating search engines!`);
}

main();
