// Standalone categories file — keeps Header.tsx away from the 97KB calculators.config
// This ensures CALCULATORS is never bundled into the client JS via a Header import.

export interface CategoryConfig {
  slug: string;
  name: string;
  description: string;
  icon: string;
}

export const CATEGORIES: CategoryConfig[] = [
  { slug: 'financial',      name: 'Financial & Investment',  description: 'Manage your wealth, loans, investments, and taxes.',                                              icon: 'TrendingUp'   },
  { slug: 'education',      name: 'Education & Math',        description: 'Solve mathematical problems, calculate GPA, CGPA, and averages.',                                 icon: 'BookOpen'     },
  { slug: 'date-time',      name: 'Date & Time',             description: 'Calculate ages, date differences, business days, and time zones.',                                icon: 'Calendar'     },
  { slug: 'health',         name: 'Health & Fitness',        description: 'Track BMI, calories, weight goals, and overall physical health.',                                 icon: 'Heart'        },
  { slug: 'business',       name: 'Business & Productivity', description: 'Evaluate profit margins, ROI, markup, commission, and payroll.',                                  icon: 'Briefcase'    },
  { slug: 'unit-converter', name: 'Unit Converters',         description: 'Convert between length, weight, area, volume, temperature, and speed.',                           icon: 'Scale'        },
  { slug: 'lifestyle',      name: 'Lifestyle & Fun',         description: 'Explore zodiac compatibility, friendship checks, and numerology.',                                icon: 'Sparkles'     },
  { slug: 'technology',     name: 'Technology',              description: 'Check internet speeds, aspect ratios, screen sizes, and battery life.',                           icon: 'Cpu'          },
  { slug: 'real-estate',    name: 'Real Estate',             description: 'Calculate mortgages, rental yields, stamp duty, and home affordability.',                        icon: 'Home'         },
  { slug: 'biology',        name: 'Biology',                 description: 'Calculate livestock needs, plant spacings, tree ages, and growth parameters.',                    icon: 'Leaf'         },
  { slug: 'ecology',        name: 'Ecology',                 description: 'Determine ecological diversity indexes, solar capacities, and drip water loss.',                  icon: 'Globe'        },
  { slug: 'statistics',     name: 'Statistics',              description: "Solve probability, Bayes' theorem, P-values, and statistical distributions.",                    icon: 'BarChart'     },
  { slug: 'everyday-life',  name: 'Everyday Life',           description: 'Calculate audiobook speeds, day offsets, birth years, and tie lengths.',                         icon: 'Smile'        },
  { slug: 'chemistry',      name: 'Chemistry',               description: 'Solve molarity conversions, mixing ratios, pH levels, and chemical names.',                      icon: 'FlaskConical' },
  { slug: 'physics',        name: 'Physics',                 description: 'Solve curvature of the Earth, frequency ranges, specific heat, and pipe flow rates.',            icon: 'Atom'         },
  { slug: 'construction',   name: 'Construction',            description: 'Calculate concrete blocks, roof pitch framing, board feet, and sand tonnage.',                   icon: 'Hammer'       },
];
