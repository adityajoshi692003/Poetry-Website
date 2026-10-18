import { useEffect, useState } from 'react';

const nextIndex = (current, length) => (current + 1) % length;
const prevIndex = (current, length) => (current - 1 + length) % length;

export default function VideoCarousel({ videos = [] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (videos.length <= 1) return;

    const timer = setInterval(() => {
      setIndex((current) => nextIndex(current, videos.length));
    }, 6500);

    return () => clearInterval(timer);
  }, [videos]);

  if (!videos.length) return null;

  const currentVideo = videos[index];

  return (
    <section className="section-block">
      <div className="container">
        <div className="section-heading-row">
          <h2>From the Poet's World</h2>
        </div>

        <div className="video-carousel">
          <button className="carousel-arrow" onClick={() => setIndex(prevIndex(index, videos.length))} aria-label="Previous video">
            ←
          </button>

          <article className="video-card">
            <div className="video-thumb" style={{ backgroundImage: `url(${currentVideo.thumbnail})` }}>
              <button
                type="button"
                className="play-button"
                onClick={() => window.open(currentVideo.videoUrl, '_blank', 'noopener,noreferrer')}
                aria-label={`Play ${currentVideo.title}`}
              >
                ▶
              </button>
            </div>
            <div className="video-copy">
              <h3>{currentVideo.title}</h3>
              <p>{currentVideo.description}</p>
            </div>
          </article>

          <button className="carousel-arrow" onClick={() => setIndex(nextIndex(index, videos.length))} aria-label="Next video">
            →
          </button>
        </div>
      </div>
    </section>
  );
}
