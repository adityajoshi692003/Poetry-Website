import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../services/api.js';
import Loading from '../../components/Loading/Loading.jsx';
import { sampleCollections, samplePoems } from '../../data/archive.js';

const normalize = (str) => {
  try {
    return decodeURIComponent(str || '').trim().toLowerCase().replace(/[\s\-_,]+/g, ' ');
  } catch {
    return (str || '').trim().toLowerCase().replace(/[\s\-_,]+/g, ' ');
  }
};

export default function CollectionDetailsPage() {
  const { slug } = useParams();
  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const fetchCollection = async () => {
      try {
        const { data } = await api.get(`/collections/${slug}`);
        if (!active) return;

        const apiColl = data.collection;
        const norm = normalize(slug);
        const localPoems = samplePoems.filter(
          (poem) =>
            normalize(poem.collection?.slug) === norm ||
            normalize(poem.collection?.title) === norm
        );

        setCollection({
          ...apiColl,
          poems: apiColl.poems?.length ? apiColl.poems : localPoems
        });
      } catch (err) {
        if (!active) return;
        const norm = normalize(slug);
        const sampleCollection = sampleCollections.find(
          (entry) =>
            entry.slug === slug ||
            normalize(entry.slug) === norm ||
            normalize(entry.title) === norm
        );

        if (sampleCollection) {
          const localPoems = samplePoems.filter(
            (poem) =>
              normalize(poem.collection?.slug) === norm ||
              normalize(poem.collection?.title) === norm ||
              poem.collection?.slug === sampleCollection.slug
          );

          setCollection({
            ...sampleCollection,
            poems: localPoems,
            poemCount: localPoems.length || sampleCollection.poemCount
          });
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchCollection();

    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) return <Loading message="Opening the volume..." />;
  if (!collection) {
    return (
      <div className="container empty-panel" style={{ textAlign: 'center', padding: '5rem 1rem' }}>
        <h2>Collection Not Found</h2>
        <p style={{ margin: '1rem 0 2rem', color: 'var(--muted)' }}>
          This volume could not be found in the current archive.
        </p>
        <Link to="/collections" className="hero-action-button hero-action-primary">
          Back to Collections →
        </Link>
      </div>
    );
  }

  const poems = collection.poems || [];

  return (
    <div className="container collection-detail-page">
      <div className="kindle-breadcrumbs" style={{ marginBottom: '1.5rem' }}>
        <Link to="/collections" className="kindle-nav-link">
          ← All Collections
        </Link>
        <span className="kindle-sep">/</span>
        <span style={{ color: 'var(--ink)' }}>{collection.title}</span>
      </div>

      <div className="collection-detail-hero">
        <div
          className="collection-detail-cover"
          style={{ backgroundImage: `url(${collection.coverImage})` }}
          aria-label={`${collection.title} cover`}
        />
        <div className="collection-detail-copy">
          <p className="eyebrow">{collection.theme} · Rasa</p>
          <h1>{collection.title}</h1>
          <p className="collection-description-text">{collection.description}</p>
          <div className="collection-meta-row">
            <span>{poems.length || collection.poemCount || 0} Compositions</span>
            <span>Edition {collection.year || '2026'}</span>
          </div>
        </div>
      </div>

      <section className="collection-contents-section" aria-label="Poems in this volume">
        <div className="collection-contents-header">
          <h2>Reading Shelf in this Volume</h2>
          <p className="collection-contents-subtitle">
            Open any composition below to read it in full Kindle/Scribd reader mode.
          </p>
        </div>

        {poems.length > 0 ? (
          <div className="collection-poem-grid">
            {poems.map((poem, index) => (
              <article className="collection-poem-card" key={poem.slug || index}>
                <div className="collection-poem-number">#{String(index + 1).padStart(2, '0')}</div>
                <div className="collection-poem-info">
                  <div className="collection-poem-tags">
                    <span className="poem-tag-mini">{poem.language || 'Hindi'}</span>
                    <span className="poem-tag-mini">{poem.year || '2026'}</span>
                  </div>
                  <h3 className="collection-poem-title">{poem.title}</h3>
                  {poem.excerpt && (
                    <p className="collection-poem-excerpt">
                      {poem.excerpt.replace(/\n+/g, ' ')}
                    </p>
                  )}
                </div>
                <div className="collection-poem-action">
                  <Link
                    to={`/poems/${poem.slug}`}
                    className="hero-action-button hero-action-primary"
                    aria-label={`Read ${poem.title}`}
                  >
                    Read Poem <span>→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-panel">
            <p>Compositions for this volume are currently being curated in the archive.</p>
            <Link to="/poems" className="text-link">Explore all poems →</Link>
          </div>
        )}
      </section>
    </div>
  );
}
