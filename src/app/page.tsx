'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ZoomParallax, type ZoomImage } from '@/components/ZoomParallax';

const ease = [0.32, 0.72, 0, 1] as const;

const features = [
  { num: '01', label: 'Handgemacht', heading: 'Jede Crêpe ein Unikat', body: 'Kein Fertigteig. Unser Teig nach originalem bretonischem Rezept — täglich frisch angerührt und vor deinen Augen in der Pfanne gewendet.' },
  { num: '02', label: 'Authentisch', heading: 'Bretagne trifft Moderne', body: 'Echte Galettes aus Buchweizenmehl, süße Crêpes mit klassischen Belägen. Zeitlos gut, frisch interpretiert — mit Respekt vor der Tradition.' },
  { num: '03', label: 'Frische Zutaten', heading: 'Nur das Beste', body: 'Saisonale Früchte, regionaler Käse, handverlesene Zutaten. Was wir nicht selbst essen würden, kommt nicht in unsere Crêpes.' },
];

const preview = [
  { name: 'Nutella & Banana',                  desc: 'Süße Crêpe', price: '7,50 €', fav: true },
  { name: 'Nutella & Giotto',                  desc: 'Süße Crêpe', price: '8,50 €', fav: true },
  { name: 'Camembert & Cranberry',             desc: 'Herzhafte Crêpe', price: '8,50 €' },
  { name: 'Mozzarella, Cherry Tomato & Pesto', desc: 'Herzhafte Crêpe', price: '8,50 €' },
];

const stats = [
  { value: 2019, suffix: '', label: 'gegründet' },
  { value: 16,   suffix: '+', label: 'Sorten' },
  { value: 7,    suffix: '',  label: 'Tage die Woche' },
  { value: 100,  suffix: '%', label: 'Handgemacht' },
];

const zoomImages: ZoomImage[] = [
  { bg: 'linear-gradient(145deg, #F5E0E8 0%, #EAD0DC 100%)', icon: '✨', alt: 'Nutella & Giotto'   },
  { bg: 'linear-gradient(145deg, #F2DDE6 0%, #E8C4D0 100%)', icon: '🥞', alt: 'Süße Crêpe'         },
  { bg: 'linear-gradient(145deg, #EDE8DF 0%, #D8D0C4 100%)', icon: '🚐', alt: 'Der Wagen'           },
  { bg: 'linear-gradient(145deg, #EDE4D8 0%, #D8CCBC 100%)', icon: '🧀', alt: 'Cheese & Ham'        },
  { bg: 'linear-gradient(145deg, #F8F0E8 0%, #EDE0D0 100%)', icon: '🍓', alt: 'Frische Zutaten'     },
  { bg: 'linear-gradient(145deg, #2A2420 0%, #1A1614 100%)', icon: '🌙', alt: 'Abends am Wagen'     },
  { bg: 'linear-gradient(145deg, #E8E4DC 0%, #D4CEC4 100%)', icon: '☀️', alt: 'Sommerabend'         },
];

// Counter that animates up when in view
function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated) {
        setHasAnimated(true);
        let start = 0;
        const duration = 1400;
        const step = (timestamp: number) => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * value));
          if (progress < 1) requestAnimationFrame(step);
          else setCount(value);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return <span ref={ref}>{count}{suffix}</span>;
}


