'use client';

import { motion } from 'framer-motion';
import { IconPhone, IconMail, IconInstagram, IconMapPin, IconClock } from '@/components/Icons';

const ease = [0.32, 0.72, 0, 1] as const;

const openingHours = [
  { day: 'Montag',     hours: 'Geschlossen',       closed: true  },
  { day: 'Dienstag',   hours: '11:00 – 19:00 Uhr', closed: false },
  { day: 'Mittwoch',   hours: '11:00 – 19:00 Uhr', closed: false },
  { day: 'Donnerstag', hours: '11:00 – 19:00 Uhr', closed: false },
  { day: 'Freitag',    hours: '11:00 – 20:00 Uhr', closed: false },
  { day: 'Samstag',    hours: '10:00 – 20:00 Uhr', closed: false },
  { day: 'Sonntag',    hours: '11:00 – 17:00 Uhr', closed: false },
];

const today = new Date().getDay();
const todayIndex = today === 0 ? 6 : today - 1;

const contactItems = [
  { Icon: IconPhone,     label: 'Telefon',   value: '0177 7897073',              href: 'tel:+491777897073' },
  { Icon: IconMail,      label: 'E-Mail',    value: 'hallo@creperie-klinger.de', href: 'mailto:hallo@creperie-klinger.de' },
  { Icon: IconInstagram, label: 'Instagram', value: '@creperie.klinger',          href: '#' },
];

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
};

