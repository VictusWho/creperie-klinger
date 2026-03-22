'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menü' },
  { href: '/galerie', label: 'Galerie' },
  { href: '/story', label: 'Story' },
  { href: '/standort', label: 'Standort' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, display: 'flex', justifyContent: 'center', paddingTop: '1.25rem', paddingLeft: '1rem', paddingRight: '1rem', pointerEvents: 'none' }}>
        <motion.nav
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
          style={{ pointerEvents: 'auto', width: '100%', maxWidth: 900 }}
        >
          <div
            style={{
              background: scrolled ? 'rgba(248,244,238,0.94)' : 'rgba(248,244,238,0.7)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(184,92,56,0.12)',
              borderRadius: '9999px',
              boxShadow: scrolled ? '0 4px 28px rgba(26,22,20,0.1)' : '0 2px 12px rgba(26,22,20,0.05)',
              transition: 'all 0.4s cubic-bezier(0.32,0.72,0,1)',
            }}
          >
            <div style={{ padding: '0 1.5rem', height: '3.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
              {/* Logo */}
              <Link href="/" aria-label="Crêperie Klinger — Startseite" className="shrink-0">
                <span
                  className="font-display italic font-light text-xl leading-none"
                  style={{ color: 'var(--ink)', letterSpacing: '0.01em' }}
                >
                  Crêperie{' '}
                  <span style={{ color: 'var(--terra)' }}>Klinger</span>
                </span>
              </Link>

              {/* Desktop links */}
              <ul style={{ display: 'flex', alignItems: 'center', gap: '2rem', listStyle: 'none' }} role="list">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`nav-link font-sans${pathname === link.href ? ' active' : ''}`}
                      style={{ fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: pathname === link.href ? 'var(--terra)' : 'var(--slate)', fontWeight: pathname === link.href ? 500 : 300, textDecoration: 'none', transition: 'color 0.3s ease' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href="/menu"
                className="hidden md:inline-flex items-center font-sans text-white shrink-0"
                style={{
                  borderRadius: '9999px',
                  padding: '0.5rem 1.25rem',
                  fontSize: '11px',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  background: 'var(--terra)',
                  boxShadow: '0 2px 12px rgba(184,92,56,0.3)',
                  transition: 'all 0.3s cubic-bezier(0.32,0.72,0,1)',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--terra-dark)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(184,92,56,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--terra)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(184,92,56,0.3)'; }}
              >
                Zur Karte
              </Link>

              {/* Hamburger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                style={{ width: 40, height: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5, cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
                aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
                aria-expanded={menuOpen}
              >
                <motion.span animate={menuOpen ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }} transition={{ duration: 0.3 }}
                  className="block h-px origin-center" style={{ width: 22, background: 'var(--ink)' }} />
                <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} transition={{ duration: 0.2 }}
                  className="block h-px" style={{ width: 22, background: 'var(--ink)' }} />
                <motion.span animate={menuOpen ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }} transition={{ duration: 0.3 }}
                  className="block h-px origin-center" style={{ width: 22, background: 'var(--ink)' }} />
              </button>
            </div>
          </div>
        </motion.nav>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center"
            style={{ background: 'rgba(248,244,238,0.97)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}
          >
            <ul className="flex flex-col items-center gap-1" role="list">
              {navLinks.map((link, i) => (
                <motion.li key={link.href}
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }}
                  transition={{ delay: i * 0.07, duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
                >
                  <Link href={link.href} className="block px-8 py-4 font-display italic font-light"
                    style={{ fontSize: 'clamp(2.8rem,10vw,4.5rem)', color: pathname === link.href ? 'var(--terra)' : 'var(--ink)' }}>
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
              className="font-sans"
              style={{ position: 'absolute', bottom: '3rem', fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--slate-light)' }}>
              Handgemacht · Täglich frisch
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