// ─── Features Section ────────────────────────────────────────────────────────
function FeaturesSection() {
  const [active, setActive] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);

  return (
    <section ref={sectionRef} style={{ padding: '8rem 0', background: 'var(--stone-dark)', overflow: 'hidden', position: 'relative' }}>
      <motion.div style={{ y: bgY, position: 'absolute', inset: 0, pointerEvents: 'none' }} aria-hidden="true">
        <div style={{ position: 'absolute', bottom: '-20%', right: '-5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(224,136,158,0.07) 0%, transparent 70%)' }} />
      </motion.div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, ease }}
          style={{ textAlign: 'center', marginBottom: '4rem', paddingBottom: '3rem', borderBottom: '1px solid rgba(224,136,158,0.15)' }}>
          <p className="font-sans" style={{ fontSize: '10px', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--terra)', marginBottom: '1rem' }}>Was uns ausmacht</p>
          <h2 className="font-display" style={{ fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(2.4rem,5vw,3.8rem)', color: 'var(--ink)', lineHeight: 1.0 }}>Mehr als eine Crêpe</h2>
        </motion.div>

        <div>
          {features.map((f, i) => {
            const isActive = active === i;
            return (
              <motion.div key={f.label}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease }}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '4rem 1fr 2fr',
                  gap: '3rem',
                  padding: '0',
                  borderBottom: '1px solid rgba(224,136,158,0.12)',
                  cursor: 'default',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'background 0.45s ease',
                  background: isActive ? 'rgba(224,136,158,0.06)' : 'transparent',
                }}
              >
                {/* Active accent bar */}
                <motion.div
                  animate={{ scaleY: isActive ? 1 : 0 }}
                  initial={{ scaleY: 0 }}
                  transition={{ duration: 0.45, ease: 'easeInOut' }}
                  style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: 'var(--terra)', transformOrigin: 'top' }}
                />

                {/* Number */}
                <motion.span
                  animate={{ fontSize: isActive ? '2.5rem' : '1.75rem', color: isActive ? 'var(--terra)' : 'rgba(224,136,158,0.65)' }}
                  transition={{ duration: 0.45, ease: 'easeInOut' }}
                  className="font-display"
                  style={{ fontStyle: 'italic', fontWeight: 300, lineHeight: 1, display: 'flex', alignItems: 'center', padding: '2.5rem 0', paddingLeft: '1rem' }}
                  aria-hidden="true"
                >
                  {f.num}
                </motion.span>

                {/* Title */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2.5rem 0' }}>
                  <p className="font-sans" style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--terra)', marginBottom: '0.375rem' }}>{f.label}</p>
                  <h3 className="font-display" style={{ fontStyle: 'italic', fontWeight: 300, fontSize: '1.5rem', color: 'var(--ink)', transition: 'color 0.3s ease' }}>{f.heading}</h3>
                  {/* Extra detail that shows when active */}
                  <motion.div
                    animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0, marginTop: isActive ? '0.75rem' : 0 }}
                    initial={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    <span className="font-sans" style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--terra)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ width: 16, height: 1, background: 'var(--terra)', display: 'inline-block' }} />
                      Mehr erfahren
                    </span>
                  </motion.div>
                </div>

                {/* Body text */}
                <motion.div
                  animate={{ opacity: isActive ? 1 : 0.7 }}
                  transition={{ duration: 0.45, ease: 'easeInOut' }}
                  style={{ display: 'flex', alignItems: 'center', padding: '2.5rem 0' }}
                >
                  <p className="font-sans" style={{ fontSize: '0.875rem', lineHeight: 1.8, color: 'var(--slate)', maxWidth: '52ch' }}>{f.body}</p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="font-sans"
          style={{ textAlign: 'center', marginTop: '2rem', fontSize: '11px', letterSpacing: '0.1em', color: 'var(--slate-light)' }}>
          Fahre über einen Bereich um mehr zu erfahren
        </motion.p>
      </div>
    </section>
  );
}

