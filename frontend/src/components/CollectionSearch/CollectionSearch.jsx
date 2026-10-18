import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

export default function CollectionSearch({ collections = [] }) {
  const [query, setQuery] = useState('');

  const filteredCollections = useMemo(() => {
    if (!query.trim()) return collections.slice(0, 4);

    return collections.filter((collection) => {
      const searchText = `${collection.title} ${collection.theme} ${collection.description}`.toLowerCase();
      return searchText.includes(query.toLowerCase());
    });
  }, [collections, query]);

  return (
    <div className="search-panel">
      <label className="sr-only" htmlFor="collection-search">Search collections</label>
      <input
        id="collection-search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search monsoon, memory, landscape..."
      />

      <div className="mini-collection-list">
        {filteredCollections.length > 0 ? (
          filteredCollections.map((collection) => (
            <Link key={collection.slug} to={`/collections/${collection.slug}`} className="mini-collection-item">
              <span>{collection.title}</span>
              <small>{collection.theme}</small>
              <span className="collection-search-arrow" aria-hidden="true">↗</span>
            </Link>
          ))
        ) : (
          <p className="empty-state-small">No matching collection found.</p>
        )}
      </div>
    </div>
  );
}
