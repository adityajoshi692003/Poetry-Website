import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../services/api.js';
import Loading from '../../components/Loading/Loading.jsx';
import { sampleCollections, samplePoems } from '../../data/archive.js';

export default function CollectionDetailsPage() {
  const { slug } = useParams();
  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const { data } = await api.get(`/collections/${slug}`);
        setCollection(data.collection);
      } catch (err) {
        const sampleCollection = sampleCollections.find((entry) => entry.slug === slug);
        if (sampleCollection) {
          setCollection({
            ...sampleCollection,
            poems: samplePoems.filter((poem) => poem.collection.slug === slug)
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCollection();
  }, [slug]);

  if (loading) return <Loading message="Opening the volume..." />;
  if (!collection) return <div className="container empty-panel">This collection is not in the archive.</div>;

  return (
    <div className="container collection-detail-page">
      <div className="collection-detail-hero">
        <div className="collection-detail-cover" style={{ backgroundImage: `url(${collection.coverImage})` }} />
        <div className="collection-detail-copy">
          <p className="eyebrow">{collection.theme}</p>
          <h1>{collection.title}</h1>
          <p>{collection.description}</p>
          <div className="collection-meta-row">
            <span>{collection.poemCount || 0} Poems</span>
            <span>{collection.year}</span>
          </div>
        </div>
      </div>

      <div className="poem-list">
        {collection.poems?.map((poem) => (
          <Link key={poem.slug} to={`/poems/${poem.slug}`} className="poem-list-item">
            <span>{poem.title}</span>
            <small>{poem.year}</small>
          </Link>
        ))}
      </div>
    </div>
  );
}