// ─── Jobs / Bewerbungsformular ────────────────────────────────────────────────
function JobsSection() {
  const [formState, setFormState] = useState({ name: '', email: '', bereich: '', nachricht: '' });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const inputStyle = (field: string): React.CSSProperties => ({
    width: '100%',
    padding: '0.875rem 1rem',
    background: 'transparent',
    border: 'none',
    borderBottom: `1px solid ${focused === field ? 'var(--terra)' : 'rgba(255,255,255,0.15)'}`,
    color: 'white',
    fontSize: '0.875rem',
    fontFamily: 'DM Sans, sans-serif',
    fontWeight: 300,
    outline: 'none',
    transition: 'border-color 0.3s ease',
    letterSpacing: '0.02em',
  });

  const labelStyle: React.CSSProperties = {
    fontSize: '10px',
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.35)',
    display: 'block',
    marginBottom: '0.25rem',
    fontFamily: 'DM Sans, sans-serif',
  };

  return (
    <section style={{ padding: '8rem 0', background: 'var(--stone-dark)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} aria-hidden="true">
        <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: 450, height: 450, borderRadius: '50%', background: 'radial-gradient(circle, rgba(224,136,158,0.07) 0%, transparent 70%)' }} />
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, ease }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p className="font-sans" style={{ fontSize: '10px', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--terra)', marginBottom: '1rem' }}>Karriere</p>
          <h2 className="font-display" style={{ fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(2.4rem,5vw,3.8rem)', color: 'var(--ink)', lineHeight: 1.0, marginBottom: '1.5rem' }}>Werde Teil des Teams</h2>
          <div style={{ width: 40, height: 1, background: 'var(--terra)', opacity: 0.4, margin: '0 auto 1.5rem' }} />
          <p className="font-sans" style={{ fontSize: '0.875rem', lineHeight: 1.7, color: 'var(--slate)', maxWidth: '44ch', margin: '0 auto' }}>
            Du liebst Crêpes, Menschen und das Arbeiten im Freien? Dann schreib uns — wir freuen uns auf dich.
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, ease }}
          style={{ background: 'var(--ink)', padding: '3rem', position: 'relative' }}>

          {/* Top accent line */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(to right, var(--terra), transparent)' }} />

          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease }}
              style={{ textAlign: 'center', padding: '2rem 0' }}>
              <motion.div animate={{ scale: [0, 1.2, 1] }} transition={{ duration: 0.5 }}
                style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(224,136,158,0.15)', border: '1px solid var(--terra)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M4 10L8 14L16 6" stroke="var(--terra)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
              <h3 className="font-display" style={{ fontStyle: 'italic', fontWeight: 300, fontSize: '1.75rem', color: 'white', marginBottom: '0.75rem' }}>Danke für deine Bewerbung!</h3>
              <p className="font-sans" style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7 }}>
                Wir melden uns so schnell wie möglich bei dir.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div>
                  <label htmlFor="name" style={labelStyle}>Name</label>
                  <input id="name" type="text" required placeholder="Dein vollständiger Name"
                    value={formState.name}
                    onChange={e => setFormState(s => ({ ...s, name: e.target.value }))}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused(null)}
                    style={inputStyle('name')} />
                </div>
                <div>
                  <label htmlFor="email" style={labelStyle}>E-Mail</label>
                  <input id="email" type="email" required placeholder="deine@email.de"
                    value={formState.email}
                    onChange={e => setFormState(s => ({ ...s, email: e.target.value }))}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                    style={inputStyle('email')} />
                </div>
              </div>

              <div>
                <label htmlFor="bereich" style={labelStyle}>Bereich</label>
                <select id="bereich" required
                  value={formState.bereich}
                  onChange={e => setFormState(s => ({ ...s, bereich: e.target.value }))}
                  onFocus={() => setFocused('bereich')}
                  onBlur={() => setFocused(null)}
                  style={{ ...inputStyle('bereich'), cursor: 'pointer' }}>
                  <option value="" disabled style={{ background: '#1A1614', color: 'rgba(255,255,255,0.4)' }}>Wonach interessierst du dich?</option>
                  <option value="crepes" style={{ background: '#1A1614' }}>Crêpes-Station</option>
                  <option value="service" style={{ background: '#1A1614' }}>Kundenbetreuung & Service</option>
                  <option value="vorbereitung" style={{ background: '#1A1614' }}>Vorbereitung & Küche</option>
                  <option value="sonstiges" style={{ background: '#1A1614' }}>Sonstiges</option>
                </select>
              </div>

              <div>
                <label htmlFor="nachricht" style={labelStyle}>Deine Nachricht</label>
                <textarea id="nachricht" required rows={5} placeholder="Erzähl uns ein bisschen von dir — was motiviert dich, was bringst du mit?"
                  value={formState.nachricht}
                  onChange={e => setFormState(s => ({ ...s, nachricht: e.target.value }))}
                  onFocus={() => setFocused('nachricht')}
                  onBlur={() => setFocused(null)}
                  style={{ ...inputStyle('nachricht'), resize: 'none', lineHeight: 1.7 }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <motion.button type="submit"
                  whileHover={{ y: -3, boxShadow: '0 10px 32px rgba(224,136,158,0.4)' }}
                  whileTap={{ scale: 0.97 }}
                  className="font-sans"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', borderRadius: '9999px', padding: '0.875rem 2.5rem', background: 'var(--terra)', color: 'white', border: 'none', cursor: 'pointer', boxShadow: '0 4px 20px rgba(224,136,158,0.3)', transition: 'background 0.3s ease' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--terra-dark)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'var(--terra)'}
                >
                  Bewerbung absenden
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M2 8L8 2M8 2H3.5M8 2V6.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </motion.button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Home Page ────────────────────────────────────────────────────────────────
export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });

  const heroOpacity = useTransform(heroScroll, [0, 0.6], [1, 0]);
  const heroY = useTransform(heroScroll, [0, 1], ['0%', '12%']);

  return (
    <>
      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <section ref={heroRef} style={{ position: 'relative', minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', overflow: 'hidden', background: 'var(--stone)' }}>
        <motion.div style={{ y: heroY }} className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(224,136,158,0.1) 0%, transparent 70%)' }} />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 w-full">
          <div style={{ maxWidth: 800, margin: '0 auto', padding: 'clamp(8rem,14vw,10rem) 2rem 6rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease }}
              style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
              <span style={{ display: 'block', width: 32, height: 1, background: 'var(--terra)', opacity: 0.6 }} aria-hidden="true" />
              <span className="font-sans" style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--terra)' }}>Handgemacht · Frisch · Täglich</span>
              <span style={{ display: 'block', width: 32, height: 1, background: 'var(--terra)', opacity: 0.6 }} aria-hidden="true" />
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2, ease }}
              style={{ lineHeight: 0.88, marginBottom: '2rem' }}>
              <span className="font-display" style={{ fontStyle: 'italic', fontWeight: 300, display: 'block', fontSize: 'clamp(5rem,12vw,9.5rem)', color: 'var(--ink)' }}>Crêperie</span>
              <motion.span
                className="font-display"
                style={{ fontStyle: 'italic', fontWeight: 400, display: 'block', fontSize: 'clamp(4rem,10vw,8rem)', color: 'var(--terra)', marginTop: '0.05em' }}
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              >
                Klinger
              </motion.span>
            </motion.h1>

            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.5, ease }}
              style={{ width: 60, height: 1, background: 'var(--terra)', opacity: 0.4, marginBottom: '2rem', transformOrigin: 'center' }} aria-hidden="true" />

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.55, ease }}
              className="font-display"
              style={{ fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(1.1rem,2vw,1.4rem)', color: 'var(--slate)', maxWidth: '36ch', lineHeight: 1.6, marginBottom: '3rem', textAlign: 'center' }}>
              Jede Crêpe erzählt eine Geschichte — frisch zubereitet, mit Sorgfalt gewendet.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7, ease }}
              style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
              <Link href="/menu" className="font-sans"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', borderRadius: '9999px', fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'white', padding: '1rem 2rem', background: 'var(--terra)', boxShadow: '0 4px 20px rgba(224,136,158,0.3)', transition: 'all 0.3s cubic-bezier(0.32,0.72,0,1)', textDecoration: 'none' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--terra-dark)'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 10px 32px rgba(224,136,158,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--terra)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(224,136,158,0.3)'; }}>
                Menü entdecken
              </Link>
              <Link href="/standort" className="font-sans"
                style={{ display: 'inline-flex', alignItems: 'center', borderRadius: '9999px', fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', padding: '1rem 2rem', border: '1px solid rgba(26,22,20,0.2)', color: 'var(--ink)', transition: 'all 0.3s cubic-bezier(0.32,0.72,0,1)', textDecoration: 'none' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--terra)'; e.currentTarget.style.color = 'var(--terra)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(26,22,20,0.2)'; e.currentTarget.style.color = 'var(--ink)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                Uns finden
              </Link>
            </motion.div>
          </div>

          <div style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }} aria-hidden="true">
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              style={{ width: 1, height: 44, background: 'linear-gradient(to bottom, var(--terra), transparent)', opacity: 0.5 }} />
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════
          STATS
      ══════════════════════════════ */}
      <section style={{ background: 'var(--ink)', padding: '4rem 0' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 2rem', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
          {stats.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease }}
              style={{ textAlign: 'center' }}>
              <p className="font-display" style={{ fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(2.5rem,5vw,3.5rem)', color: 'var(--terra)', lineHeight: 1 }}>
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="font-sans" style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginTop: '0.5rem' }}>{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════
          FEATURES — interaktiv
      ══════════════════════════════ */}
      <FeaturesSection />

      {/* ══════════════════════════════
          MENU PREVIEW
      ══════════════════════════════ */}
      <section style={{ padding: '8rem 0', background: 'var(--stone)' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', padding: '0 2rem' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, ease }}
            style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p className="font-sans" style={{ fontSize: '10px', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--terra)', marginBottom: '1rem' }}>Unsere Favoriten</p>
            <h2 className="font-display" style={{ fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(2.4rem,5vw,3.8rem)', color: 'var(--ink)', lineHeight: 1.0, marginBottom: '1.5rem' }}>Ein Vorgeschmack</h2>
            <div style={{ width: 40, height: 1, background: 'var(--terra)', opacity: 0.4, margin: '0 auto' }} aria-hidden="true" />
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            {preview.map((item, i) => (
              <motion.div key={item.name}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5, ease }}
                whileHover={{ x: 6 }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem 0', borderBottom: '1px solid rgba(224,136,158,0.12)', cursor: 'default' }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                    <h3 className="font-display" style={{ fontStyle: 'italic', fontWeight: 300, fontSize: '1.25rem', color: 'var(--ink)' }}>{item.name}</h3>
                    {item.fav && (
                      <span className="font-sans" style={{ fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.2rem 0.625rem', borderRadius: '9999px', background: 'var(--terra-light)', color: 'var(--terra-dark)' }}>Empfehlung</span>
                    )}
                  </div>
                  <p className="font-sans" style={{ fontSize: '0.875rem', color: 'var(--slate-light)' }}>{item.desc}</p>
                </div>
                <span className="font-display" style={{ fontStyle: 'italic', fontWeight: 300, fontSize: '1.1rem', marginLeft: '2rem', flexShrink: 0, color: 'var(--terra)' }}>{item.price}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.5 }}
            style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link href="/menu" className="font-sans"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', borderRadius: '9999px', padding: '0.875rem 2rem', border: '1px solid rgba(224,136,158,0.3)', color: 'var(--terra)', transition: 'all 0.3s cubic-bezier(0.32,0.72,0,1)', textDecoration: 'none' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--terra)'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'var(--terra)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--terra)'; e.currentTarget.style.borderColor = 'rgba(224,136,158,0.3)'; }}>
              Vollständige Karte
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M2 8L8 2M8 2H3.5M8 2V6.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════
          GALERIE PREVIEW — Zoom Parallax
      ══════════════════════════════ */}
      <section style={{ background: 'var(--stone-dark)' }}>

        {/* Header */}
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '8rem 2rem 4rem' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, ease }}
            style={{ textAlign: 'center' }}>
            <p className="font-sans" style={{ fontSize: '10px', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--terra)', marginBottom: '1rem' }}>Einblicke</p>
            <h2 className="font-display" style={{ fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(2.4rem,5vw,3.8rem)', color: 'var(--ink)', lineHeight: 1.0, marginBottom: '1.5rem' }}>Momente festgehalten</h2>
            <div style={{ width: 40, height: 1, background: 'var(--terra)', opacity: 0.4, margin: '0 auto' }} aria-hidden="true" />
          </motion.div>
        </div>

        {/* Zoom Parallax */}
        <ZoomParallax images={zoomImages} sectionBg="#EDE8DF" />

        {/* CTA */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.5 }}
          style={{ textAlign: 'center', padding: '5rem 2rem 8rem' }}>
          <Link href="/galerie" className="font-sans"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', borderRadius: '9999px', padding: '0.875rem 2rem', background: 'var(--terra)', color: 'white', boxShadow: '0 4px 20px rgba(224,136,158,0.3)', transition: 'all 0.3s cubic-bezier(0.32,0.72,0,1)', textDecoration: 'none' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--terra-dark)'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 10px 32px rgba(224,136,158,0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--terra)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(224,136,158,0.3)'; }}>
            Zur Galerie
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M2 8L8 2M8 2H3.5M8 2V6.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
        </motion.div>
      </section>

      {/* ══════════════════════════════
          INSTAGRAM
      ══════════════════════════════ */}
      <section style={{ padding: '8rem 0', background: 'var(--stone)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 2rem' }}>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, ease }}
            style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p className="font-sans" style={{ fontSize: '10px', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--terra)', marginBottom: '1rem' }}>Folg uns</p>
            <h2 className="font-display" style={{ fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(2.4rem,5vw,3.8rem)', color: 'var(--ink)', lineHeight: 1.0, marginBottom: '1.5rem' }}>Auf Instagram</h2>
            <div style={{ width: 40, height: 1, background: 'var(--terra)', opacity: 0.4, margin: '0 auto 1.5rem' }} aria-hidden="true" />
            <p className="font-sans" style={{ fontSize: '0.875rem', color: 'var(--slate)', lineHeight: 1.7 }}>
              Tagesaktuelle Momente, neue Sorten & Standort-Updates
            </p>
          </motion.div>

          {/* Post grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '3.5rem' }}>
            {[
              { bg: 'linear-gradient(145deg, #F5E0E8 0%, #EAD0DC 100%)', icon: '✨', label: 'Nutella & Giotto' },
              { bg: 'linear-gradient(145deg, #EDE8DF 0%, #D8D0C4 100%)', icon: '🚐', label: 'Der Wagen' },
              { bg: 'linear-gradient(145deg, #F2DDE6 0%, #E8C4D0 100%)', icon: '🥞', label: 'Süße Crêpe' },
              { bg: 'linear-gradient(145deg, #EDE4D8 0%, #D8CCBC 100%)', icon: '🧀', label: 'Cheese & Ham' },
              { bg: 'linear-gradient(145deg, #F8F0E8 0%, #EDE0D0 100%)', icon: '🍓', label: 'Frische Zutaten' },
              { bg: 'linear-gradient(145deg, #2A2420 0%, #1A1614 100%)', icon: '🌙', label: 'Abends am Wagen' },
            ].map((post, i) => (
              <motion.a
                key={i}
                href="https://www.instagram.com/creperie.klinger"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.07, ease }}
                whileHover={{ scale: 1.03 }}
                style={{ display: 'block', aspectRatio: '1', borderRadius: 2, background: post.bg, position: 'relative', overflow: 'hidden', cursor: 'pointer', textDecoration: 'none' }}
              >
                {/* Hover overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  style={{ position: 'absolute', inset: 0, background: 'rgba(26,22,20,0.45)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                >
                  {/* Instagram icon */}
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="5" stroke="white" strokeWidth="1.5"/>
                    <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="1.5"/>
                    <circle cx="17.5" cy="6.5" r="1" fill="white"/>
                  </svg>
                  <span className="font-sans" style={{ fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)' }}>{post.label}</span>
                </motion.div>

                {/* Icon placeholder */}
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '2.5rem', opacity: 0.35 }}>{post.icon}</span>
                </div>
              </motion.a>
            ))}
          </div>

          {/* CTA */}
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.5 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" stroke="var(--terra)" strokeWidth="1.5"/>
                <circle cx="12" cy="12" r="4.5" stroke="var(--terra)" strokeWidth="1.5"/>
                <circle cx="17.5" cy="6.5" r="1" fill="var(--terra)"/>
              </svg>
              <span className="font-sans" style={{ fontSize: '0.875rem', color: 'var(--slate)', letterSpacing: '0.02em' }}>@creperie.klinger</span>
            </div>
            <a
              href="https://www.instagram.com/creperie.klinger"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', borderRadius: '9999px', padding: '0.875rem 2rem', border: '1px solid rgba(224,136,158,0.3)', color: 'var(--terra)', transition: 'all 0.3s cubic-bezier(0.32,0.72,0,1)', textDecoration: 'none' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--terra)'; (e.currentTarget as HTMLAnchorElement).style.color = 'white'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--terra)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--terra)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(224,136,158,0.3)'; }}
            >
              Profil besuchen
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M2 8L8 2M8 2H3.5M8 2V6.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </motion.div>

        </div>
      </section>

      {/* ══════════════════════════════
          STORY TEASER
      ══════════════════════════════ */}
      <section style={{ padding: '8rem 0', background: 'var(--ink)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} aria-hidden="true">
          <div style={{ position: 'absolute', top: '-15%', right: '-5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(224,136,158,0.07) 0%, transparent 70%)' }} />
        </div>
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, ease }}>
            <p className="font-sans" style={{ fontSize: '10px', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--terra)', marginBottom: '1.5rem' }}>Unsere Geschichte</p>
            <h2 className="font-display" style={{ fontStyle: 'italic', fontWeight: 300, color: 'white', fontSize: 'clamp(2.4rem,5vw,4rem)', lineHeight: 1.0, marginBottom: '2rem' }}>Mehr als ein Wagen</h2>
            <div style={{ width: 40, height: 1, background: 'rgba(224,136,158,0.5)', margin: '0 auto 2rem' }} aria-hidden="true" />
            <p className="font-sans" style={{ fontSize: '0.875rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.45)', maxWidth: '42ch', margin: '0 auto 3rem' }}>
              Hinter der Crêperie Klinger steckt eine Leidenschaft für echtes Handwerk und der Wunsch, Menschen einen besonderen Moment zu schenken — mitten im Alltag.
            </p>
            <Link href="/story" className="font-sans"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'white', textDecoration: 'none', borderBottom: '1px solid rgba(224,136,158,0.5)', paddingBottom: '5px', transition: 'border-color 0.3s ease' }}
              onMouseEnter={e => e.currentTarget.style.borderBottomColor = 'var(--terra)'}
              onMouseLeave={e => e.currentTarget.style.borderBottomColor = 'rgba(224,136,158,0.5)'}>
              Unsere Story lesen
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M2 8L8 2M8 2H3.5M8 2V6.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════
          JOBS / BEWERBUNG
      ══════════════════════════════ */}
      <JobsSection />
    </>
  );
}
