'use client';

import Link from 'next/link';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menü' },
  { href: '/galerie', label: 'Galerie' },
  { href: '/story', label: 'Story' },
  { href: '/standort', label: 'Standort' },
];

export default function Footer() {
  return (
    <footer style={{ background: 'var(--ink)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '4rem 2rem 2.5rem' }}>

        {/* Top grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: '3.5rem', marginBottom: '3.5rem' }}>

          {/* Brand */}
          <div>
            <p className="font-display" style={{ fontStyle: 'italic', fontWeight: 300, fontSize: '1.25rem', color: 'white', marginBottom: '1rem', lineHeight: 1 }}>
              Crêperie <span style={{ color: 'var(--terra)' }}>Klinger</span>
            </p>
            <p className="font-sans" style={{ fontSize: '0.875rem', lineHeight: 1.7, maxWidth: '28ch', color: 'rgba(255,255,255,0.35)' }}>
              Handgemachte Crêpes mit Sorgfalt — mitten in der Stadt. Täglich frisch, nach originalem bretonischem Rezept.
            </p>
            <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: 24, height: 1, background: 'rgba(184,92,56,0.5)' }} />
              <span className="font-sans" style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>
                Handmade daily
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-sans" style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '1.5rem' }}>
              Navigation
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }} role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-sans"
                    style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.4)', transition: 'color 0.25s ease', textDecoration: 'none' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-sans" style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '1.5rem' }}>
              Kontakt
            </p>
            <address style={{ fontStyle: 'normal', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <p className="font-sans" style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.4)' }}>Musterstraße 12</p>
              <p className="font-sans" style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.4)' }}>12345 Musterstadt</p>
              <div style={{ paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                <a href="tel:+49123456789" className="font-sans"
                  style={{ fontSize: '0.875rem', display: 'block', color: 'rgba(255,255,255,0.4)', transition: 'color 0.25s ease', textDecoration: 'none' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}>
                  +49 123 456 789
                </a>
                <a href="mailto:hallo@creperie-klinger.de" className="font-sans"
                  style={{ fontSize: '0.875rem', display: 'block', color: 'rgba(255,255,255,0.4)', transition: 'color 0.25s ease', textDecoration: 'none' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}>
                  hallo@creperie-klinger.de
                </a>
              </div>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="font-sans" style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.18)' }}>
            © {new Date().getFullYear()} Crêperie Klinger. Alle Rechte vorbehalten.
          </p>
          <p className="font-display" style={{ fontStyle: 'italic', fontSize: '0.875rem', color: 'rgba(184,92,56,0.4)' }}>
            Con amore
          </p>
        </div>
      </div>
    </footer>
  );
}
