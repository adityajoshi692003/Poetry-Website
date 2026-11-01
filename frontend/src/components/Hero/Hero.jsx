import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';

export default function Hero({ query, onSearch }) {
  const prefersReducedMotion = useReducedMotion();
  const copyVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.section
      className="hero-section"
      initial={prefersReducedMotion ? false : 'hidden'}
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: prefersReducedMotion ? { duration: 0 } : { duration: 0.65, delayChildren: 0.12, staggerChildren: 0.11 }
        }
      }}
    >
      <div className="container text-only-hero">
        <div className="hero-copy">
          <motion.p className="eyebrow" variants={copyVariants} transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}>A living library of words &amp; emotions..</motion.p>
          <motion.h1 variants={copyVariants} transition={{ duration: prefersReducedMotion ? 0 : 0.55 }}>Explore the world of Rasa..</motion.h1>
          <motion.p className="hero-intro" variants={copyVariants} transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}>
            Explore poetry that captures the timeless spectrum of emotions.
          </motion.p>
          <motion.form className="poem-search" onSubmit={(event) => event.preventDefault()} role="search" variants={copyVariants} transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}>
            <label className="sr-only" htmlFor="home-poem-search">Search poems</label>
            <span aria-hidden="true" className="search-symbol">⌕</span>
            <input
              id="home-poem-search"
              type="search"
              value={query}
              onChange={(event) => onSearch(event.target.value)}
              placeholder="Search poems, themes or collections..."
            />
            {query && (
              <button type="button" className="search-clear" onClick={() => onSearch('')} aria-label="Clear poem search">
                Clear
              </button>
            )}
          </motion.form>
          <motion.div className="hero-browse-links" variants={copyVariants} transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}>
            <Link to="/poems" className="hero-action-button hero-action-primary">Browse all poems <span aria-hidden="true"></span></Link>
            <Link to="/collections" className="hero-action-button hero-action-secondary">Open the collections <span aria-hidden="true"></span></Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
