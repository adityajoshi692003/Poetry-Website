import { Link } from 'react-router-dom';

export default function FeaturedBook({ book }) {
  if (!book) return null;

  return (
    <section className="book-feature section-block">
      <div className="container book-layout">
        <div className="book-cover-wrap">
          <div className="book-cover" style={{ backgroundImage: `url(${book.coverImage})` }} />
        </div>

        <div className="book-details">
          <p className="eyebrow">Featured volume · {book.year}</p>
          <h2>{book.title}</h2>
          <p>{book.description}</p>
          <ul className="book-meta-list">
            <li>
              <span>Author</span>
              <strong>{book.author}</strong>
            </li>
            <li>
              <span>Publication Year</span>
              <strong>{book.year}</strong>
            </li>
            <li>
              <span>Number of Poems</span>
              <strong>28</strong>
            </li>
          </ul>
            <Link to="/poems" className="primary-button">
            Open this volume
          </Link>
        </div>
      </div>
    </section>
  );
}
