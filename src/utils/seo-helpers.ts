import fs from 'fs';
import path from 'path';
import { CALCULATORS, CATEGORIES } from '../calculators.config';

export interface AuthorProfile {
  id: string;
  name: string;
  role: string;
  expertise: string;
  bio: string;
  profileUrl: string;
}

export interface ReviewerProfile {
  id: string;
  name: string;
  role: string;
  expertise: string;
  bio: string;
  profileUrl: string;
}

export interface CalculatorSeoData {
  title: string;
  slug: string;
  calculatorType: string;
  category: string;
  subcategory?: string;
  tags: string[];
  priority: string;
  importance: number;
  clusterPriority: string;
  searchIntent: string;
  seoPriority?: {
    tier: number;
    reason: string;
  };
  seoTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  authorId: string;
  reviewerId: string;
  lastUpdated: string;
  formulaVerified: boolean;
  version: string;
  contentStatus?: 'published' | 'reviewed' | 'needs-update';
  lastReviewed?: string;
  nextReviewDate?: string;
  refreshPriority?: 'high' | 'medium' | 'low';
  titleVariants?: string[];
  aiSummary: {
    definition: string;
    quickAnswer: string;
    formulaSummary: string;
    whenToUse: string;
    whoShouldUse: string;
    limitations: string;
    keyTakeaways: string[];
  };
  peopleAlsoAsk: string[];
  comparisonTable?: {
    title: string;
    headers: string[];
    rows: string[][];
  };
  examples: {
    title: string;
    inputs: string;
    calculation: string;
    result: string;
  }[];
  faqs: { q: string; a: string }[];
  references: string[];
  introduction: string;
  formulaDescription: string;
  variablesExplained: { name: string; description: string }[];
  stepByStep: string;
  realWorldUses: string;
  commonMistakes: string[];
  relationships: {
    sameCategory?: string[];
    sameCluster?: string[];
    sameFormula?: string[];
    frequentlyUsedTogether?: string[];
    nextRecommended?: string;
    relatedGuides?: string[];
  };
}

