import type {CSSProperties, ReactNode} from 'react';

export function Hero({image, eyebrow, title, text, compact = false, children}: {image: string; eyebrow: string; title: string; text: string; compact?: boolean; children?: ReactNode}) {
  return (
    <section className={`page-hero${compact ? ' compact-hero' : ''}`} style={{'--hero-image': `url('${image}')`} as CSSProperties}>
      <div className="hero-overlay" />
      <div className="container hero-content"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{text}</p>{children}</div>
    </section>
  );
}

