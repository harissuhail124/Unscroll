import React from 'react';

interface GeometricAccentProps {
  className?: string;
  variant?: 'divider' | 'watermark' | 'corner' | 'medallion';
  size?: number;
  opacity?: number;
}

/**
 * GeometricAccent: A pure inline SVG 8-fold Islamic star tessellation.
 * Zero external assets, zero emojis, fully responsive and styled via CSS variables.
 */
export const GeometricAccent: React.FC<GeometricAccentProps> = ({
  className = '',
  variant = 'divider',
  size = 40,
  opacity = 0.15
}) => {
  // Pure 8-pointed star (Khatam Sulayman) geometry coordinates in a 100x100 viewBox
  // Created from intersecting squares rotated by 45 degrees
  const starPath = `
    M 50,15 
    L 59,35 
    L 85,25 
    L 75,50 
    L 85,75 
    L 59,65 
    L 50,85 
    L 41,65 
    L 15,75 
    L 25,50 
    L 15,25 
    L 41,35 Z
  `;

  if (variant === 'divider') {
    return (
      <div 
        className={`flex items-center justify-center my-4 ${className}`} 
        style={{ display: 'flex', alignItems: 'center', width: '100%', gap: '12px' }}
        aria-hidden="true"
      >
        <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-subtle)' }} />
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          fill="none"
          stroke="var(--accent-emerald)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ opacity }}
        >
          <path d={starPath} fill="var(--accent-emerald-subtle)" />
          <circle cx="50" cy="50" r="14" stroke="var(--accent-gold)" strokeWidth="2.5" />
          <circle cx="50" cy="50" r="4" fill="var(--accent-gold)" />
        </svg>
        <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-subtle)' }} />
      </div>
    );
  }

  if (variant === 'watermark') {
    return (
      <svg
        className={className}
        width="100%"
        height="100%"
        viewBox="0 0 200 200"
        fill="none"
        stroke="var(--accent-emerald)"
        strokeWidth="1.5"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          pointerEvents: 'none',
          opacity,
          zIndex: 0
        }}
        aria-hidden="true"
      >
        {/* Central 8-pointed star */}
        <g transform="translate(50, 50)">
          <path d={starPath} fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="50" cy="50" r="18" stroke="var(--accent-gold)" strokeWidth="1.5" />
        </g>
        {/* Radiating corner geometry */}
        <line x1="0" y1="0" x2="200" y2="200" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 4" />
        <line x1="200" y1="0" x2="0" y2="200" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 4" />
        <circle cx="100" cy="100" r="85" stroke="currentColor" strokeWidth="1" strokeDasharray="2 6" />
      </svg>
    );
  }

  // Medallion / accent badge
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      stroke="var(--accent-emerald)"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{ opacity, display: 'inline-block' }}
      aria-hidden="true"
    >
      <path d={starPath} fill="var(--accent-emerald-subtle)" />
      <circle cx="50" cy="50" r="12" stroke="var(--accent-gold)" strokeWidth="2" />
      <circle cx="50" cy="50" r="3.5" fill="var(--accent-gold)" />
    </svg>
  );
};
