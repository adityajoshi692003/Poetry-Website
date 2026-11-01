import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import PoemLikeButton from '../PoemLikeButton/PoemLikeButton.jsx';

export default function PoemCard({ poem, index = 0 }) {
  const collection = poem.collection?.title || 'Untitled Collection';
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article
      className="poem-card"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={prefersReducedMotion ? undefined : { y: -3 }}
      viewport={{ amount: 0.18 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.45, delay: prefersReducedMotion ? 0 : (index % 4) * 0.06 }}
    >
      <div className="poem-card-body">
        <h3>{poem.title}</h3>
        <p className="poem-collection">{collection}</p>
        <p className="poem-excerpt">{poem.excerpt}</p>
        <div className="poem-meta">
          <span>{poem.year}</span>
          <span>{poem.language}</span>
        </div>
        <div className="poem-card-actions">
          <Link to={`/poems/${poem.slug}`} className="text-link">Read Poem →</Link>
          <PoemLikeButton slug={poem.slug} />
        </div>
      </div>
    </motion.article>
  );
}
