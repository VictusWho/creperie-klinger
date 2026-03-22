'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';

const ease = [0.32, 0.72, 0, 1] as const;

type Photo = {
  id: number;
  label: string;
  sub: string;
  category: string;
  span: 'normal' | 'tall' | 'wide';
  bg: string;
  icon: string;
};

const photos: Photo[] = [
  { id: 1,  label: 'Nutella & Banana',       sub: 'Süße Crêpes',    category: 'crepes',    span: 'tall',   bg: 'linear-gradient(145deg, #F2DDE6 0%, #E8C4D0 100%)',        icon: '🥞' },
  { id: 2,  label: 'Der Wagen',              sub: 'Unser Zuhause',  category: 'wagen',     span: 'normal', bg: 'linear-gradient(145deg, #EDE8DF 0%, #D8D0C4 100%)',        icon: '🚐' },
  { id: 3,  label: 'Teig anrühren',          sub: 'Handwerk',       category: 'behind',    span: 'normal', bg: 'linear-gradient(145deg, #F8F0E8 0%, #EDE0D0 100%)',        icon: '👐' },
  { id: 4,  label: 'Kinder Bueno',           sub: 'Süße Crêpes',    category: 'crepes',    span: 'wide',   bg: 'linear-gradient(145deg, #EDD8E0 0%, #E0C4CC 100%)',        icon: '🍫' },
  { id: 5,  label: 'Marktplatz',             sub: 'Atmosphäre',     category: 'atmo',      span: 'normal', bg: 'linear-gradient(145deg, #E8E4DC 0%, #D4CEC4 100%)',        icon: '☀️' },
  { id: 6,  label: 'Cheese & Ham',           sub: 'Herzhafte Crêpes',category: 'crepes',   span: 'normal', bg: 'linear-gradient(145deg, #EDE4D8 0%, #D8CCBC 100%)',        icon: '🧀' },
  { id: 7,  label: 'Sommerabend',            sub: 'Atmosphäre',     category: 'atmo',      span: 'tall',   bg: 'linear-gradient(145deg, #2A2420 0%, #1A1614 100%)',        icon: '🌅' },
  { id: 8,  label: 'Frische Zutaten',        sub: 'Handwerk',       category: 'behind',    span: 'normal', bg: 'linear-gradient(145deg, #F0EAE0 0%, #E4DCD0 100%)',        icon: '🍓' },
  { id: 9,  label: 'Nutella & Giotto',       sub: 'Süße Crêpes',    category: 'crepes',    span: 'normal', bg: 'linear-gradient(145deg, #F5E0E8 0%, #EAD0DC 100%)',        icon: '✨' },
  { id: 10, label: 'Wagen Detail',           sub: 'Unser Zuhause',  category: 'wagen',     span: 'wide',   bg: 'linear-gradient(145deg, #D8D4CC 0%, #C8C0B4 100%)',        icon: '🔧' },
  { id: 11, label: 'Mozzarella & Pesto',     sub: 'Herzhafte Crêpes',category: 'crepes',   span: 'normal', bg: 'linear-gradient(145deg, #E8EAE0 0%, #D8DCD0 100%)',        icon: '🌿' },
  { id: 12, label: 'Gäste & Stimmung',       sub: 'Atmosphäre',     category: 'atmo',      span: 'normal', bg: 'linear-gradient(145deg, #EDE8E0 0%, #E0D8CC 100%)',        icon: '💬' },
  { id: 13, label: 'Crêpe close-up',         sub: 'Handwerk',       category: 'behind',    span: 'normal', bg: 'linear-gradient(145deg, #F2D8D8 0%, #ECC8C8 100%)',        icon: '📸' },
  { id: 14, label: 'Raffaello',              sub: 'Süße Crêpes',    category: 'crepes',    span: 'normal', bg: 'linear-gradient(145deg, #F8F4EE 0%, #EEE8E0 100%)',        icon: '🤍' },
  { id: 15, label: 'Abends am Wagen',        sub: 'Atmosphäre',     category: 'atmo',      span: 'tall',   bg: 'linear-gradient(145deg, #241C1C 0%, #1A1410 100%)',        icon: '🌙' },
  { id: 16, label: 'Camembert & Cranberry',  sub: 'Herzhafte Crêpes',category: 'crepes',   span: 'normal', bg: 'linear-gradient(145deg, #E8D8E0 0%, #D8C8D0 100%)',        icon: '🫐' },
];

const categories = [
  { id: 'alle',    label: 'Alle' },
  { id: 'crepes',  label: 'Crêpes' },
  { id: 'wagen',   label: 'Der Wagen' },
  { id: 'atmo',    label: 'Atmosphäre' },
  { id: 'behind',  label: 'Hinter den Kulissen' },
];

