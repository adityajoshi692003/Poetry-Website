import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const nextIndex = (current, length) => (current + 1) % length;
const prevIndex = (current, length) => (current - 1 + length) % length;

export default function VideoCarousel({ videos = [] }) {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (videos.length <= 1 || prefersReducedMotion) return;

    const timer = setInterval(() => {
      setIndex((current) => nextIndex(current, videos.length));
    }, 6500);

    return () => clearInterval(timer);
  }, [videos, prefersReducedMotion]);

  if (!videos.length) return null;

  const currentVideo = videos[index];

  return (
    <motion.section
      className="section-block home-video-section"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.14 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
    >
      <div className="container">
        <div className="section-heading-row">
          <h2>From the Poet's World</h2>
        </div>

        <div className="video-carousel">
          <button className="carousel-arrow" onClick={() => setIndex(prevIndex(index, videos.length))} aria-label="Previous video">
            ←
          </button>

          <AnimatePresence mode="wait" initial={false}>
            <motion.article
              className="video-card"
              key={currentVideo._id || currentVideo.videoUrl || currentVideo.title}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.28 }}
            >
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
            </motion.article>
          </AnimatePresence>

          <button className="carousel-arrow" onClick={() => setIndex(nextIndex(index, videos.length))} aria-label="Next video">
            →
          </button>
        </div>
      </div>
    </motion.section>
  );
}
