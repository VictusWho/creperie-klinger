'use client';

import { motion } from 'framer-motion';

const ease = [0.32, 0.72, 0, 1] as const;

const timeline = [
  { year: '2019', title: 'Die Idee', text: 'Alles begann mit einer Reise durch die Bretagne — und dem ersten Biss in eine echte Galette. Diese Crêpe veränderte alles.' },
  { year: '2020', title: 'Das erste Rezept', text: 'Monatelang wurde in der Heimküche getüftelt. Teig, Temperatur, Timing — bis das Ergebnis endlich dem Original entsprach.' },
  { year: '2022', title: 'Der Wagen', text: 'Ein alter Citroën HY wurde zum Crêpes-Wagen umgebaut. Schlicht, handwerklich, authentisch — genauso, wie es sich gehört.' },
  { year: '2023', title: 'Heute', text: 'Die Crêperie Klinger ist ein fester Bestandteil der Stadt geworden. Bekannte Gesichter, neue Aromen, jeden Tag frisch.' },
];

const values = [
  { num: '01', title: 'Handwerk', description: 'Wir glauben daran, dass gutes Essen Zeit braucht. Kein Fertigteig, keine Abkürzungen.' },
  { num: '02', title: 'Qualität', description: 'Unsere Zutaten kommen von Produzenten, denen wir vertrauen. Frisch, saisonal, ehrlich.' },
  { num: '03', title: 'Verbindung', description: 'Ein Wagen auf der Straße schafft Begegnungen. Genau das wollen wir — täglich.' },
];

export default function StoryPage() {
  return (
    <div style={{ background: 'var(--stone)', minHeight: '100dvh' }}>

      {/* ── Header ── */}
      <section style={{ background: 'var(--stone-dark)', paddingTop: '9rem', paddingBottom: '6rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at 50% 70%, rgba(184,92,56,0.07) 0%, transparent 65%)' }} aria-hidden="true" />
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 10 }}>
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
            <p className="font-sans" style={{ fontSize: '10px', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--terra)', marginBottom: '1.5rem' }}>Wer wir sind</p>
            <h1 className="font-display" style={{ fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(3.5rem,8vw,6.5rem)', color: 'var(--ink)', lineHeight: 0.9 }}>Unsere Story</h1>
            <div style={{ width: 40, height: 1, background: 'rgba(184,92,56,0.4)', margin: '1.5rem auto' }} aria-hidden="true" />
            <p className="font-display" style={{ fontStyle: 'italic', fontWeight: 300, fontSize: '1.1rem', color: 'var(--slate)', maxWidth: '44ch', margin: '0 auto' }}>
              Von einer Reise in die Bretagne bis zum Crêpes-Wagen in deiner Stadt
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Pullquote ── */}
      <section style={{ padding: '6rem 0' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 2rem' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, ease }}>
            <div style={{ padding: '3rem 3.5rem', background: 'var(--stone-dark)', borderLeft: '2px solid var(--terra)' }}>
              <p className="font-display" style={{ fontStyle: 'italic', fontWeight: 300, textAlign: 'center', lineHeight: 1.6, marginBottom: '1.5rem', fontSize: 'clamp(1.35rem,2.5vw,1.85rem)', color: 'var(--ink)' }}>
                &ldquo;Wir machen keine Fast-Food-Crêpes. Wir machen Crêpes, bei denen du kurz inne hältst — und einfach lächelst.&rdquo;
              </p>
              <p className="font-sans" style={{ fontSize: '11px', textAlign: 'center', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--slate-light)' }}>— Familie Klinger</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section style={{ background: 'var(--stone-dark)', padding: '5rem 0 7rem' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 2rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease }}
            style={{ textAlign: 'center', marginBottom: '3.5rem', paddingBottom: '3rem', borderBottom: '1px solid rgba(184,92,56,0.12)' }}>
            <p className="font-sans" style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--terra)', marginBottom: '1rem' }}>Unsere Reise</p>
            <h2 className="font-display" style={{ fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(2.4rem,5vw,3.8rem)', color: 'var(--ink)', lineHeight: 1.0 }}>Von der Idee zum Wagen</h2>
          </motion.div>

          <div>
            {timeline.map((entry, i) => (
              <motion.div key={entry.year}
                initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease }}
                style={{ display: 'grid', gridTemplateColumns: '5rem 1fr 1.5fr', gap: '3rem', padding: '2.5rem 0', borderBottom: '1px solid rgba(184,92,56,0.1)' }}>
                <span className="font-display" style={{ fontStyle: 'italic', fontWeight: 300, fontSize: '1.1rem', color: 'var(--terra)', opacity: 0.8, paddingTop: '0.2rem' }}>{entry.year}</span>
                <h3 className="font-display" style={{ fontStyle: 'italic', fontWeight: 300, fontSize: '1.5rem', color: 'var(--ink)', paddingTop: '0.1rem' }}>{entry.title}</h3>
                <p className="font-sans" style={{ fontSize: '0.875rem', lineHeight: 1.7, color: 'var(--slate)', maxWidth: '42ch' }}>{entry.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section style={{ padding: '7rem 0' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 2rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease }}
            style={{ textAlign: 'center', marginBottom: '3.5rem', paddingBottom: '3rem', borderBottom: '1px solid rgba(184,92,56,0.12)' }}>
            <p className="font-sans" style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--terra)', marginBottom: '1rem' }}>Was uns antreibt</p>
            <h2 className="font-display" style={{ fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(2.4rem,5vw,3.8rem)', color: 'var(--ink)', lineHeight: 1.0 }}>Unsere Werte</h2>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            transition={{ staggerChildren: 0.1 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}
          >
            {values.map(val => (
              <motion.div key={val.title}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}
                style={{ padding: '2.5rem 2rem', background: 'var(--stone-dark)', borderTop: '2px solid rgba(184,92,56,0.25)', transition: 'border-color 0.3s ease', cursor: 'default' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderTopColor = 'var(--terra)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderTopColor = 'rgba(184,92,56,0.25)'}
              >
                <span className="font-display" style={{ fontStyle: 'italic', display: 'block', marginBottom: '1.25rem', fontSize: '2.5rem', color: 'rgba(184,92,56,0.2)', lineHeight: 1 }} aria-hidden="true">{val.num}</span>
                <h3 className="font-display" style={{ fontStyle: 'italic', fontWeight: 300, fontSize: '1.5rem', color: 'var(--ink)', marginBottom: '0.75rem' }}>{val.title}</h3>
                <p className="font-sans" style={{ fontSize: '0.875rem', lineHeight: 1.7, color: 'var(--slate)' }}>{val.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
