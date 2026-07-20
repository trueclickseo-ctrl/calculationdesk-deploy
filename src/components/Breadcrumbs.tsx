import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex py-3 text-foreground/60 text-xs sm:text-sm font-medium" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        <li className="inline-flex items-center">
          <Link 
            href="/" 
            className="inline-flex items-center gap-1.5 text-foreground/60 hover:text-primary transition-colors hover:underline"
          >
            <Home className="h-3.5 w-3.5" />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            <ChevronRight className="h-4 w-4 text-foreground/30 mx-1 shrink-0" />
            {item.path ? (
              <Link 
                href={item.path} 
                className="text-foreground/60 hover:text-primary transition-colors hover:underline"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground/90 font-semibold truncate max-w-[150px] sm:max-w-xs">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
