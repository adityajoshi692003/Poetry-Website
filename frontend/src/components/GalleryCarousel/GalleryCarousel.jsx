import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import GalleryLightbox from '../GalleryLightbox/GalleryLightbox.jsx';

const AUTO_SCROLL_INTERVAL_MS = 1100;

export default function GalleryCarousel({ items = [] }) {
  const galleryRef = useRef(null);
  const [canScrollBack, setCanScrollBack] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const visibleItems = items.slice(0, 7);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return undefined;

    const updateScrollButtons = () => {
      setCanScrollBack(gallery.scrollLeft > 1);
      setCanScrollForward(gallery.scrollLeft + gallery.clientWidth < gallery.scrollWidth - 1);
    };

    updateScrollButtons();
    gallery.addEventListener('scroll', updateScrollButtons, { passive: true });
    window.addEventListener('resize', updateScrollButtons);

    return () => {
      gallery.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, [visibleItems.length]);

  const move = useCallback((direction) => {
    const gallery = galleryRef.current;
    const firstItem = gallery?.querySelector('.home-gallery-item');
    if (!gallery || !firstItem) return;

    const gap = Number.parseFloat(getComputedStyle(gallery).columnGap) || 0;
    gallery.scrollBy({
      left: direction * (firstItem.getBoundingClientRect().width + gap),
      behavior: 'smooth'
    });
  }, []);

  useEffect(() => {
    if (isPaused || visibleItems.length < 2) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const timer = window.setInterval(() => {
      const gallery = galleryRef.current;
      if (!gallery) return;

      const isAtEnd = gallery.scrollLeft + gallery.clientWidth >= gallery.scrollWidth - 10;
      if (isAtEnd) {
        gallery.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        move(1);
      }
    }, AUTO_SCROLL_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [isPaused, move, visibleItems.length]);

  if (!visibleItems.length) return null;

  return (
    <section className="home-gallery-section section-block">
      <div className="container">
        <div className="home-section-heading">
          <div>
            <p className="eyebrow">Images from the archive</p>
            <h2>Places around the poems.</h2>
          </div>
          <div className="gallery-heading-actions">
            <Link className="text-link" to="/gallery">Open full gallery →</Link>
            <div className="carousel-controls">
              <button type="button" onClick={() => move(-1)} aria-label="Previous gallery image" disabled={!canScrollBack}>←</button>
              <button type="button" onClick={() => move(1)} aria-label="Next gallery image" disabled={!canScrollForward}>→</button>
            </div>
          </div>
        </div>

        <div
          className="home-gallery-grid"
          ref={galleryRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false);
          }}
        >
          {visibleItems.map((item, index) => (
            <button type="button" className="home-gallery-item" key={item._id || `${item.title}-${index}`} onClick={() => setSelectedImage(item)}>
              <img src={item.image} alt={item.title} loading="lazy" />
              <span>{item.title}</span>
            </button>
          ))}
        </div>
      </div>
      <GalleryLightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
    </section>
  );
}
