export default function GalleryLightbox({ image, onClose }) {
  if (!image) return null;

  return (
    <div className="lightbox-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="lightbox-panel" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="lightbox-close" onClick={onClose} aria-label="Close image">
          ×
        </button>
        <img src={image.image} alt={image.title} />
        <div className="lightbox-caption">
          <h3>{image.title}</h3>
          <p>{image.description}</p>
          <small>
            {image.location} • {image.year}
          </small>
        </div>
      </div>
    </div>
  );
}
