import React from 'react';

export default function Logo({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>
      {/* Desk frame base structure */}
      <rect 
        x="3" 
        y="7" 
        width="26" 
        height="18" 
        rx="4" 
        stroke="url(#logo-gradient)" 
        strokeWidth="2.5" 
        className="drop-shadow-sm"
      />
      {/* Floating Grid Lines matching calculation matrix sheet */}
      <line x1="9" y1="12" x2="15" y2="12" stroke="url(#logo-gradient)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="9" y1="17" x2="23" y2="17" stroke="url(#logo-gradient)" strokeWidth="2.5" strokeLinecap="round" />
      
      {/* Premium glowing focal intersection point */}
      <circle cx="21" cy="12" r="2.5" fill="url(#logo-gradient)" />
    </svg>
  );
}
