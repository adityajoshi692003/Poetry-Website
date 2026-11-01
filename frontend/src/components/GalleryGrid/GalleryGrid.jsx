import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import GalleryLightbox from '../GalleryLightbox/GalleryLightbox.jsx';

const isVideoItem = (item) =>
  item.mediaType?.toLowerCase() === 'video' ||
  ['video', 'videos'].includes(item.category?.toLowerCase()) ||
  Boolean(item.videoUrl || item.thumbnail);

export default function GalleryGrid({ items = [] }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="gallery-section section-block">
      <div className="container">
        <div className="section-heading-row">
          <h2>Gallery</h2>
        </div>

        <div className="gallery-grid">
          {items.map((item, index) => (
            isVideoItem(item) ? (
              <motion.a
                key={item._id || `${item.title}-${index}`}
                className="gallery-item gallery-video-card"
                href={item.videoUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Watch ${item.title}`}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.12 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.42, delay: prefersReducedMotion ? 0 : (index % 4) * 0.05 }}
              >
                <img src={item.image} alt={item.title} loading="lazy" />
                <span className="gallery-play-icon" aria-hidden="true">▶</span>
                <span className="gallery-item-caption"><strong>{item.title}</strong><small>{item.description}</small></span>
              </motion.a>
            ) : (
              <motion.button
                key={item._id || `${item.title}-${index}`}
                type="button"
                className="gallery-item gallery-image-card"
                onClick={() => setSelectedImage(item)}
                aria-label={`Open ${item.title}`}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.12 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.42, delay: prefersReducedMotion ? 0 : (index % 4) * 0.05 }}
              >
                <img src={item.image} alt={item.title} loading="lazy" />
                <span className="gallery-item-caption"><strong>{item.title}</strong><small>{item.description}</small></span>
              </motion.button>
            )
          ))}
        </div>
      </div>

      <GalleryLightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
    </section>
  );
}
