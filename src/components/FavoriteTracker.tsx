'use client';
/* eslint-disable react-hooks/set-state-in-effect */

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CALCULATORS } from '@/calculators.config';
import { CalculatorConfig } from '@/types/calculator';
import { Heart, Clock, Star, Trash2 } from 'lucide-react';

interface FavoriteTrackerProps {
  currentSlug?: string;
}

// Key names for localStorage
const RECENTS_KEY = 'calchub_recents';
const FAVORITES_KEY = 'calchub_favorites';

function getStoredArray(key: string): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const item = localStorage.getItem(key);
    if (!item) return [];
    const parsed = JSON.parse(item);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function setStoredArray(key: string, arr: string[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(arr));
  } catch {}
}

export function FavoriteButton({ slug }: { slug: string }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = getStoredArray(FAVORITES_KEY);
    setIsFavorite(favorites.includes(slug));
  }, [slug]);

  const toggleFavorite = () => {
    const favorites = getStoredArray(FAVORITES_KEY);
    let updated: string[];
    if (favorites.includes(slug)) {
      updated = favorites.filter(s => s !== slug);
      setIsFavorite(false);
    } else {
      updated = [...favorites, slug];
      setIsFavorite(true);
    }
    setStoredArray(FAVORITES_KEY, updated);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('storage'));
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
        isFavorite
          ? 'bg-red-500/10 text-red-500 border-red-500/30 hover:bg-red-500/20'
          : 'bg-background hover:bg-border border-border text-foreground/70'
      }`}
    >
      <Heart className={`h-3.5 w-3.5 ${isFavorite ? 'fill-red-500' : ''}`} />
      <span>{isFavorite ? 'Favorited' : 'Add to Favorites'}</span>
    </button>
  );
}

export default function FavoriteTracker({ currentSlug }: FavoriteTrackerProps) {
  const [recents, setRecents] = useState<CalculatorConfig[]>([]);
  const [favorites, setFavorites] = useState<CalculatorConfig[]>([]);

  const loadData = () => {
    const recentSlugs = getStoredArray(RECENTS_KEY);
    const favoriteSlugs = getStoredArray(FAVORITES_KEY);

    const recentItems = recentSlugs
      .map(slug => CALCULATORS.find(c => c.slug === slug))
      .filter((c): c is CalculatorConfig => !!c);

    const favoriteItems = favoriteSlugs
      .map(slug => CALCULATORS.find(c => c.slug === slug))
      .filter((c): c is CalculatorConfig => !!c);

    setRecents(recentItems);
    setFavorites(favoriteItems);
  };

  useEffect(() => {
    // Add current slug to recents on mount
    if (currentSlug) {
      const recentSlugs = getStoredArray(RECENTS_KEY);
      const filtered = recentSlugs.filter(s => s !== currentSlug);
      const updated = [currentSlug, ...filtered].slice(0, 5); // keep last 5
      setStoredArray(RECENTS_KEY, updated);
    }

    loadData();

    // Listen for changes from FavoriteButton toggling
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, [currentSlug]);

  const clearRecents = () => {
    localStorage.removeItem(RECENTS_KEY);
    setRecents([]);
  };

  if (recents.length === 0 && favorites.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Favorites Panel */}
      {favorites.length > 0 && (
        <div className="rounded-2xl border border-border bg-card p-6 transition-colors">
          <div className="flex items-center gap-2 text-foreground font-bold">
            <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
            <h3 className="text-lg">Your Favorites</h3>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-2.5">
            {favorites.map(calc => (
              <Link
                key={calc.slug}
                href={`/calculators/${calc.slug}`}
                className="flex items-center justify-between rounded-xl border border-border bg-background/50 px-4 py-3 hover:border-primary/30 hover:bg-primary/5 transition-all text-sm font-semibold text-foreground"
              >
                <span>{calc.title}</span>
                <span className="text-xs font-normal text-foreground/40">{calc.category}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Recents Panel */}
      {recents.length > 0 && (
        <div className="rounded-2xl border border-border bg-card p-6 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-foreground font-bold">
              <Clock className="h-5 w-5 text-primary" />
              <h3 className="text-lg">Recently Used</h3>
            </div>
            <button
              onClick={clearRecents}
              className="text-foreground/40 hover:text-red-500 transition-colors p-1 rounded-full cursor-pointer hover:bg-background"
              title="Clear recents"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-2.5">
            {recents.map(calc => (
              <Link
                key={calc.slug}
                href={`/calculators/${calc.slug}`}
                className="flex items-center justify-between rounded-xl border border-border bg-background/50 px-4 py-3 hover:border-primary/30 hover:bg-primary/5 transition-all text-sm font-semibold text-foreground"
              >
                <span>{calc.title}</span>
                <span className="text-xs font-normal text-foreground/40">{calc.category}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
