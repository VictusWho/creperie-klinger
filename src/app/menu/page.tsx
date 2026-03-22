'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const ease = [0.32, 0.72, 0, 1] as const;

type MenuItem = { name: string; description: string; price: string; highlight?: boolean };
type Category = { id: string; label: string; items: MenuItem[] };

const categories: Category[] = [
  {
    id: 'suess', label: 'Süße Crêpes',
    items: [
      { name: 'Sugar',                       description: '',                          price: '4,50 €' },
      { name: 'Sugar & Cinnamon',            description: '',                          price: '4,50 €' },
      { name: 'Strawberry Jam',              description: '',                          price: '6,00 €' },
      { name: 'Applepuree, Sugar & Cinnamon',description: '',                          price: '6,00 €' },
      { name: 'Milka White Chocolate',       description: '',                          price: '6,00 €' },
      { name: 'Nutella',                     description: '',                          price: '6,00 €' },
      { name: 'Nutella & Banana',            description: '',                          price: '7,50 €', highlight: true },
      { name: 'Nutella & Cocos',             description: '',                          price: '7,50 €' },
      { name: 'Nutella & Giotto',            description: '',                          price: '8,50 €', highlight: true },
      { name: 'Nutella & Strawberry',        description: '',                          price: '6,00 €' },
      { name: 'Kinder Riegel',               description: '',                          price: '6,00 €' },
      { name: 'Kinder Bueno',                description: '',                          price: '6,00 €' },
      { name: 'Kinder Schokobons',           description: '',                          price: '6,00 €' },
      { name: 'Raffaello',                   description: '',                          price: '6,00 €' },
      { name: 'Oreo',                        description: '',                          price: '7,00 €' },
      { name: 'Grand Marnier',               description: 'Extra Topping',            price: '1,50 €' },
    ],
  },
  {
    id: 'herzhaft', label: 'Herzhafte Crêpes',
    items: [
      { name: 'Cheese',                              description: '',  price: '6,50 €' },
      { name: 'Cheese & Ham',                        description: '',  price: '7,50 €' },
      { name: 'Cheese & Salami',                     description: '',  price: '7,50 €' },
      { name: 'Camembert & Cranberry',               description: '',  price: '8,50 €', highlight: true },
      { name: 'Mozzarella, Cherry Tomato & Pesto',   description: '',  price: '8,50 €', highlight: true },
      { name: 'Cheese, Chicken & Pesto',             description: '',  price: '9,50 €' },
    ],
  },
  {
    id: 'getraenke', label: 'Getränke',
    items: [
      { name: 'Cidre Breton',    description: 'Bretonischer Apfelwein, halbtrocken, 0,33 l', price: '3,90 €' },
      { name: 'Limonade Maison', description: 'Hausgemachte Zitronenlimonade',               price: '3,50 €' },
      { name: 'Café Crème',      description: 'Espresso mit aufgeschäumter Sahne',            price: '2,90 €' },
      { name: 'Thé Chaud',       description: 'Heißer Tee, diverse Sorten',                  price: '2,50 €' },
      { name: 'Eau Minérale',    description: 'Still oder sprudelnd, 0,33 l',                price: '2,00 €' },
    ],
  },
];

export default function MenuPage() {
  const [active, setActive] = useState('suess');
  const current = categories.find(c => c.id === active)!;

  return (
    <div style={{ background: 'var(--stone)', minHeight: '100dvh' }}>

      {/* ── Header ── */}
      <section style={{ background: 'var(--ink)', paddingTop: '9rem', paddingBottom: '6rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at 50% 60%, rgba(184,92,56,0.08) 0%, transparent 65%)' }} aria-hidden="true" />
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 10 }}>
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
            <p className="font-sans" style={{ fontSize: '10px', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--terra)', marginBottom: '1.5rem' }}>Unsere Karte</p>
            <h1 className="font-display" style={{ fontStyle: 'italic', fontWeight: 300, color: 'white', fontSize: 'clamp(3.5rem,8vw,6.5rem)', lineHeight: 0.9 }}>Das Menü</h1>
            <div style={{ width: 40, height: 1, background: 'rgba(184,92,56,0.5)', margin: '1.5rem auto 0' }} aria-hidden="true" />
            <p className="font-display" style={{ fontStyle: 'italic', fontWeight: 300, fontSize: '1.1rem', color: 'rgba(255,255,255,0.35)', marginTop: '1.5rem' }}>
              Alles frisch zubereitet — jeden Tag aufs Neue
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Category tabs ── */}
      <div style={{ position: 'sticky', top: '4.25rem', zIndex: 30, padding: '1.25rem 0', display: 'flex', justifyContent: 'center', background: 'rgba(248,244,238,0.96)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', borderBottom: '1px solid rgba(184,92,56,0.1)' }}>
        <div style={{ display: 'flex', gap: '0.25rem', borderRadius: '9999px', padding: '0.25rem', background: 'var(--stone-dark)', border: '1px solid rgba(184,92,56,0.12)' }}
          role="tablist" aria-label="Menü-Kategorien">
          {categories.map(cat => (
            <button key={cat.id} role="tab" aria-selected={active === cat.id}
              onClick={() => setActive(cat.id)}
              className="font-sans"
              style={{
                fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase',
                padding: '0.625rem 1.25rem', borderRadius: '9999px', cursor: 'pointer', border: 'none',
                background: active === cat.id ? 'var(--terra)' : 'transparent',
                color: active === cat.id ? 'white' : 'var(--slate)',
                boxShadow: active === cat.id ? '0 2px 10px rgba(184,92,56,0.25)' : 'none',
                transition: 'all 0.3s cubic-bezier(0.32,0.72,0,1)',
              }}>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Items ── */}
      <section style={{ padding: '4rem 0 7rem' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 2rem' }}>
          <AnimatePresence mode="wait">
            <motion.div key={active}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease }}>
              <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.07 }}>
                {current.items.map(item => (
                  <motion.div key={item.name}
                    variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } }}
                    style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '1.75rem 0', borderBottom: '1px solid rgba(184,92,56,0.1)' }}>
                    <div style={{ flex: 1, paddingRight: '2rem' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem', marginBottom: '0.375rem' }}>
                        <h3 className="font-display" style={{ fontStyle: 'italic', fontWeight: 300, fontSize: '1.25rem', color: 'var(--ink)' }}>{item.name}</h3>
                        {item.highlight && (
                          <span className="font-sans" style={{ fontSize: '9px', padding: '0.2rem 0.625rem', borderRadius: '9999px', letterSpacing: '0.1em', textTransform: 'uppercase', background: 'var(--terra-light)', color: 'var(--terra-dark)' }}>
                            Empfehlung
                          </span>
                        )}
                      </div>
                      {item.description && <p className="font-sans" style={{ fontSize: '0.875rem', color: 'var(--slate-light)' }}>{item.description}</p>}
                    </div>
                    <span className="font-display" style={{ fontStyle: 'italic', fontWeight: 300, fontSize: '1.25rem', whiteSpace: 'nowrap', paddingTop: '0.125rem', color: 'var(--terra)' }}>{item.price}</span>
                  </motion.div>
                ))}
              </motion.div>
              <p className="font-sans" style={{ fontSize: '0.75rem', textAlign: 'center', marginTop: '4rem', color: 'var(--slate-light)', letterSpacing: '0.05em' }}>
                Alle Crêpes frisch zubereitet · Änderungen nach Verfügbarkeit möglich
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