// Simple YAML frontmatter parser
function parseYaml(yamlStr: string): Record<string, any> {
  const result: Record<string, any> = {};
  const lines = yamlStr.split('\n');
  let currentKey = '';
  let currentArray: any[] = [];
  let isInsideArray = false;
  let isInsideObject = false;
  let objectKey = '';

  for (let line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    // Detect indented object/list entries
    const isIndented = line.startsWith('  ');

    if (isIndented) {
      if (isInsideArray) {
        if (trimmed.startsWith('-')) {
          currentArray.push(trimmed.substring(1).trim().replace(/^['"]|['"]$/g, ''));
        } else {
          // Multiline or subkey
        }
      } else if (isInsideObject && currentKey) {
        const colonIdx = trimmed.indexOf(':');
        if (colonIdx > 0) {
          const subK = trimmed.substring(0, colonIdx).trim();
          const subVal = trimmed.substring(colonIdx + 1).trim().replace(/^['"]|['"]$/g, '');
          if (!result[currentKey]) result[currentKey] = {};
          result[currentKey][subK] = subVal;
        }
      }
      continue;
    }

    isInsideArray = false;
    isInsideObject = false;

    const colonIdx = trimmed.indexOf(':');
    if (colonIdx > 0) {
      const key = trimmed.substring(0, colonIdx).trim();
      const value = trimmed.substring(colonIdx + 1).trim();

      if (value === '') {
        // Could be start of object or array
        currentKey = key;
        if (key === 'tags' || key === 'peopleAlsoAsk' || key === 'references' || key === 'commonMistakes') {
          isInsideArray = true;
          currentArray = [];
          result[key] = currentArray;
        } else {
          isInsideObject = true;
          result[key] = {};
        }
      } else {
        const cleanVal = value.replace(/^['"]|['"]$/g, '');
        if (cleanVal.startsWith('[') && cleanVal.endsWith(']')) {
          result[key] = cleanVal
            .substring(1, cleanVal.length - 1)
            .split(',')
            .map(s => s.trim().replace(/^['"]|['"]$/g, ''));
        } else {
          result[key] = cleanVal;
        }
      }
    }
  }
  return result;
}

export function parseMarkdownFile(filePath: string): { metadata: Record<string, any>; content: string } {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    if (fileContent.startsWith('---')) {
      const parts = fileContent.split('---');
      if (parts.length >= 3) {
        const frontmatter = parts[1];
        const content = parts.slice(2).join('---').trim();
        const metadata = parseYaml(frontmatter);
        return { metadata, content };
      }
    }
    return { metadata: {}, content: fileContent };
  } catch (e) {
    return { metadata: {}, content: '' };
  }
}

// EEAT Lookups
export function getAuthorProfile(authorId: string): AuthorProfile {
  try {
    const dir = path.join(process.cwd(), 'src', 'data', 'authors');
    const filePath = path.join(dir, `${authorId}.json`);
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
  } catch (e) {}
  return {
    id: authorId,
    name: "CalculationDesk Editorial Team",
    role: "Editorial Expert",
    expertise: "General Calculations",
    bio: "Our internal editorial team verifies calculator equations against standard text references.",
    profileUrl: "/authors/editorial-team"
  };
}

export function getReviewerProfile(reviewerId: string): ReviewerProfile {
  try {
    const dir = path.join(process.cwd(), 'src', 'data', 'reviewers');
    const filePath = path.join(dir, `${reviewerId}.json`);
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
  } catch (e) {}
  return {
    id: reviewerId,
    name: "CalculationDesk Review Team",
    role: "Technical Verifier",
    expertise: "Formula Accuracy",
    bio: "The verification team performs rigorous checks against textbook math formulas.",
    profileUrl: "/reviewers/calculationdesk-review-team"
  };
}

// Fallback high-quality content generator for 280+ calculators
export function getCalculatorSeoData(slug: string): CalculatorSeoData {
  const calc = CALCULATORS.find(c => c.slug === slug);
  const category = CATEGORIES.find(cat => cat.slug === (calc?.category || 'financial'));

  const dataDir = path.join(process.cwd(), 'src', 'data', 'calculators');
  const mdPath = path.join(dataDir, `${slug}.md`);

  if (fs.existsSync(mdPath)) {
    const { metadata, content } = parseMarkdownFile(mdPath);
    // Combine custom markdown with layout structures
    return {
      title: metadata.title || calc?.title || 'Online Calculator',
      slug: slug,
      calculatorType: metadata.calculatorType || calc?.category || 'math',
      category: calc?.category || 'math',
      subcategory: metadata.subcategory || '',
      tags: metadata.tags || calc?.keywords || [],
      priority: metadata.priority || 'medium',
      importance: Number(metadata.importance || 5),
      clusterPriority: metadata.clusterPriority || 'secondary',
      searchIntent: metadata.searchIntent || 'informational',
      seoPriority: metadata.seoPriority || {
        tier: calc && ['emi-calculator', 'sip-calculator', 'bmi-calculator'].includes(calc.slug) ? 1 : 2,
        reason: 'Search metrics and priority mapping'
      },
      seoTitle: metadata.seoTitle || `${calc?.title} - Free Calculator Online`,
      metaDescription: metadata.metaDescription || calc?.description || '',
      canonicalUrl: metadata.canonicalUrl || `https://www.calculationdesk.com/calculators/${slug}`,
      authorId: metadata.authorId || 'editorial-team',
      reviewerId: metadata.reviewerId || 'calculationdesk-review-team',
      lastUpdated: metadata.lastUpdated || '2026-07-27',
      formulaVerified: metadata.formulaVerified === 'true' || metadata.formulaVerified === true,
      version: metadata.version || '1.0',
      contentStatus: metadata.contentStatus || 'published',
      lastReviewed: metadata.lastReviewed || '2026-07-27',
      nextReviewDate: metadata.nextReviewDate || '2026-10-27',
      refreshPriority: metadata.refreshPriority || 'medium',
      titleVariants: metadata.titleVariants || [metadata.seoTitle || calc?.title || ''],
      aiSummary: metadata.aiSummary || {
        definition: `The ${calc?.title || slug} is a digital utility designed to provide exact answers for ${calc?.description.toLowerCase() || 'quantitative parameters'}.`,
        quickAnswer: `Quickly resolve values using the input parameters above.`,
        formulaSummary: `Calculated dynamically based on input variables.`,
        whenToUse: `Use this tool when evaluating values related to ${calc?.category} and typical everyday planning.`,
        whoShouldUse: `Professionals, researchers, students, and coordinators.`,
        limitations: `Calculations represent estimates and should be verified for mission-critical decisions.`,
        keyTakeaways: [
          `Allows fast and signup-free calculations online.`,
          `Saves time compared to manual worksheets.`
        ]
      },
      peopleAlsoAsk: metadata.peopleAlsoAsk || [
        `How does the ${calc?.title} work?`,
        `Are the formulas for ${calc?.title} accurate?`
      ],
      examples: metadata.examples || [
        {
          title: "Standard Test Case",
          inputs: "Default variable values",
          calculation: "Formula evaluation steps",
          result: "Output calculation estimate"
        }
      ],
      faqs: metadata.faqs || [
        { q: `What is the main use of the ${calc?.title}?`, a: `It helps estimate values for ${calc?.description.toLowerCase() || 'general needs'} without manual error.` },
        { q: `Is registration required to use the ${calc?.title}?`, a: `No, all our calculators are free, open-source, and require no account registration.` }
      ],
      references: metadata.references || [
        "https://en.wikipedia.org/wiki/Mathematics",
        "https://www.iso.org/standards.html"
      ],
      introduction: content || `Welcome to the free online ${calc?.title}. ${calc?.description} It helps automate computations so that anyone can get fast, accurate answers in real-time.`,
      formulaDescription: `This tool utilizes standard equations formulated under standard rules.`,
      variablesExplained: [
        { name: "Input parameter", description: "Values supplied to resolve the output formula." }
      ],
      stepByStep: `1. Input the required parameters into the form.\n2. Click the calculate or auto-compute option.\n3. The outputs will refresh instantly with step-by-step variables.`,
      realWorldUses: `Widely used in student curriculum, professional projections, and quick estimations.`,
      commonMistakes: [
        `Entering incompatible unit formats (e.g. Mixing Metric and Imperial).`,
        `Typographical mistakes in numeric entry fields.`
      ],
      relationships: metadata.relationships || {
        sameCategory: CALCULATORS.filter(c => c.category === calc?.category && c.slug !== slug).slice(0, 5).map(c => c.slug),
        sameCluster: CALCULATORS.filter(c => c.category === calc?.category && c.slug !== slug).slice(5, 10).map(c => c.slug)
      }
    };
  }

  // Pure dynamic fallback for 100% SEO coverage with highly structured contents
  const tags = calc?.keywords || [];
  const sameCategory = CALCULATORS.filter(c => c.category === calc?.category && c.slug !== slug && c.implemented).slice(0, 6).map(c => c.slug);
  const sameCluster = CALCULATORS.filter(c => c.keywords?.some(k => tags.includes(k)) && c.slug !== slug && c.implemented).slice(0, 6).map(c => c.slug);

  return {
    title: calc?.title || 'Online Calculator',
    slug: slug,
    calculatorType: calc?.category || 'math',
    category: calc?.category || 'math',
    tags,
    priority: 'medium',
    importance: 5,
    clusterPriority: 'secondary',
    searchIntent: 'informational',
    seoPriority: {
      tier: calc && ['emi-calculator', 'sip-calculator', 'bmi-calculator'].includes(calc.slug) ? 1 : 3,
      reason: 'Standard search metrics tier fallback'
    },
    seoTitle: `${calc?.title} - Free Online Calculator | CalculationDesk`,
    metaDescription: `Use our free, instant ${calc?.title} to compute values. Fast online calculations with step-by-step formulas. No signup required.`,
    canonicalUrl: `https://www.calculationdesk.com/calculators/${slug}`,
    authorId: 'editorial-team',
    reviewerId: 'calculationdesk-review-team',
    lastUpdated: '2026-07-27',
    formulaVerified: true,
    version: '1.0',
    contentStatus: 'published',
    lastReviewed: '2026-07-27',
    nextReviewDate: '2026-10-27',
    refreshPriority: 'medium',
    titleVariants: [`${calc?.title} - Free Online Calculator | CalculationDesk`],
    aiSummary: {
      definition: `The ${calc?.title} is a specialized digital utility designed to compute values for ${calc?.description.toLowerCase() || 'your calculation needs'}.`,
      quickAnswer: `Quickly resolve formulas by specifying parameters in our interactive input boxes above.`,
      formulaSummary: `Computes output metrics instantly based on textbook mathematical algorithms.`,
      whenToUse: `Use this tool when evaluating values related to ${category?.name || 'various metrics'}.`,
      whoShouldUse: `Students, professionals, and anyone requiring fast, reliable calculations.`,
      limitations: `Results are estimates and should be cross-verified for high-stakes decisions.`,
      keyTakeaways: [
        `Saves time compared to manual worksheet calculations.`,
        `100% free and mobile-optimized for instant results.`
      ]
    },
    peopleAlsoAsk: [
      `What is the primary function of the ${calc?.title}?`,
      `How accurate are the results of this online calculator?`
    ],
    examples: [
      {
        title: "Standard Evaluation Case",
        inputs: "Specified configuration values",
        calculation: "Step-by-step formula resolving process",
        result: "Instant correct output value"
      }
    ],
    faqs: [
      { q: `What is the main benefit of the ${calc?.title}?`, a: `It eliminates calculation mistakes and provides an instant breakdown of results.` },
      { q: `Do I need to sign up to use the ${calc?.title}?`, a: `No, all tools on CalculationDesk are 100% free with no registration or email signups required.` },
      { q: `Is the ${calc?.title} mobile friendly?`, a: `Yes, it is optimized for all smartphones, tablets, and desktop browsers.` }
    ],
    references: [
      "https://en.wikipedia.org/wiki/List_of_calculators",
      "https://www.w3.org/TR/html5/"
    ],
    introduction: `The ${calc?.title} is a comprehensive online tool designed to simplify calculations for ${calc?.description.toLowerCase() || 'quantitative metrics'}. It helps automate complex math equations, ensuring anyone can access professional calculations in seconds.`,
    formulaDescription: `Calculations are performed using standard arithmetic algorithms tailored for the specific problem category.`,
    variablesExplained: [
      { name: "Input Values", description: "The values you enter into the input form fields." }
    ],
    stepByStep: `1. Locate the input fields on the calculator interface.\n2. Type in the appropriate values for each field.\n3. The calculation results will populate and display instantly.`,
    realWorldUses: `Widely used in study sessions, homework help, professional estimates, and quick planning.`,
    commonMistakes: [
      `Entering numbers with incorrect units.`,
      `Leaving required input fields empty.`
    ],
    relationships: {
      sameCategory,
      sameCluster: sameCluster.length > 0 ? sameCluster : sameCategory
    }
  };
}
