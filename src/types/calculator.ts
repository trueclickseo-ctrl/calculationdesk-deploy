export interface CalculatorConfig {
  slug: string;
  title: string;
  category: string;
  description: string;
  icon: string;
  keywords: string[];
  implemented: boolean;
}

export interface CategoryConfig {
  slug: string;
  name: string;
  description: string;
  icon: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface SeoData {
  whatIs: string;
  formula: string;
  example: string;
  faqs: FaqItem[];
}