export default function GaleriePage() {
  const [activeCategory, setActiveCategory] = useState('alle');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeCategory === 'alle' ? photos : photos.filter(p => p.category === activeCategory);
  const lightbox = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  const prev = useCallback(() => setLightboxIndex(i => i !== null ? (i - 1 + filtered.length) % filtered.length : null), [filtered.length]);
  const next = useCallback(() => setLightboxIndex(i => i !== null ? (i + 1) % filtered.length : null), [filtered.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape')     setLightboxIndex(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxIndex, prev, next]);

  return (
    <div style={{ background: 'var(--stone)', minHeight: '100dvh' }}>

      {/* ── Header ── */}
      <section style={{ background: 'var(--ink)', paddingTop: '9rem', paddingBottom: '6rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at 50% 60%, rgba(224,136,158,0.08) 0%, transparent 65%)' }} aria-hidden="true" />
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 10 }}>
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
            <p className="font-sans" style={{ fontSize: '10px', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--terra)', marginBottom: '1.5rem' }}>Impressionen</p>
            <h1 className="font-display" style={{ fontStyle: 'italic', fontWeight: 300, color: 'white', fontSize: 'clamp(3.5rem,8vw,6.5rem)', lineHeight: 0.9 }}>Galerie</h1>
            <div style={{ width: 40, height: 1, background: 'rgba(224,136,158,0.5)', margin: '1.5rem auto' }} aria-hidden="true" />
            <p className="font-display" style={{ fontStyle: 'italic', fontWeight: 300, fontSize: '1.1rem', color: 'rgba(255,255,255,0.35)' }}>
              Momente, Crêpes und ein bisschen Magie
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Category Filter ── */}
      <div style={{ position: 'sticky', top: '4.25rem', zIndex: 30, padding: '1.25rem 0', display: 'flex', justifyContent: 'center', background: 'rgba(248,244,238,0.96)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', borderBottom: '1px solid rgba(224,136,158,0.1)' }}>
        <div style={{ display: 'flex', gap: '0.25rem', borderRadius: '9999px', padding: '0.25rem', background: 'var(--stone-dark)', border: '1px solid rgba(224,136,158,0.12)', flexWrap: 'wrap', justifyContent: 'center' }}
          role="tablist">
          {categories.map(cat => (
            <button key={cat.id} role="tab" aria-selected={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="font-sans"
              style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.5rem 1.1rem', borderRadius: '9999px', cursor: 'pointer', border: 'none', background: activeCategory === cat.id ? 'var(--terra)' : 'transparent', color: activeCategory === cat.id ? 'white' : 'var(--slate)', transition: 'all 0.3s cubic-bezier(0.32,0.72,0,1)' }}>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Grid ── */}
      <section style={{ padding: '4rem 0 7rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem' }}>
          <AnimatePresence mode="wait">
            <motion.div key={activeCategory}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ columns: '3', columnGap: '1rem' }}>
              {filtered.map((photo, i) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease }}
                  onClick={() => setLightboxIndex(i)}
                  style={{
                    breakInside: 'avoid',
                    marginBottom: '1rem',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    height: photo.span === 'tall' ? 420 : photo.span === 'wide' ? 260 : 300,
                  }}
                  whileHover="hover"
                >
                  {/* Photo placeholder */}
                  <div style={{ width: '100%', height: '100%', background: photo.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '2.5rem', opacity: 0.5 }}>{photo.icon}</span>
                    <span className="font-sans" style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: photo.id === 7 || photo.id === 15 ? 'rgba(255,255,255,0.3)' : 'rgba(26,22,20,0.2)' }}>
                      Foto folgt
                    </span>
                  </div>

                  {/* Hover overlay */}
                  <motion.div
                    variants={{ hover: { opacity: 1 } }}
                    initial={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ position: 'absolute', inset: 0, background: 'rgba(26,22,20,0.65)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '1.5rem' }}
                  >
                    <p className="font-display" style={{ fontStyle: 'italic', fontWeight: 300, fontSize: '1.25rem', color: 'white', textAlign: 'center' }}>{photo.label}</p>
                    <p className="font-sans" style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--terra)' }}>{photo.sub}</p>
                    <div style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.3)', marginTop: '0.5rem' }} />
                    <p className="font-sans" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', marginTop: '0.25rem', letterSpacing: '0.1em' }}>Vergrößern</p>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox && lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setLightboxIndex(null)}
            style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(26,22,20,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', cursor: 'zoom-out' }}
          >
            {/* Prev button */}
            <button
              onClick={e => { e.stopPropagation(); prev(); }}
              aria-label="Vorheriges Bild"
              style={{ position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)', width: 48, height: 48, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s ease', zIndex: 10 }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.18)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8L10 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>

            {/* Next button */}
            <button
              onClick={e => { e.stopPropagation(); next(); }}
              aria-label="Nächstes Bild"
              style={{ position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)', width: 48, height: 48, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s ease', zIndex: 10 }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.18)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3L11 8L6 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25, ease }}
              onClick={e => e.stopPropagation()}
              style={{ position: 'relative', maxWidth: 800, width: '100%', cursor: 'default' }}
            >
              <div style={{ background: lightbox.bg, height: 520, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '4rem', opacity: 0.4 }}>{lightbox.icon}</span>
                <span className="font-sans" style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: lightbox.id === 7 || lightbox.id === 15 ? 'rgba(255,255,255,0.3)' : 'rgba(26,22,20,0.2)' }}>Foto folgt</span>
              </div>
              <div style={{ padding: '1.5rem 0 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <p className="font-display" style={{ fontStyle: 'italic', fontWeight: 300, fontSize: '1.5rem', color: 'white' }}>{lightbox.label}</p>
                  <p className="font-sans" style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--terra)', marginTop: '0.25rem' }}>{lightbox.sub}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <span className="font-sans" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>
                    {lightboxIndex + 1} / {filtered.length}
                  </span>
                  <button onClick={() => setLightboxIndex(null)}
                    style={{ background: 'none', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.6)', padding: '0.5rem 1rem', cursor: 'pointer', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase' }}
                    className="font-sans">
                    Schließen
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
