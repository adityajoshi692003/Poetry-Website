import { useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Hero from '../../components/Hero/Hero.jsx';
import BookCarousel from '../../components/BookCarousel/BookCarousel.jsx';
import GalleryCarousel from '../../components/GalleryCarousel/GalleryCarousel.jsx';
import VideoCarousel from '../../components/VideoCarousel/VideoCarousel.jsx';
import Loading from '../../components/Loading/Loading.jsx';
import PoemCard from '../../components/PoemCard/PoemCard.jsx';
import api from '../../services/api.js';
import { sampleBooks, sampleCollections, sampleGallery, samplePoems, sampleVideos } from '../../data/archive.js';

const MotionLink = motion.create(Link);

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
  const [videos, setVideos] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const loadArchive = async () => {
      const [collectionsResult, booksResult, poemsResult, galleryResult, videosResult] = await Promise.allSettled([
        api.get('/collections'),
        api.get('/books'),
        api.get('/poems'),
        api.get('/gallery'),
        api.get('/videos')
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
      setVideos(videosResult.status === 'fulfilled' && videosResult.value.data.videos?.length
        ? videosResult.value.data.videos
        : sampleVideos);
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

      <motion.section
        className="home-reading-section section-block"
        id="poem-shelf"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.12 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.55 }}
      >
        <div className="container">
          <div className="home-section-heading">
            <div>
              <p className="eyebrow">Featured Poems</p>
              <h2>{query ? 'Search results' : 'Read a little.'}</h2>
            </div>
            <Link to="/poems" className="text-link">Browse all poems →</Link>
          </div>
          {visiblePoems.length ? (
            <div className="poem-grid home-poem-grid">
              {visiblePoems.map((poem, index) => <PoemCard key={poem.slug} poem={poem} index={index} />)}
            </div>
          ) : (
            <p className="empty-panel">No poems found. Try another title, theme or phrase.</p>
          )}
        </div>
      </motion.section>

      <motion.section
        className="home-collections-section section-block"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.12 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.55 }}
      >
        <div className="container">
          <div className="home-section-heading">
            <div>
              <p className="eyebrow">Featured Shelves</p>
              <h2>Curated Collections.</h2>
            </div>
            <Link to="/collections" className="text-link">Explore →</Link>
          </div>
          <div className="home-collection-shelf">
            {collections.slice(0, 4).map((collection, index) => (
              <MotionLink
                to={`/collections/${collection.slug}`}
                className="home-collection-book"
                key={collection.slug}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={prefersReducedMotion ? undefined : { y: -4 }}
                viewport={{ amount: 0.18 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.42, delay: prefersReducedMotion ? 0 : index * 0.07 }}
              >
                <span className={`collection-cover cover-tone-${index % 4}`} style={{ backgroundImage: collection.coverImage ? `url(${collection.coverImage})` : undefined }}>
                  <span className="cover-rule" />
                  <strong>{collection.title}</strong>
                  <small>{collection.theme}</small>
                </span>
                <span className="collection-book-title">{collection.title}</span>
                <span className="collection-book-meta">{collection.poemCount || 0} poems</span>
              </MotionLink>
            ))}
          </div>
        </div>
      </motion.section>

      <BookCarousel books={books.slice(0, 3)} />
      <VideoCarousel videos={videos} />
      <GalleryCarousel items={gallery.slice(0, 7)} />
    </>
  );
}