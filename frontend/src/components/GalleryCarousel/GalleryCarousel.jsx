import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import GalleryLightbox from '../GalleryLightbox/GalleryLightbox.jsx';

const AUTO_SCROLL_INTERVAL_MS = 1100;

export default function GalleryCarousel({ items = [] }) {
  const galleryRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const prefersReducedMotion = useReducedMotion();
  const visibleItems = items.slice(0, 7);

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
    if (isPaused || visibleItems.length < 2 || prefersReducedMotion) return undefined;

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
  }, [isPaused, move, prefersReducedMotion, visibleItems.length]);

  if (!visibleItems.length) return null;

  return (
    <motion.section
      className="home-gallery-section section-block"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.14 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
    >
      <div className="container">
        <div className="home-section-heading">
          <div>
            <p className="eyebrow">Images from the archive</p>
            <h2>Places around the poems.</h2>
          </div>
          <div className="gallery-heading-actions">
            <Link className="text-link" to="/gallery">Open full gallery →</Link>
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
            <motion.button
              type="button"
              className="home-gallery-item"
              key={item._id || `${item.title}-${index}`}
              onClick={() => setSelectedImage(item)}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={prefersReducedMotion ? undefined : { y: -3 }}
              viewport={{ amount: 0.2 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.38, delay: prefersReducedMotion ? 0 : index * 0.045 }}
            >
              <img src={item.image} alt={item.title} loading="lazy" />
              <span>{item.title}</span>
            </motion.button>
          ))}
        </div>
      </div>
      <GalleryLightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
    </motion.section>
  );
}
