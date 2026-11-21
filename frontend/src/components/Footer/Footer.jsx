import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import api from '../../services/api.js';
import { getVisitorId } from '../../utils/visitor.js';

const links = [
  { to: '/', label: 'Home' },
  { to: '/collections', label: 'Collections' },
  { to: '/poems', label: 'Poems' },
  { to: '/about', label: 'About' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' }
];

export default function Footer() {
  const [uniqueVisits, setUniqueVisits] = useState(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    let active = true;

    api.post('/visitors', { visitorId: getVisitorId() })
      .then(({ data }) => {
        if (active) setUniqueVisits(data.count);
      })
      .catch(() => {
        if (active) setUniqueVisits(null);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <motion.footer
      className="site-footer"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.08 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.45 }}
    >
      <div className="container footer-grid">
        <div>
          <div className="footer-brand">Kavyakala</div>
          <p className="footer-tagline">The Divine Art of Poetry</p>
        </div>

        <nav className="footer-nav" aria-label="Footer navigation">
          {links.map((link) => (
            <Link key={link.to} to={link.to}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="footer-socials">
          <a href="https://www.instagram.com/suniljoshi_poet?igsh=MTlxaGcwMm9wMnM2dA==" target="_blank" rel="noreferrer" aria-label="Instagram">
            <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.7" cy="6.5" r=".8" className="icon-fill" /></svg>
            <span>Instagram</span>
          </a>
          <a href="https://www.facebook.com/share/1CybGZaUQA/" target="_blank" rel="noreferrer" aria-label="Facebook">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.1 20v-7h2.4l.4-2.8h-2.8V8.4c0-.8.2-1.3 1.4-1.3H17V4.6c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v1.8H8.3v2.8h2.5v7" /></svg>
            <span>Facebook</span>
          </a>
          <a href="https://youtube.com/@hindipoetrybysunil?si=hAjxBRdSUWDGkkiU" target="_blank" rel="noreferrer" aria-label="YouTube">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 8.2a2.8 2.8 0 0 0-2-2C17.2 5.7 12 5.7 12 5.7s-5.2 0-7 .5a2.8 2.8 0 0 0-2 2A29 29 0 0 0 2.5 12a29 29 0 0 0 .5 3.8 2.8 2.8 0 0 0 2 2c1.8.5 7 .5 7 .5s5.2 0 7-.5a2.8 2.8 0 0 0 2-2 29 29 0 0 0 .5-3.8 29 29 0 0 0-.5-3.8Z" /><path d="m10 15 5-3-5-3v6Z" className="icon-fill" /></svg>
            <span>YouTube</span>
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>Copyright © 2026 Kavyakala</span>
        <span>Made with ❤️</span>
        <span className="footer-views" aria-live="polite">
          <span>Visits:</span>
          <strong>{uniqueVisits === null ? '—' : uniqueVisits.toLocaleString()}</strong>
        </span>
      </div>
    </motion.footer>
  );
}
