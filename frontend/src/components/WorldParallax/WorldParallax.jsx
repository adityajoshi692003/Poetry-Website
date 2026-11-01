import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useLocation } from 'react-router-dom';

function ParallaxLayer({ className, initialX, initialRotateY = 0, style, transitionDuration }) {
  return (
    <motion.div
      className={`parallax-layer ${className}`}
      initial={{ x: initialX, rotateY: initialRotateY }}
      animate={{ x: 0, rotateY: 0 }}
      transition={{ duration: transitionDuration, ease: [0.22, 1, 0.36, 1] }}
      style={style}
    />
  );
}

export default function WorldParallax({ introActive = false }) {
  const prefersReducedMotion = useReducedMotion();
  const { pathname } = useLocation();
  const { scrollY } = useScroll();
  const backgroundOffset = (distance) => {
    const offset = useTransform(scrollY, [0, 1800], [0, distance]);
    return useSpring(offset, { stiffness: 32, damping: 25 });
  };
  const atmosphereY = backgroundOffset(-22);
  const architectureY = backgroundOffset(-64);
  const artworkY = backgroundOffset(-122);
  const midgroundY = backgroundOffset(-184);
  const foregroundY = backgroundOffset(-252);
  const world = pathname.split('/')[1] || 'home';
  const worldName = ['poems', 'collections', 'about', 'gallery', 'contact'].includes(world) ? world : 'home';
  const introDuration = introActive && !prefersReducedMotion ? 2.35 : 0;

  return (
    <div className={`world-parallax world-parallax-${worldName}`} aria-hidden="true">
      <ParallaxLayer
        className="parallax-atmosphere"
        initialX={22}
        initialRotateY={-2}
        transitionDuration={introDuration}
        style={{ y: prefersReducedMotion ? 0 : atmosphereY, z: -520, scale: 1.24 }}
      />
      <ParallaxLayer
        className="parallax-architecture"
        initialX={-32}
        initialRotateY={2}
        transitionDuration={introDuration}
        style={{ y: prefersReducedMotion ? 0 : architectureY, z: -360, scale: 1.18 }}
      />
      <ParallaxLayer
        className="parallax-midground"
        initialX={40}
        initialRotateY={-2.5}
        transitionDuration={introDuration}
        style={{ y: prefersReducedMotion ? 0 : midgroundY, z: -100, scale: 1.05 }}
      />
      <ParallaxLayer
        className="parallax-foreground"
        initialX={-48}
        initialRotateY={3}
        transitionDuration={introDuration}
        style={{ y: prefersReducedMotion ? 0 : foregroundY, z: 30, scale: 0.98 }}
      />
    </div>
  );
}
