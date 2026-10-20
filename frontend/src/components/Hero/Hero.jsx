import { Link } from 'react-router-dom';

export default function Hero({ query, onSearch }) {
  return (
    <section className="hero-section">
      <div className="container text-only-hero">
        <div className="hero-copy">
          <p className="eyebrow">Poetry Ink !!</p>
          <h1>Poetry, kept close !!</h1>
          <p className="hero-intro">
            Explore poems, collections and illustrated volumes shaped by language, place and memory.
          </p>
          <form className="poem-search" onSubmit={(event) => event.preventDefault()} role="search">
            <label className="sr-only" htmlFor="home-poem-search">Search poems</label>
            <span aria-hidden="true" className="search-symbol">⌕</span>
            <input
              id="home-poem-search"
              type="search"
              value={query}
              onChange={(event) => onSearch(event.target.value)}
              placeholder="Search poems, themes or words"
            />
            {query && (
              <button type="button" className="search-clear" onClick={() => onSearch('')} aria-label="Clear poem search">
                Clear
              </button>
            )}
          </form>
          <div className="hero-browse-links">
            <Link to="/poems" className="hero-action-button hero-action-primary">Browse all poems <span aria-hidden="true">↗</span></Link>
            <Link to="/collections" className="hero-action-button hero-action-secondary">Open the collections <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
