import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api.js';
import Loading from '../../components/Loading/Loading.jsx';
import PoemCard from '../../components/PoemCard/PoemCard.jsx';
import { samplePoems } from '../../data/archive.js';

export default function PoemsPage() {
  const [poems, setPoems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [collection, setCollection] = useState('');
  const [theme, setTheme] = useState('');

  useEffect(() => {
    const fetchPoems = async () => {
      try {
        const { data } = await api.get('/poems');
        setPoems(data.poems?.length ? data.poems : samplePoems);
      } catch (err) {
        setPoems(samplePoems);
      } finally {
        setLoading(false);
      }
    };

    fetchPoems();
  }, []);

  const uniqueCollections = useMemo(() => {
    return [...new Set(poems.map((poem) => poem.collection?.title).filter(Boolean))];
  }, [poems]);

  const uniqueThemes = useMemo(() => [...new Set(poems.flatMap((poem) => poem.themes || []))], [poems]);

  const filteredPoems = useMemo(() => {
    return poems.filter((poem) => {
      const matchesQuery = !query || `${poem.title} ${poem.excerpt} ${poem.collection?.title || ''}`.toLowerCase().includes(query.toLowerCase());
      const matchesCollection = !collection || poem.collection?.title === collection;
      const matchesTheme = !theme || (poem.themes || []).includes(theme);

      return matchesQuery && matchesCollection && matchesTheme;
    });
  }, [poems, query, collection, theme]);

  if (loading) return <Loading message="Reading the poems archive..." />;
  return (
    <>
      <section className="page-hero section-block poems-page-hero">
        <div className="container narrow">
          <p className="eyebrow">My Poems</p>
          <h2>Words That Find You..</h2>
          <h3>Every verse holds a feeling. Every poem tells a story.</h3>
          {/* <p className="page-intro">Explore a world of verses born from thoughts, emotions and moments.</p> */}
          <p className="page-intro">
            Discover poems that echo your feelings, awaken memories and give words to what the heart cannot express.
          </p>
        </div>
      </section>

      <div className="container filter-bar poem-filter-bar">
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search poems" aria-label="Search poems" />
        <select value={collection} onChange={(event) => setCollection(event.target.value)}>
          <option value="">Collection</option>
          {uniqueCollections.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
        <select value={theme} onChange={(event) => setTheme(event.target.value)}>
          <option value="">Theme</option>
          {uniqueThemes.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>

      <div className="container poem-grid archive-grid poem-card-grid">
        {filteredPoems.length ? (
          filteredPoems.map((poem, index) => <PoemCard key={poem.slug || poem._id || poem.title} poem={poem} index={index} showMeta={false} />)
        ) : (
          <div className="empty-panel">No poems match the current filters.</div>
        )}
      </div>

    </>
  );
}
