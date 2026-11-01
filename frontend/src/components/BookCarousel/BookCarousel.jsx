import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import fallbackBookCover from '../../assets/images/Book.jpeg';

const getAmazonUrl = (book) => {
  if (/^https:\/\/www\.amazon\./i.test(book.purchaseUrl || '')) return book.purchaseUrl;
  return `https://www.amazon.in/s?k=${encodeURIComponent(book.title)}`;
};

export default function BookCarousel({ books = [] }) {
  const prefersReducedMotion = useReducedMotion();

  if (!books.length) return null;

  return (
    <motion.section
      className="home-books-section section-block"
      aria-label="Featured books"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.12 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.55 }}
    >
      <div className="container">
        <div className="home-section-heading">
          <div>
            <p className="eyebrow">The reading room</p>
            <h2>Volumes for the shelf.</h2>
          </div>
        </div>

        <div className="book-carousel-grid" aria-label="Featured poetry books">
          {books.map((book, index) => (
            <motion.article
              className="book-carousel-card"
              key={book.slug || book.title}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.14 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.45, delay: prefersReducedMotion ? 0 : index * 0.07 }}
              whileHover={prefersReducedMotion ? undefined : { y: -5, rotateY: index % 2 ? -1 : 1 }}
            >
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
                {/* <p className="eyebrow">Kavirasa Editions · {book.year}</p> */}
                <h2 className="book-carousel-title">{book.title}</h2>
                <p className="book-carousel-author">By {book.author || 'Kavirasa'}</p>
                {/* <p>{book.description}</p> */}
                <div className="book-carousel-meta">
                  <a className="book-buy-button hero-action-button hero-action-primary" href={getAmazonUrl(book)} target="_blank" rel="noreferrer">Buy Now <span aria-hidden="true"></span></a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
