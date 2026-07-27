import { CALCULATORS } from '../calculators.config';
import { getCalculatorSeoData } from './seo-helpers';

export interface InternalLinkItem {
  title: string;
  slug: string;
  category: string;
  description: string;
  relationshipType: 'Same Cluster' | 'Frequently Used Together' | 'Same Category' | 'Next Recommended';
  score: number;
}

export function getSemanticLinks(currentSlug: string): InternalLinkItem[] {
  const currentSeo = getCalculatorSeoData(currentSlug);
  const links: InternalLinkItem[] = [];

  CALCULATORS.forEach(calc => {
    if (calc.slug === currentSlug || !calc.implemented) return;

    const calcSeo = getCalculatorSeoData(calc.slug);

    // Calculate score parameters
    // 1. Same Topic / Tags (40% Weight - up to 40 points)
    const sharedTags = currentSeo.tags.filter(t => calcSeo.tags.includes(t));
    const topicScore = Math.min((sharedTags.length / Math.max(currentSeo.tags.length, 1)) * 40, 40);

    // 2. Same Formula / Subcategory (25% Weight - up to 25 points)
    let formulaScore = 0;
    if (currentSeo.subcategory && calcSeo.subcategory && currentSeo.subcategory === calcSeo.subcategory) {
      formulaScore = 25;
    } else if (currentSeo.relationships?.sameFormula?.includes(calc.slug)) {
      formulaScore = 20;
    }

    // 3. Same Intent (20% Weight - up to 20 points)
    const intentScore = currentSeo.searchIntent === calcSeo.searchIntent ? 20 : 0;

    // 4. Same Category (10% Weight - up to 10 points)
    const categoryScore = currentSeo.category === calcSeo.category ? 10 : 0;

    // 5. Popularity (5% Weight - up to 5 points)
    const popularityScore = calcSeo.priority === 'high' ? 5 : 2;

    // 6. User Journey Signals (Frequently Used Together: +10 points)
    const frequentlyUsedScore = currentSeo.relationships?.frequentlyUsedTogether?.includes(calc.slug) ? 10 : 0;

    // 7. Funnel Position Offset (+10 points if matching cluster priority hierarchy)
    const funnelScore = currentSeo.clusterPriority === calcSeo.clusterPriority ? 10 : 0;

    const totalScore = topicScore + formulaScore + intentScore + categoryScore + popularityScore + frequentlyUsedScore + funnelScore;

    // Categorize relation type for presentation
    let relationshipType: InternalLinkItem['relationshipType'] = 'Same Category';
    if (sharedTags.length > 0) {
      relationshipType = 'Same Cluster';
    } else if (currentSeo.relationships?.frequentlyUsedTogether?.includes(calc.slug)) {
      relationshipType = 'Frequently Used Together';
    } else if (currentSeo.relationships?.nextRecommended === calc.slug) {
      relationshipType = 'Next Recommended';
    }

    links.push({
      title: calc.title,
      slug: calc.slug,
      category: calc.category,
      description: calc.description,
      relationshipType,
      score: totalScore
    });
  });

  // Sort by score descending and return the top 8-15 items
  return links.sort((a, b) => b.score - a.score).slice(0, 12);
}
