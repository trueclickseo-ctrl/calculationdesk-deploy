export const dynamic = 'force-static';

import { MetadataRoute } from 'next';
import { CATEGORIES, CALCULATORS } from '@/calculators.config';

const BASE_URL = 'https://calculationdesk.com'; // Replace with the actual deployment domain

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  // Category pages
  CATEGORIES.forEach((cat) => {
    routes.push({
      url: `${BASE_URL}/categories/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  });

  // Calculator pages
  CALCULATORS.forEach((calc) => {
    routes.push({
      url: `${BASE_URL}/calculators/${calc.slug}`,
      lastModified: new Date(),
      changeFrequency: calc.implemented ? 'weekly' : 'monthly',
      priority: calc.implemented ? 0.7 : 0.4,
    });
  });

  return routes;
}
