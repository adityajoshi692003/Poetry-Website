import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import featherImage from '../../assets/icons/Peacock Feather Transparent.png';

const worldPositions = {
  home: { x: 0, y: 0, rotate: -8 },
  collections: { x: -26, y: 18, rotate: 8 },
  poems: { x: -14, y: -24, rotate: -2 },
  about: { x: 24, y: 14, rotate: 12 },
  gallery: { x: 28, y: -16, rotate: 4 },
  contact: { x: -8, y: 28, rotate: -12 }
};

function getWorld(pathname) {
  const segment = pathname.split('/')[1];
  return worldPositions[segment] ? segment : 'home';
}

export default function PeacockFeather({ introActive = false }) {
  const { pathname } = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scrollOffset = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const scrollDrift = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [0, 18, -14, 12]);
  const scrollScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.88, 0.96]);
  const scrollDepth = useTransform(scrollYProgress, [0, 0.45, 1], [0, 70, -24]);
  const smoothScrollOffset = useSpring(scrollOffset, { stiffness: 38, damping: 22 });
  const smoothScrollDrift = useSpring(scrollDrift, { stiffness: 34, damping: 22 });
  const smoothScrollScale = useSpring(scrollScale, { stiffness: 34, damping: 22 });
  const smoothScrollDepth = useSpring(scrollDepth, { stiffness: 34, damping: 22 });

  return (
    <motion.div
      className={`peacock-feather-guide world-feather-${getWorld(pathname)}${introActive ? ' is-intro' : ''}`}
      aria-hidden="true"
      initial={introActive ? { x: '-120vw', rotate: -35, scale: 0.72 } : false}
      animate={introActive
        ? { x: ['-120vw', '-24vw', '0vw'], rotate: [-35, 7, 18], scale: [0.72, 1.06, 0.94] }
        : {
            x: worldPositions[getWorld(pathname)].x,
            rotate: worldPositions[getWorld(pathname)].rotate
          }}
      style={{ perspective: 900 }}
      transition={prefersReducedMotion
        ? { duration: 0 }
        : introActive
          ? {
              x: { duration: 2.25, times: [0, 0.62, 1], ease: 'easeInOut' },
              rotate: { duration: 2.25, times: [0, 0.62, 1], ease: 'easeInOut' },
              scale: { duration: 2.25, times: [0, 0.62, 1], ease: 'easeInOut' }
            }
          : { type: 'spring', stiffness: 58, damping: 18, mass: 0.8 }}
    >
      <motion.div
        className="peacock-feather-scroll"
        style={{
          y: prefersReducedMotion ? 0 : smoothScrollOffset,
          x: prefersReducedMotion ? 0 : smoothScrollDrift,
          scale: prefersReducedMotion ? 1 : smoothScrollScale,
          z: prefersReducedMotion ? 0 : smoothScrollDepth
        }}
      >
        <div className="peacock-feather-idle">
          <img className="peacock-feather-art" src={featherImage} alt="" draggable="false" />
        </div>
      </motion.div>
    </motion.div>
  );
}
