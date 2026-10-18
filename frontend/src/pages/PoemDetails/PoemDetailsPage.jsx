import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../services/api.js';
import Loading from '../../components/Loading/Loading.jsx';
import { samplePoems } from '../../data/archive.js';

export default function PoemDetailsPage() {
  const { slug } = useParams();
  const [poem, setPoem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPoem = async () => {
      try {
        const { data } = await api.get(`/poems/${slug}`);
        setPoem(data.poem);
      } catch (err) {
        setPoem(samplePoems.find((entry) => entry.slug === slug) || null);
      } finally {
        setLoading(false);
      }
    };

    fetchPoem();
  }, [slug]);

  if (loading) return <Loading message="Opening the poem..." />;
  if (!poem) return <div className="container empty-panel">This poem is not in the archive.</div>;

  const content = poem.content.split('\n');

  return (
    <article className="container poem-detail">
      <header className="poem-detail-header">
        <p className="eyebrow">{poem.language}</p>
        <h1>{poem.title}</h1>
        <div className="poem-detail-meta">
          <span>{poem.collection?.title || 'Independent Poem'}</span>
          <span>{poem.year}</span>
          <span>{poem.language}</span>
        </div>
      </header>

      <div className="poem-body">
        {content.map((line, index) => (
          <p key={`${line}-${index}`}>{line || ' '}</p>
        ))}
      </div>

      <div className="poem-detail-footer">
        <div>
          <span>Author</span>
          <strong>Poetry Ink Archive</strong>
        </div>
        <div>
          <span>Collection</span>
          <strong>{poem.collection?.title || 'Standalone piece'}</strong>
        </div>
      </div>

      <div className="detail-nav">
        <Link to="/poems">← Back to poems</Link>
      </div>
    </article>
  );
}
