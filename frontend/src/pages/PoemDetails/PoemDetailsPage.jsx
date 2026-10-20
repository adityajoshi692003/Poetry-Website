import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../services/api.js';
import Loading from '../../components/Loading/Loading.jsx';
import PoemLikeButton from '../../components/PoemLikeButton/PoemLikeButton.jsx';
import { samplePoems } from '../../data/archive.js';

const normalize = (str) => {
  try {
    return decodeURIComponent(str || '').trim().toLowerCase().replace(/[\s\-_,]+/g, ' ');
  } catch {
    return (str || '').trim().toLowerCase().replace(/[\s\-_,]+/g, ' ');
  }
};

const findLocalPoem = (targetSlug) => {
  if (!targetSlug) return null;
  const norm = normalize(targetSlug);
  return (
    samplePoems.find(
      (entry) =>
        entry.slug === targetSlug ||
        entry.altSlug === targetSlug ||
        normalize(entry.slug) === norm ||
        normalize(entry.altSlug) === norm ||
        normalize(entry.title) === norm
    ) || null
  );
};

export default function PoemDetailsPage() {
  const { slug } = useParams();
  const [poem, setPoem] = useState(null);
  const [loading, setLoading] = useState(true);

  // Kindle / Scribd Reader Preferences
  const [readerTheme, setReaderTheme] = useState(() => {
    try {
      return localStorage.getItem('kindle-reader-theme') || 'sepia';
    } catch {
      return 'sepia';
    }
  });

  const [fontSize, setFontSize] = useState(() => {
    try {
      return localStorage.getItem('kindle-reader-size') || 'medium';
    } catch {
      return 'medium';
    }
  });

  const [align, setAlign] = useState(() => {
    try {
      return localStorage.getItem('kindle-reader-align') || 'center';
    } catch {
      return 'center';
    }
  });

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('kindle-reader-theme', readerTheme);
    } catch {
      /* ignore */
    }
  }, [readerTheme]);

  useEffect(() => {
    try {
      localStorage.setItem('kindle-reader-size', fontSize);
    } catch {
      /* ignore */
    }
  }, [fontSize]);

  useEffect(() => {
    try {
      localStorage.setItem('kindle-reader-align', align);
    } catch {
      /* ignore */
    }
  }, [align]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  useEffect(() => {
    let active = true;
    setLoading(true);

    const fetchPoem = async () => {
      try {
        const { data } = await api.get(`/poems/${slug}`);
        if (active && data?.poem) {
          // If the API poem doesn't have stanzas or full text, prefer local if fuller
          const localMatch = findLocalPoem(slug);
          if (localMatch && localMatch.content.length > (data.poem.content?.length || 0)) {
            setPoem({ ...data.poem, content: localMatch.content });
          } else {
            setPoem(data.poem);
          }
        }
      } catch (err) {
        if (active) {
          const fallback = findLocalPoem(slug);
          setPoem(fallback);
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchPoem();

    return () => {
      active = false;
    };
  }, [slug]);

  // Stanza parsing - faithfully groups stanzas as written with blank lines
  const stanzas = useMemo(() => {
    if (!poem?.content) return [];
    return poem.content
      .split(/\n\s*\n/)
      .map((stanza) => stanza.trim())
      .filter(Boolean);
  }, [poem?.content]);

  // Adjacent poems for page-turning navigation
  const { prevPoem, nextPoem } = useMemo(() => {
    if (!poem) return { prevPoem: null, nextPoem: null };
    const norm = normalize(poem.slug || poem.title);
    const index = samplePoems.findIndex(
      (p) => normalize(p.slug) === norm || normalize(p.altSlug) === norm || normalize(p.title) === norm
    );
    if (index === -1) return { prevPoem: null, nextPoem: null };

    return {
      prevPoem: index > 0 ? samplePoems[index - 1] : null,
      nextPoem: index < samplePoems.length - 1 ? samplePoems[index + 1] : null
    };
  }, [poem]);

  const wordCount = useMemo(() => {
    if (!poem?.content) return 0;
    return poem.content.trim().split(/\s+/).length;
  }, [poem?.content]);

  const readingMinutes = Math.max(1, Math.ceil(wordCount / 110));

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const cycleFontSize = (direction) => {
    const sizes = ['small', 'medium', 'large', 'xlarge'];
    const currentIdx = sizes.indexOf(fontSize);
    if (direction === 'increase' && currentIdx < sizes.length - 1) {
      setFontSize(sizes[currentIdx + 1]);
    } else if (direction === 'decrease' && currentIdx > 0) {
      setFontSize(sizes[currentIdx - 1]);
    }
  };

  if (loading) return <Loading message="Opening the reading room..." />;

  if (!poem) {
    return (
      <div className="container empty-panel" style={{ textAlign: 'center', padding: '5rem 1rem' }}>
        <h2>Poem Not Found</h2>
        <p style={{ margin: '1rem 0 2rem', color: 'var(--muted)' }}>
          This poem could not be located in the archive index.
        </p>
        <Link to="/poems" className="hero-action-button hero-action-primary">
          Browse All Poems →
        </Link>
      </div>
    );
  }

  const isHindi = poem.language?.toLowerCase() === 'hindi' || /[\u0900-\u097F]/.test(poem.title || '');

  return (
    <div className={`kindle-reader-wrapper theme-${readerTheme}`}>
      {/* Top Kindle/Scribd Breadcrumb & Status Bar */}
      <div className="kindle-top-bar container">
        <div className="kindle-breadcrumbs">
          <Link to="/poems" className="kindle-nav-link">
            ← All Poems
          </Link>
          {poem.collection?.title && (
            <>
              <span className="kindle-sep">/</span>
              <Link to={`/collections/${poem.collection?.slug || ''}`} className="kindle-nav-link">
                {poem.collection.title}
              </Link>
            </>
          )}
        </div>

        {/* Reader Controls Toolbar (Kindle / Scribd Style) */}
        <div className="kindle-controls" role="toolbar" aria-label="Kindle Reader Settings">
          {/* Font Size Adjusters */}
          <div className="kindle-control-group" title="Adjust text size">
            <button
              type="button"
              className="kindle-btn"
              onClick={() => cycleFontSize('decrease')}
              disabled={fontSize === 'small'}
              aria-label="Decrease font size"
            >
              A<span style={{ fontSize: '0.7em' }}>-</span>
            </button>
            <span className="kindle-control-label">{fontSize.toUpperCase()[0]}</span>
            <button
              type="button"
              className="kindle-btn"
              onClick={() => cycleFontSize('increase')}
              disabled={fontSize === 'xlarge'}
              aria-label="Increase font size"
            >
              A<span style={{ fontSize: '1.2em' }}>+</span>
            </button>
          </div>

          {/* Paper Theme Modes: Sepia / White / Dark */}
          <div className="kindle-control-group kindle-theme-selector" title="Reading paper tone">
            <button
              type="button"
              className={`kindle-theme-btn theme-btn-sepia ${readerTheme === 'sepia' ? 'active' : ''}`}
              onClick={() => setReaderTheme('sepia')}
              aria-label="Sepia parchment paper"
              title="Sepia Parchment"
            >
              <span>Sepia</span>
            </button>
            <button
              type="button"
              className={`kindle-theme-btn theme-btn-white ${readerTheme === 'white' ? 'active' : ''}`}
              onClick={() => setReaderTheme('white')}
              aria-label="Clean book white paper"
              title="Clean Book White"
            >
              <span>White</span>
            </button>
            <button
              type="button"
              className={`kindle-theme-btn theme-btn-dark ${readerTheme === 'dark' ? 'active' : ''}`}
              onClick={() => setReaderTheme('dark')}
              aria-label="Midnight dark mode"
              title="Midnight Dark"
            >
              <span>Dark</span>
            </button>
          </div>

          {/* Text Alignment */}
          <div className="kindle-control-group" title="Poem text alignment">
            <button
              type="button"
              className={`kindle-btn ${align === 'center' ? 'active' : ''}`}
              onClick={() => setAlign('center')}
              aria-label="Center align poem"
              title="Lyrical Center Alignment"
            >
              ≡
            </button>
            <button
              type="button"
              className={`kindle-btn ${align === 'left' ? 'active' : ''}`}
              onClick={() => setAlign('left')}
              aria-label="Left align poem"
              title="Book Left Alignment"
            >
              ⫷
            </button>
          </div>

          {/* Share Action */}
          <button
            type="button"
            className="kindle-btn kindle-share-btn"
            onClick={handleShare}
            aria-label="Share poem link"
            title="Copy reading link"
          >
            {copied ? '✓ Copied' : '⎘ Share'}
          </button>
        </div>
      </div>

      {/* Main Kindle / Scribd Book Page Container */}
      <article className="container kindle-page-container">
        <div className={`kindle-book-page size-${fontSize} align-${align} ${isHindi ? 'is-hindi' : ''}`}>
          {/* Book Page Header */}
          <header className="kindle-header">
            <div className="kindle-pill-row">
              <span className="kindle-tag-pill">{poem.language || 'Hindi'}</span>
              {poem.collection?.title && (
                <Link to={`/collections/${poem.collection.slug || ''}`} className="kindle-tag-pill collection-pill">
                  {poem.collection.title}
                </Link>
              )}
              {poem.year && <span className="kindle-tag-pill year-pill">{poem.year}</span>}
            </div>

            <h1 className="kindle-poem-title">{poem.title}</h1>

            <div className="kindle-meta-line">
              <span className="kindle-meta-item">
                <span className="kindle-meta-icon">✍</span> Sunil Joshi
              </span>
              <span className="kindle-meta-dot">·</span>
              <span className="kindle-meta-item">
                <span className="kindle-meta-icon">⏱</span> {readingMinutes} min read
              </span>
              <span className="kindle-meta-dot">·</span>
              <span className="kindle-meta-item">
                <span className="kindle-meta-icon">❦</span> {stanzas.length} stanzas
              </span>
            </div>

            {poem.excerpt && poem.excerpt !== poem.content && (
              <blockquote className="kindle-epigraph">
                "{poem.excerpt.replace(/\n+/g, ' ')}"
              </blockquote>
            )}

            <div className="kindle-header-divider" aria-hidden="true" />
          </header>

          {/* Poem Body — Faithful Stanza Structure */}
          <div className="kindle-poem-body">
            {stanzas.map((stanzaText, sIndex) => (
              <div className="kindle-stanza" key={`stanza-${sIndex}`}>
                {stanzaText.split('\n').map((line, lIndex) => {
                  const trimmed = line.trim();
                  return (
                    <div className="kindle-line" key={`line-${sIndex}-${lIndex}`}>
                      {trimmed ? line : '\u00A0'}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Kindle End Flourish */}
          <div className="kindle-end-flourish" aria-hidden="true">
            <span className="flourish-mark">❧</span>
            <span className="flourish-mark center-mark">❖</span>
            <span className="flourish-mark">☙</span>
          </div>

          {/* Reading Actions & Like Bar */}
          <footer className="kindle-footer-actions">
            <div className="kindle-like-wrapper">
              <PoemLikeButton slug={poem.slug || slug} />
              <span className="kindle-like-hint">Appreciate this piece</span>
            </div>

            <div className="kindle-page-meta">
              <small>Poetry Ink Editions · Archive Volume {poem.year || '2026'}</small>
            </div>
          </footer>
        </div>

        {/* Page Turner Navigation — Turn to Prev / Next Poem */}
        <nav className="kindle-page-turner" aria-label="Book page navigation">
          {prevPoem ? (
            <Link to={`/poems/${prevPoem.slug}`} className="page-turn-card prev-card">
              <span className="turn-label">← Previous Poem</span>
              <strong className="turn-title">{prevPoem.title}</strong>
              <small className="turn-collection">{prevPoem.collection?.title || 'Archive'}</small>
            </Link>
          ) : (
            <div className="page-turn-placeholder" />
          )}

          {nextPoem ? (
            <Link to={`/poems/${nextPoem.slug}`} className="page-turn-card next-card">
              <span className="turn-label">Next Poem →</span>
              <strong className="turn-title">{nextPoem.title}</strong>
              <small className="turn-collection">{nextPoem.collection?.title || 'Archive'}</small>
            </Link>
          ) : (
            <div className="page-turn-placeholder" />
          )}
        </nav>

        {/* Volume Companion Card */}
        {poem.collection && (
          <aside className="kindle-volume-companion">
            <div className="volume-companion-copy">
              <p className="eyebrow">Explore this Rasa</p>
              <h3>Volume: {poem.collection.title}</h3>
              <p>
                Browse all works composed in harmony with the poetic sentiment of {poem.collection.title}.
              </p>
            </div>
            <Link to={`/collections/${poem.collection.slug || ''}`} className="hero-action-button hero-action-secondary">
              Open Complete Collection →
            </Link>
          </aside>
        )}
      </article>
    </div>
  );
}
