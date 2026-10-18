import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../../components/Hero/Hero.jsx';
import BookCarousel from '../../components/BookCarousel/BookCarousel.jsx';
import GalleryCarousel from '../../components/GalleryCarousel/GalleryCarousel.jsx';
import Loading from '../../components/Loading/Loading.jsx';
import PoemCard from '../../components/PoemCard/PoemCard.jsx';
import api from '../../services/api.js';
import { sampleBooks, sampleCollections, sampleGallery, samplePoems } from '../../data/archive.js';

const shufflePoems = (items) => {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
};

export default function HomePage() {
  const [collections, setCollections] = useState([]);
  const [books, setBooks] = useState([]);
  const [poems, setPoems] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArchive = async () => {
      const [collectionsResult, booksResult, poemsResult, galleryResult] = await Promise.allSettled([
        api.get('/collections'),
        api.get('/books'),
        api.get('/poems'),
        api.get('/gallery')
      ]);

      const availableCollections = collectionsResult.status === 'fulfilled' ? collectionsResult.value.data.collections : [];
      const availableBooks = booksResult.status === 'fulfilled' ? booksResult.value.data.books : [];
      const availablePoems = poemsResult.status === 'fulfilled' ? poemsResult.value.data.poems : [];
      const availableGallery = galleryResult.status === 'fulfilled' ? galleryResult.value.data.gallery : [];

      setCollections(availableCollections?.length ? availableCollections : sampleCollections);
      const booksWithSamples = [...(availableBooks || [])];
      sampleBooks.forEach((sampleBook) => {
        if (booksWithSamples.length < 3 && !booksWithSamples.some((book) => book.title === sampleBook.title)) {
          booksWithSamples.push(sampleBook);
        }
      });
      setBooks(booksWithSamples.slice(0, 3));
      setPoems(shufflePoems(availablePoems?.length ? availablePoems : samplePoems));
      setGallery(availableGallery?.length ? availableGallery : sampleGallery);
      setLoading(false);
    };

    loadArchive();
  }, []);

  const visiblePoems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = normalizedQuery
      ? poems.filter((poem) => {
          const searchableText = [poem.title, poem.excerpt, poem.content, poem.collection?.title, ...(poem.themes || [])]
            .filter(Boolean)
            .join(' ')
            .toLowerCase();
          return searchableText.includes(normalizedQuery);
        })
      : poems;

    return filtered.slice(0, 3);
  }, [poems, query]);

  if (loading) return <Loading message="Opening the library..." />;

  return (
    <>
      <Hero query={query} onSearch={setQuery} />

      <section className="home-reading-section section-block" id="poem-shelf">
        <div className="container">
          <div className="home-section-heading">
            <div>
              <p className="eyebrow">The poem shelf</p>
              <h2>{query ? 'Search results' : 'Read a little.'}</h2>
            </div>
            <Link to="/poems" className="text-link">Browse all poems →</Link>
          </div>
          {visiblePoems.length ? (
            <div className="poem-grid home-poem-grid">
              {visiblePoems.map((poem) => <PoemCard key={poem.slug} poem={poem} />)}
            </div>
          ) : (
            <p className="empty-panel">No poems found. Try another title, theme or phrase.</p>
          )}
        </div>
      </section>

      <section className="home-collections-section section-block">
        <div className="container">
          <div className="home-section-heading">
            <div>
              <p className="eyebrow">Featured shelves</p>
              <h2>Curated collections.</h2>
            </div>
            <Link to="/collections" className="text-link">Explore all collections →</Link>
          </div>
          <div className="home-collection-shelf">
            {collections.slice(0, 4).map((collection, index) => (
              <Link to={`/collections/${collection.slug}`} className="home-collection-book" key={collection.slug}>
                <span className={`collection-cover cover-tone-${index % 4}`} style={{ backgroundImage: collection.coverImage ? `url(${collection.coverImage})` : undefined }}>
                  <span className="cover-rule" />
                  <strong>{collection.title}</strong>
                  <small>{collection.theme}</small>
                </span>
                <span className="collection-book-title">{collection.title}</span>
                <span className="collection-book-meta">{collection.poemCount || 0} poems · {collection.year}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <BookCarousel books={books.slice(0, 3)} />
      <GalleryCarousel items={gallery.slice(0, 7)} />
    </>
  );
}