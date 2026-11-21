import { useEffect, useLayoutEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Navbar from '../components/Navbar/Navbar.jsx';
import Footer from '../components/Footer/Footer.jsx';
import PeacockFeather from '../components/PeacockFeather/PeacockFeather.jsx';
import '../components/PeacockFeather/PeacockFeather.css';
import '../styles/literary-world.css';
import '../styles/typography.css';
import { Outlet, useLocation } from 'react-router-dom';

const hasSeenIntro = () => {
  try {
    return Boolean(localStorage.getItem('poetry-intro-seen'));
  } catch {
    return true;
  }
};

export default function MainLayout() {
  const { pathname, search, key } = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const [introVisible, setIntroVisible] = useState(() => (
    pathname === '/' &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
    !hasSeenIntro()
  ));
  const world = pathname.split('/')[1] || 'home';

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [key]);

  useEffect(() => {
    if (!introVisible) return undefined;
    try {
      localStorage.setItem('poetry-intro-seen', 'true');
    } catch {
      // Intro persistence is optional when browser storage is unavailable.
    }
    const timer = window.setTimeout(() => setIntroVisible(false), 2600);
    return () => window.clearTimeout(timer);
  }, [introVisible]);

  useEffect(() => {
    if (pathname !== '/') setIntroVisible(false);
  }, [pathname]);

  const skipIntro = () => {
    try {
      localStorage.setItem('poetry-intro-seen', 'true');
    } catch {
      // Intro persistence is optional when browser storage is unavailable.
    }
    setIntroVisible(false);
  };

  return (
    <div className="page-shell" data-world={world}>
      <Navbar />
      <main className={`literary-world world-${world}`}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            className="literary-route-content"
            key={`${pathname}${search}`}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 22, rotateX: 2, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -16, rotateX: -1.5, scale: 0.99 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.48, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <PeacockFeather introActive={introVisible} />
      {introVisible && (
        <div className="opening-sequence" role="status" aria-label="Welcome to Kavyakala's literary world">
          <div className="opening-sequence-copy">
            <p className="opening-kicker">A literary world by Kavyakala  </p>
            <h1>Welcome to My World</h1>
            <p>Where poetry becomes an experience.</p>
          </div>
          <button type="button" className="opening-skip" onClick={skipIntro}>
            Skip introduction <span aria-hidden="true">→</span>
          </button>
        </div>
      )}
    </div>
  );
}
