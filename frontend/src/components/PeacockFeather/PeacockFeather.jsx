import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useLocation } from 'react-router-dom';

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
          <svg className="peacock-feather-art" viewBox="0 0 120 300" fill="none">
        <defs>
          <linearGradient id="feather-vane" x1="30" y1="66" x2="95" y2="222" gradientUnits="userSpaceOnUse">
            <stop stopColor="#278b83" />
            <stop offset=".48" stopColor="#145c59" />
            <stop offset="1" stopColor="#173d42" />
          </linearGradient>
          <linearGradient id="feather-shaft" x1="60" y1="46" x2="60" y2="286" gradientUnits="userSpaceOnUse">
            <stop stopColor="#e7c98a" />
            <stop offset=".5" stopColor="#a77c44" />
            <stop offset="1" stopColor="#614b31" />
          </linearGradient>
          <radialGradient id="feather-eye" cx="0" cy="0" r="1" gradientTransform="matrix(1 54 -31 0 61 79)" gradientUnits="userSpaceOnUse">
            <stop stopColor="#51b8ac" />
            <stop offset=".55" stopColor="#176c72" />
            <stop offset=".78" stopColor="#183e58" />
            <stop offset="1" stopColor="#b58a4d" />
          </radialGradient>
        </defs>
        <path
          d="M59 286C49 247 28 216 23 173 16 117 35 62 60 20c25 42 46 97 38 153-6 43-27 74-39 113Z"
          fill="url(#feather-vane)"
          fillOpacity=".87"
          stroke="#c3a56d"
          strokeOpacity=".64"
          strokeWidth="1.2"
        />
        <g stroke="#c7d7b6" strokeOpacity=".4" strokeWidth="1">
          <path d="M59 276C47 226 35 185 29 137" />
          <path d="M60 260C72 216 85 176 93 136" />
          <path d="M57 241C43 207 34 174 28 151" />
          <path d="M63 241C77 207 86 175 92 151" />
          <path d="M55 221C42 197 34 179 28 164" />
          <path d="M65 221C78 197 86 179 92 164" />
          <path d="M54 199C42 181 35 166 30 149" />
          <path d="M66 199C78 181 85 166 90 149" />
        </g>
        <ellipse cx="60" cy="101" rx="25" ry="43" fill="#c19b5d" fillOpacity=".72" transform="rotate(5 60 101)" />
        <ellipse cx="60" cy="100" rx="20" ry="36" fill="#133f50" transform="rotate(5 60 100)" />
        <ellipse cx="60" cy="99" rx="14" ry="27" fill="url(#feather-eye)" transform="rotate(5 60 99)" />
        <path d="M60 77c7 9 10 16 9 24-1 9-5 16-9 22-4-7-8-14-9-22-1-8 2-16 9-24Z" fill="#173d4e" />
        <path d="M60 83c4 7 6 13 5 19-.6 5-2.8 10-5 14-2.4-4.5-4.5-9-5-14-.8-6 1-12 5-19Z" fill="#38958b" fillOpacity=".86" />
        <path d="M60 49c2 67 1 152 0 236" stroke="url(#feather-shaft)" strokeWidth="2.1" strokeLinecap="round" />
        <path d="M59 63c-12 7-20 17-24 29m26-28c12 7 20 17 24 29M59 123c-10 10-17 21-21 34m22-34c10 10 17 21 21 34" stroke="#d7c18e" strokeOpacity=".48" strokeWidth=".8" />
          </svg>
        </div>
      </motion.div>
    </motion.div>
  );
}
