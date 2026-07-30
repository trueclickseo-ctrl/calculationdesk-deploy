'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { CATEGORIES } from '@/data/categories';

// Slim shape matching public/search-index.json
interface SlimCalc { s: string; t: string; d: string; c: string; k: string; i: number; }

import { 
  Search, Sun, Moon, Menu, X, ChevronDown, Calculator, 
  TrendingUp, BookOpen, Calendar, Heart, Briefcase, Scale, Sparkles, Cpu, Home,
  Leaf, Globe, BarChart, Smile, FlaskConical, Atom, Hammer
} from 'lucide-react';

import { triggerScrollToTop } from '@/components/MathScrollAnimation';
import Logo from '@/components/Logo';

const CATEGORY_ICONS: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  financial: TrendingUp,
  education: BookOpen,
  'date-time': Calendar,
  health: Heart,
  business: Briefcase,
  'unit-converter': Scale,
  lifestyle: Sparkles,
  technology: Cpu,
  'real-estate': Home,
  biology: Leaf,
  ecology: Globe,
  statistics: BarChart,
  'everyday-life': Smile,
  chemistry: FlaskConical,
  physics: Atom,
  construction: Hammer,
};

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [catMenuOpen, setCatMenuOpen] = useState(false);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const catMenuRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchFocused(false);
      }
      if (catMenuRef.current && !catMenuRef.current.contains(event.target as Node)) {
        setCatMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut Ctrl+K to focus search
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const input = document.getElementById('global-search') as HTMLInputElement | null;
        input?.focus();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const [searchIndex, setSearchIndex] = useState<SlimCalc[] | null>(null);
  const indexFetched = useRef(false);

  const fetchSearchIndex = useCallback(async () => {
    if (indexFetched.current) return;
    indexFetched.current = true;
    try {
      const res = await fetch('/search-index.json');
      setSearchIndex(await res.json());
    } catch { /* silently ignore */ }
  }, []);

  // Header search — lazy fetches /search-index.json on first focus
  const searchResults: SlimCalc[] = searchQuery.trim() && searchIndex
    ? (() => {
        const q = searchQuery.toLowerCase().trim();
        const out: SlimCalc[] = [];
        for (let i = 0; i < searchIndex.length && out.length < 8; i++) {
          const c = searchIndex[i];
          if (c.t.toLowerCase().includes(q) || c.d.toLowerCase().includes(q) || c.k.includes(q)) out.push(c);
        }
        return out;
      })()
    : [];

  const handleSearchResultClick = (slug: string) => {
    setSearchQuery('');
    setSearchFocused(false);
    setMobileMenuOpen(false);
    window.location.href = `/calculators/${slug}/`;
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-card">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link 
            href="/" 
            prefetch={false}
            onClick={(e) => {
              if (window.location.pathname === '/') {
                e.preventDefault();
                triggerScrollToTop();
              }
            }}
            className="flex items-center gap-2 text-primary font-bold text-xl hover:opacity-90"
          >
            <Logo className="h-6 w-6" />
            <span className="text-primary font-bold text-xl">CalculationDesk</span>
          </Link>
          
          {/* Categories Dropdown (Desktop) */}
          <div className="relative hidden md:block" ref={catMenuRef}>
            <button 
              onClick={() => setCatMenuOpen(!catMenuOpen)}
              className="flex items-center gap-1.5 text-base font-bold text-foreground/90 hover:text-primary transition-colors py-2"
            >
              Categories
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${catMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {catMenuOpen && (
              <div className="absolute left-0 mt-2 w-80 max-h-[80vh] overflow-y-auto rounded-xl border border-border bg-card p-4 shadow-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="grid grid-cols-1 gap-2">
                  {CATEGORIES.map((cat) => {
                    const Icon = CATEGORY_ICONS[cat.slug] || Calculator;
                    return (
                      <Link
                        key={cat.slug}
                        href={`/categories/${cat.slug}/`}
                        prefetch={false}
                        onClick={() => setCatMenuOpen(false)}
                        className="flex items-start gap-3 rounded-lg p-2 hover:bg-background transition-colors"
                      >
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold">{cat.name}</div>
                          <div className="text-xs text-foreground/60 line-clamp-1">{cat.description}</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <Link href="/blog/" prefetch={false} className="hidden md:block text-base font-bold text-foreground/90 hover:text-primary transition-colors py-2">
            Blog
          </Link>
          <Link href="/about/" prefetch={false} className="hidden md:block text-base font-bold text-foreground/90 hover:text-primary transition-colors py-2">
            About
          </Link>
          <Link href="/contact/" prefetch={false} className="hidden md:block text-base font-bold text-foreground/90 hover:text-primary transition-colors py-2">
            Contact
          </Link>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-4 flex-1 justify-end max-w-lg md:max-w-md">
            {/* Search Bar Container */}
            <div className="relative w-full" ref={searchRef}>
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchResults.length > 0) {
                    handleSearchResultClick(searchResults[0].s);
                  }
                }}
                className="relative"
              >
                <Search className="absolute top-2.5 left-3 h-4 w-4 text-foreground/40 pointer-events-none" />
                <input
                  id="global-search"
                  type="text"
                  placeholder="Search calculators... (Ctrl+K)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => { setSearchFocused(true); fetchSearchIndex(); }}
                  className="w-full rounded-full border border-border bg-background py-2 pl-10 pr-4 text-sm outline-none transition-colors placeholder:text-foreground/40 focus:border-primary focus:ring-4 focus:ring-ring-custom"
                />
                {searchQuery && (
                  <button 
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-2.5 rounded-full p-0.5 text-foreground/40 hover:bg-border hover:text-foreground"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </form>

            {/* Live Search Results Overlay */}
            {searchFocused && (searchQuery.trim() || searchResults.length > 0) && (
              <div className="absolute right-0 mt-2 w-full min-w-[280px] md:min-w-[400px] rounded-xl border border-border bg-card shadow-2xl p-2 animate-in fade-in duration-100">
                {searchResults.length > 0 ? (
                  <div className="flex flex-col gap-1">
                    <div className="px-3 py-1.5 text-xs font-semibold text-foreground/40 uppercase tracking-wider">
                      Search Results
                    </div>
                    {searchResults.map((calc) => {
                      const Icon = CATEGORY_ICONS[calc.c] || Calculator;
                      return (
                        <Link
                          key={calc.s}
                          href={`/calculators/${calc.s}/`}
                          prefetch={false}
                          onClick={() => {
                            setSearchQuery('');
                            setSearchFocused(false);
                            setMobileMenuOpen(false);
                          }}
                          className="flex items-center gap-3 w-full text-left rounded-lg px-3 py-2 hover:bg-background transition-colors"
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="overflow-hidden">
                            <div className="text-sm font-medium text-foreground truncate">{calc.t}</div>
                            <div className="text-xs text-foreground/50 truncate">{calc.d}</div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : searchQuery.trim() ? (
                  <div className="px-4 py-8 text-center text-sm text-foreground/50">
                    No calculators match &ldquo;{searchQuery}&rdquo;
                  </div>
                ) : (
                  <div className="px-4 py-3 text-xs text-foreground/40">
                    Type to search 500+ calculators...
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground hover:bg-background transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5 text-foreground/80" />
            ) : (
              <Sun className="h-5 w-5 text-foreground/85" />
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground md:hidden hover:bg-background transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card px-4 pt-2 pb-6 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-4">
            <div className="text-xs font-semibold text-foreground/40 uppercase tracking-wider pt-2">
              Categories
            </div>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.map((cat) => {
                const Icon = CATEGORY_ICONS[cat.slug] || Calculator;
                return (
                  <Link
                    key={cat.slug}
                    href={`/categories/${cat.slug}/`}
                    prefetch={false}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 rounded-lg p-2 border border-border hover:bg-background transition-colors"
                  >
                    <Icon className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-xs font-medium truncate">{cat.name}</span>
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
