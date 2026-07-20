import React from 'react';

type AdPosition = 'header' | 'sidebar' | 'in-content' | 'footer';

interface AdSlotProps {
  position: AdPosition;
  className?: string;
}

const POSITION_STYLES: Record<AdPosition, { container: string; inner: string; label: string }> = {
  header: {
    container: 'w-full my-6 flex justify-center items-center overflow-hidden',
    inner: 'w-full max-w-[728px] min-h-[90px] bg-background border border-dashed border-border rounded-lg flex items-center justify-center text-xs text-foreground/30 relative',
    label: 'Header Ad Slot (728x90)',
  },
  sidebar: {
    container: 'w-full my-4 flex justify-center items-center overflow-hidden',
    inner: 'w-full max-w-[300px] min-h-[250px] md:min-h-[600px] bg-background border border-dashed border-border rounded-lg flex items-center justify-center text-xs text-foreground/30 relative',
    label: 'Sidebar Ad Slot (300x250 or 300x600)',
  },
  'in-content': {
    container: 'w-full my-6 flex justify-center items-center overflow-hidden',
    inner: 'w-full max-w-[600px] min-h-[100px] bg-background border border-dashed border-border rounded-lg flex items-center justify-center text-xs text-foreground/30 relative',
    label: 'In-Content Ad Slot',
  },
  footer: {
    container: 'w-full my-8 flex justify-center items-center overflow-hidden',
    inner: 'w-full max-w-[728px] min-h-[90px] bg-background border border-dashed border-border rounded-lg flex items-center justify-center text-xs text-foreground/30 relative',
    label: 'Footer Ad Slot (728x90)',
  },
};

// Change this to true when you link your Google AdSense or other ad network script!
const SHOW_ADS = false;

export default function AdSlot({ position, className = '' }: AdSlotProps) {
  const styles = POSITION_STYLES[position];

  if (!SHOW_ADS) return null;

  return (
    <div className={`${styles.container} ${className}`} aria-hidden="true">
      <div className={styles.inner}>
        {/* Placeholder styling which keeps layout height stable */}
        <span className="font-mono text-[10px] tracking-wider uppercase select-none">
          {styles.label}
        </span>
        <span className="absolute top-1 right-2 text-[8px] font-sans tracking-wide uppercase select-none opacity-50">
          Advertisement
        </span>
      </div>
    </div>
  );
}
