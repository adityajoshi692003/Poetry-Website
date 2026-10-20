import { Link } from 'react-router-dom';
import fallbackBookCover from '../../assets/images/Book.jpeg';

const getAmazonUrl = (book) => {
  if (/^https:\/\/www\.amazon\./i.test(book.purchaseUrl || '')) return book.purchaseUrl;
  return `https://www.amazon.in/s?k=${encodeURIComponent(book.title)}`;
};

export default function BookCarousel({ books = [] }) {
  if (!books.length) return null;

  return (
    <section className="home-books-section section-block" aria-label="Featured books">
      <div className="container">
        <div className="home-section-heading">
          <div>
            <p className="eyebrow">The reading room</p>
            <h2>Volumes for the shelf.</h2>
          </div>
        </div>

        <div className="book-carousel-grid" aria-label="Featured poetry books">
          {books.map((book, index) => (
            <article className="book-carousel-card" key={book.slug || book.title}>
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
                {/* <p className="eyebrow">Poetry Ink Editions · {book.year}</p> */}
                <h2 className="book-carousel-title">{book.title}</h2>
                <p className="book-carousel-author">By {book.author || 'Poetry Ink'}</p>
                {/* <p>{book.description}</p> */}
                <div className="book-carousel-meta">
                  <span>{book.poemCount || 'Selected'} poems</span>
                  <a className="book-buy-button hero-action-button hero-action-primary" href={getAmazonUrl(book)} target="_blank" rel="noreferrer">Buy Now <span aria-hidden="true">↗</span></a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
