import { useState } from 'react';
import GalleryLightbox from '../GalleryLightbox/GalleryLightbox.jsx';

const categories = ['ALL', 'IMAGES', 'VIDEOS'];
const isVideoItem = (item) =>
  item.mediaType?.toLowerCase() === 'video' ||
  ['video', 'videos'].includes(item.category?.toLowerCase()) ||
  Boolean(item.videoUrl || item.thumbnail);

export default function GalleryGrid({ items = [] }) {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedImage, setSelectedImage] = useState(null);

  const visibleItems =
    selectedCategory === 'ALL'
      ? items
      : items.filter((item) => selectedCategory === 'VIDEOS' ? isVideoItem(item) : !isVideoItem(item));

  return (
    <section className="gallery-section section-block">
      <div className="container">
        <div className="section-heading-row">
          <h2>Gallery</h2>
        </div>

        <div className="gallery-filters" aria-label="Gallery category filter">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={selectedCategory === category ? 'filter-chip active' : 'filter-chip'}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="gallery-grid">
          {visibleItems.map((item) => (
            isVideoItem(item) ? (
              <a key={item._id || item.title} className="gallery-item gallery-video-card" href={item.videoUrl} target="_blank" rel="noreferrer" aria-label={`Watch ${item.title}`}>
                <img src={item.image} alt={item.title} loading="lazy" />
                <span className="gallery-play-icon" aria-hidden="true">▶</span>
                <span className="gallery-item-caption"><strong>{item.title}</strong><small>{item.description}</small></span>
              </a>
            ) : (
              <button
                key={item._id || item.title}
                type="button"
                className="gallery-item gallery-image-card"
                onClick={() => setSelectedImage(item)}
                aria-label={`Open ${item.title}`}
              >
                <img src={item.image} alt={item.title} loading="lazy" />
                <span className="gallery-item-caption"><strong>{item.title}</strong><small>{item.description}</small></span>
              </button>
            )
          ))}
        </div>
      </div>

      <GalleryLightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
    </section>
  );
}
