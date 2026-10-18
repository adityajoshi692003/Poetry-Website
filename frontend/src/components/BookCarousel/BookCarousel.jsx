import { useState } from 'react';
import { Link } from 'react-router-dom';
import fallbackBookCover from '../../assets/images/Book.jpeg';

const getAmazonUrl = (book) => {
  if (/^https:\/\/www\.amazon\./i.test(book.purchaseUrl || '')) return book.purchaseUrl;
  return `https://www.amazon.in/s?k=${encodeURIComponent(book.title)}`;
};

export default function BookCarousel({ books = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!books.length) return null;

  const visibleBooks = books.map((_, index) => books[(index + activeIndex) % books.length]);
  const move = (direction) => setActiveIndex((current) => (current + direction + books.length) % books.length);

  return (
    <section className="home-books-section section-block" aria-label="Featured books">
      <div className="container">
        <div className="home-section-heading">
          <div>
            <p className="eyebrow">The reading room</p>
            <h2>Volumes for the shelf.</h2>
          </div>
          <div className="carousel-controls">
            <button type="button" onClick={() => move(-1)} aria-label="Previous books">←</button>
            <button type="button" onClick={() => move(1)} aria-label="Next books">→</button>
          </div>
        </div>

        <div className="book-carousel-grid" aria-live="polite">
          {visibleBooks.map((book, index) => (
            <article className={`book-carousel-card${index === 0 ? ' is-current' : ''}`} key={book.slug || book.title}>
              <Link to="/poems" className="book-carousel-cover" aria-label={`Browse poems in ${book.title}`}>
                <img
                  src={book.coverImage && book.coverImage !== 'bookCover' ? book.coverImage : fallbackBookCover}
                  alt={`${book.title} book cover`}
                  loading="lazy"
                  onError={(event) => {
                    if (event.currentTarget.dataset.fallbackApplied !== 'true') {
                      event.currentTarget.dataset.fallbackApplied = 'true';
                      event.currentTarget.src = fallbackBookCover;
                    }
                  }}
                />
              </Link>
              <div className="book-carousel-copy">
                <p className="eyebrow">Poetry Ink Editions · {book.year}</p>
                <h3 className="book-carousel-title">{book.title}</h3>
                <p>{book.description}</p>
                <div className="book-carousel-meta">
                  <span>{book.poemCount || 'Selected'} poems</span>
                  <a href={getAmazonUrl(book)} target="_blank" rel="noreferrer">Open on Amazon ↗</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
