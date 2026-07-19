import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './ScrollReveal.css';

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  rotationEnd = 'bottom bottom',
  wordAnimationEnd = 'bottom bottom'
}) => {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;
    const wordElements = el.querySelectorAll('.word');

    // Force refresh ScrollTrigger layouts
    ScrollTrigger.refresh();

    // Create viewport enter timeline for smooth page load/scroll trigger playing
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        scroller,
        start: 'top 85%', // starts when the top of the element hits 85% of the viewport height
        toggleActions: 'play none none none',
        once: true
      }
    });

    // 1. Container rotation
    tl.fromTo(
      el,
      { transformOrigin: '0% 50%', rotate: baseRotation },
      {
        rotate: 0,
        duration: 0.85,
        ease: 'power2.out'
      },
      0
    );

    // 2. Word opacity stagger
    tl.fromTo(
      wordElements,
      { opacity: baseOpacity },
      {
        opacity: 1,
        stagger: 0.05,
        duration: 0.85,
        ease: 'power2.out',
        willChange: 'opacity, filter'
      },
      0
    );

    // 3. Word blur stagger
    if (enableBlur) {
      tl.fromTo(
        wordElements,
        { filter: `blur(${blurStrength}px)` },
        {
          filter: 'blur(0px)',
          stagger: 0.05,
          duration: 0.85,
          ease: 'power2.out'
        },
        0
      );
    }

    // Delayed refresh to handle initial component mount layout shifts
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(refreshTimer);
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, blurStrength]);

  return (
    <h2 ref={containerRef} className={`scroll-reveal ${containerClassName}`}>
      <p className={`scroll-reveal-text ${textClassName}`}>{splitText}</p>
    </h2>
  );
};

export default ScrollReveal;
