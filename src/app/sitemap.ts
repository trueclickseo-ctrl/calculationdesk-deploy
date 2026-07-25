export const dynamic = 'force-static';

import { MetadataRoute } from 'next';
import { CATEGORIES, CALCULATORS } from '@/calculators.config';

const BASE_URL = 'https://www.calculationdesk.com'; // Replace with the actual deployment domain

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  // Category pages
  CATEGORIES.forEach((cat) => {
    routes.push({
      url: `${BASE_URL}/categories/${cat.slug}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  });

  // Calculator pages
  CALCULATORS.forEach((calc) => {
    routes.push({
      url: `${BASE_URL}/calculators/${calc.slug}/`,
      lastModified: new Date(),
      changeFrequency: calc.implemented ? 'weekly' : 'monthly',
      priority: calc.implemented ? 0.7 : 0.4,
    });
  });

  // Static pages
  const staticPages = ['about', 'contact', 'privacy', 'terms', 'disclaimer', 'blog'];
  staticPages.forEach((page) => {
    routes.push({
      url: `${BASE_URL}/${page}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    });
  });

  // Blog posts
  const blogPosts = ['how-emi-works-2026', 'understanding-compound-interest'];
  blogPosts.forEach((post) => {
    routes.push({
      url: `${BASE_URL}/blog/${post}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  });

  return routes;
}