export default function StandortPage() {
  return (
    <div style={{ background: 'var(--stone)', minHeight: '100dvh' }}>

      {/* ── Header ── */}
      <section style={{ background: 'var(--ink)', paddingTop: '9rem', paddingBottom: '6rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at 50% 60%, rgba(184,92,56,0.08) 0%, transparent 65%)' }} aria-hidden="true" />
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 10 }}>
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
            <p className="font-sans" style={{ fontSize: '10px', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--terra)', marginBottom: '1.5rem' }}>Komm vorbei</p>
            <h1 className="font-display" style={{ fontStyle: 'italic', fontWeight: 300, color: 'white', fontSize: 'clamp(3.5rem,8vw,6.5rem)', lineHeight: 0.9 }}>Standort</h1>
            <div style={{ width: 40, height: 1, background: 'rgba(184,92,56,0.5)', margin: '1.5rem auto' }} aria-hidden="true" />
            <p className="font-display" style={{ fontStyle: 'italic', fontWeight: 300, fontSize: '1.1rem', color: 'rgba(255,255,255,0.35)' }}>
              Du findest uns genau dort, wo der Duft nach frischen Crêpes dich leitet
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Main content ── */}
      <section style={{ padding: '6rem 0' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '2rem' }}>

            {/* Left: Address + Contact */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
              transition={{ staggerChildren: 0.12 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              {/* Address card */}
              <motion.div variants={fadeUp}
                style={{ background: 'var(--stone-dark)', border: '1px solid rgba(184,92,56,0.12)', padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--terra-light)', flexShrink: 0 }}>
                    <IconMapPin size={14} style={{ color: 'var(--terra)' }} />
                  </div>
                  <p className="font-sans" style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--terra)' }}>Adresse</p>
                </div>
                <address style={{ fontStyle: 'normal' }}>
                  <p className="font-display" style={{ fontStyle: 'italic', fontWeight: 300, fontSize: '1.5rem', color: 'var(--ink)', marginBottom: '0.5rem' }}>Crêperie Klinger</p>
                  <p className="font-sans" style={{ fontSize: '0.875rem', lineHeight: 1.7, color: 'var(--slate)' }}>
                    Stadsweide 2<br />
                    6041 TD Roermond, Niederlande
                  </p>
                </address>
                <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(184,92,56,0.1)' }}>
                  <p className="font-sans" style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--slate-light)', marginBottom: '0.625rem' }}>Zu finden im</p>
                  <p className="font-sans" style={{ fontSize: '0.875rem', lineHeight: 1.7, color: 'var(--slate)' }}>
                    Designer Outlet Roermond
                  </p>
                </div>
              </motion.div>

              {/* Contact card */}
              <motion.div variants={fadeUp}
                style={{ background: 'var(--stone-dark)', border: '1px solid rgba(184,92,56,0.12)', padding: '2rem' }}>
                <p className="font-sans" style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--terra)', marginBottom: '1.5rem' }}>Kontakt</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {contactItems.map(({ Icon, label, value, href }) => (
                    <a key={label} href={href} aria-label={`${label}: ${value}`}
                      style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none' }}>
                      <div style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--stone-muted)', flexShrink: 0 }}>
                        <Icon size={14} style={{ color: 'var(--slate)' }} />
                      </div>
                      <div>
                        <p className="font-sans" style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--slate-light)', marginBottom: '0.2rem' }}>{label}</p>
                        <p className="font-sans" style={{ fontSize: '0.875rem', color: 'var(--ink)', transition: 'color 0.25s ease' }}
                          onMouseEnter={e => e.currentTarget.style.color = 'var(--terra)'}
                          onMouseLeave={e => e.currentTarget.style.color = 'var(--ink)'}>{value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Opening hours */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp} transition={{ delay: 0.1 }}>
              <div style={{ background: 'var(--stone-dark)', border: '1px solid rgba(184,92,56,0.12)' }}>
                {/* Card header */}
                <div style={{ padding: '1.5rem 2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid rgba(184,92,56,0.1)' }}>
                  <div style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--terra-light)', flexShrink: 0 }}>
                    <IconClock size={14} style={{ color: 'var(--terra)' }} />
                  </div>
                  <p className="font-sans" style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--terra)' }}>Öffnungszeiten</p>
                </div>

                {/* Days */}
                {openingHours.map((entry, i) => (
                  <motion.div key={entry.day}
                    initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    transition={{ delay: i * 0.05 + 0.2, ease }}
                    style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '1rem 2rem',
                      borderBottom: i < openingHours.length - 1 ? '1px solid rgba(184,92,56,0.08)' : 'none',
                      background: i === todayIndex ? 'rgba(184,92,56,0.05)' : 'transparent',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', flexShrink: 0, background: i === todayIndex ? 'var(--terra)' : 'transparent' }} aria-label={i === todayIndex ? 'heute' : undefined} />
                      <span className="font-sans" style={{
                        fontSize: '0.875rem',
                        color: i === todayIndex ? 'var(--ink)' : 'var(--slate)',
                        fontWeight: i === todayIndex ? 500 : 300,
                      }}>
                        {entry.day}
                        {i === todayIndex && (
                          <span className="font-sans" style={{ marginLeft: '0.5rem', fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--terra)' }}>Heute</span>
                        )}
                      </span>
                    </div>
                    <span className="font-sans" style={{
                      fontSize: '0.875rem',
                      color: entry.closed ? 'var(--slate-light)' : i === todayIndex ? 'var(--ink)' : 'var(--slate)',
                      fontWeight: i === todayIndex ? 500 : 300,
                    }}>
                      {entry.hours}
                    </span>
                  </motion.div>
                ))}

                {/* Footer note */}
                <div style={{ padding: '1.25rem 2rem', borderTop: '1px solid rgba(184,92,56,0.1)', background: 'rgba(184,92,56,0.03)' }}>
                  <p className="font-sans" style={{ fontSize: '0.75rem', color: 'var(--slate-light)', lineHeight: 1.6 }}>
                    Abweichende Zeiten an Feiertagen möglich. Aktuelle Infos auf Instagram.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Map placeholder ── */}
      <section style={{ paddingBottom: '7rem' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 2rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }}>
            <div style={{ position: 'relative', overflow: 'hidden', height: 260, background: 'var(--stone-dark)', border: '1px solid rgba(184,92,56,0.12)' }}>
              {/* Map grid */}
              <svg viewBox="0 0 900 260" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.06 }} aria-hidden="true">
                {Array.from({ length: 7 }).map((_, i) => (
                  <line key={`h${i}`} x1="0" y1={i * 43} x2="900" y2={i * 43} stroke="var(--ink)" strokeWidth="0.8" />
                ))}
                {Array.from({ length: 18 }).map((_, i) => (
                  <line key={`v${i}`} x1={i * 55} y1="0" x2={i * 55} y2="260" stroke="var(--ink)" strokeWidth="0.8" />
                ))}
                <rect x="120" y="80" width="380" height="14" rx="2" fill="var(--ink)" opacity="0.5" />
                <rect x="300" y="0" width="14" height="260" rx="2" fill="var(--ink)" opacity="0.4" />
                <rect x="80" y="145" width="600" height="14" rx="2" fill="var(--ink)" opacity="0.4" />
              </svg>

              {/* Pin */}
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                <div style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--terra)', boxShadow: '0 6px 20px rgba(184,92,56,0.35)' }}>
                  <IconMapPin size={18} style={{ color: 'white' }} />
                </div>
                <span className="font-sans" style={{ fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', padding: '0.5rem 1rem', color: 'white', background: 'var(--terra)' }}>
                  Crêperie Klinger
                </span>
              </div>

              {/* Note */}
              <div style={{ position: 'absolute', bottom: '1rem', right: '1rem' }}>
                <span className="font-sans" style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.375rem 0.75rem', background: 'rgba(248,244,238,0.9)', color: 'var(--slate-light)', border: '1px solid rgba(184,92,56,0.12)' }}>
                  Kartenintegration folgt
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
