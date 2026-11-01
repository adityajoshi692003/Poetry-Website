import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';

export default function CollectionCard({ collection }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article
      className="collection-card"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={prefersReducedMotion ? undefined : { y: -3 }}
      viewport={{ amount: 0.15 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
    >
      <div className="collection-visual" style={{ backgroundImage: `url(${collection.coverImage})` }} />
      <div className="collection-content">
        <h3>{collection.title}</h3>
        <p>{collection.description}</p>
        <div className="collection-meta">
          <span>{collection.poems?.length ?? collection.poemCount ?? 0} Poems</span>
        </div>
        {collection.poems?.length > 0 && (
          <ul className="collection-poem-list" aria-label={`Poems in ${collection.title}`}>
            {collection.poems.map((poem) => (
              <li key={poem.slug}>
                <Link to={`/poems/${poem.slug}`}>{poem.title}<span aria-hidden="true">↗</span></Link>
              </li>
            ))}
          </ul>
        )}
        <Link to={`/collections/${collection.slug}`} className="text-link">
          Open collection →
        </Link>
      </div>
    </motion.article>
  );
}
