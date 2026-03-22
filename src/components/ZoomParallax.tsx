'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

export type ZoomImage = {
  alt?: string;
  bg: string;
  icon?: string;
};

interface ZoomParallaxProps {
  images: ZoomImage[];
  sectionBg?: string;
}

// position: relative offsets from the flex-centered position
// Each slot: top/left = offset of the div's center from screen center (position: relative).
// Gap between img 0 (±12.5vw, ±12.5vh) and neighbours is kept ≥ 3vw / 3vh.
const slots: { height: string; width: string; top?: string; left?: string }[] = [
  { height: '25vh', width: '25vw' },                                           // 0 — center      ±12.5vw  ±12.5vh
  { height: '30vh', width: '35vw', top: '-30vh', left:  '5vw'  },             // 1 — top          bottom=-15vh  → gap 3vh above img0
  { height: '45vh', width: '20vw', top:  '-9vh', left: '-28vw' },             // 2 — left         right=-18vw   → gap 5.5vw left of img0
  { height: '25vh', width: '25vw',               left:  '29vw' },             // 3 — right        left=16.5vw   → gap 4vw right of img0
  { height: '25vh', width: '20vw', top:  '29vh', left:  '5vw'  },             // 4 — bot-center   top=16.5vh    → gap 4vh below img0
  { height: '25vh', width: '30vw', top:  '29vh', left: '-24vw' },             // 5 — bot-left     top=16.5vh, right=-9vw → 3.5vw left of img0
  { height: '15vh', width: '15vw', top:  '22vh', left:  '27vw' },             // 6 — bot-right    top=14.5vh, left=19.5vw → 7vw right of img0
];

export function ZoomParallax({ images, sectionBg = '#EDE8DF' }: ZoomParallaxProps) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);
  const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

  return (
    <div ref={container} style={{ position: 'relative', height: '300vh' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: sectionBg }}>
        {images.map((img, i) => {
          const slot = slots[i % slots.length];
          return (
            <motion.div
              key={i}
              style={{
                scale: scales[i % scales.length],
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* position: relative so top/left offset from flex center */}
              <div style={{
                position: 'relative',
                height: slot.height,
                width: slot.width,
                top: slot.top,
                left: slot.left,
                overflow: 'hidden',
                flexShrink: 0,
              }}>
                <div style={{
                  width: '100%',
                  height: '100%',
                  background: img.bg,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                }}>
                  {img.icon && (
                    <span style={{ fontSize: '2rem', opacity: 0.45 }}>{img.icon}</span>
                  )}
                  <span style={{
                    fontSize: '9px',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    fontFamily: 'DM Sans, sans-serif',
                    color: img.bg.includes('2A2420') ? 'rgba(255,255,255,0.25)' : 'rgba(26,22,20,0.2)',
                  }}>
                    Foto folgt
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
