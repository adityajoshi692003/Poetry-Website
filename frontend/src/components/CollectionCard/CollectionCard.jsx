import { Link } from 'react-router-dom';

export default function CollectionCard({ collection }) {
  return (
    <article className="collection-card">
      <div className="collection-visual" style={{ backgroundImage: `url(${collection.coverImage})` }} />
      <div className="collection-content">
        <h3>{collection.title}</h3>
        <p>{collection.description}</p>
        <div className="collection-meta">
          <span>{collection.poems?.length ?? collection.poemCount ?? 0} Poems</span>
          <span>{collection.year}</span>
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
    </article>
  );
}
