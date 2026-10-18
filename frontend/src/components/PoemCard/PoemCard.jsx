import { Link } from 'react-router-dom';

export default function PoemCard({ poem }) {
  const collection = poem.collection?.title || 'Untitled Collection';

  return (
    <article className="poem-card">
      <div className="poem-card-body">
        <h3>{poem.title}</h3>
        <p className="poem-collection">{collection}</p>
        <p className="poem-excerpt">{poem.excerpt}</p>
        <div className="poem-meta">
          <span>{poem.year}</span>
          <span>{poem.language}</span>
        </div>
        <Link to={`/poems/${poem.slug}`} className="text-link">
          Read Poem →
        </Link>
      </div>
    </article>
  );
}
