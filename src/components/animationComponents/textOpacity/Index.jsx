import SplitType from 'split-type';
import gsap from 'gsap';
import styles from '@src/components/animationComponents/textOpacity/textOpacity.module.scss';
import { useIsomorphicLayoutEffect } from '@src/hooks/useIsomorphicLayoutEffect';
import { useRef } from 'react';

function TextOpacity({ children, trigger }) {
  const containerRef = useRef();

  useIsomorphicLayoutEffect(() => {
    const element = containerRef.current;
    if (!element || !trigger) return undefined;

    const splitted = new SplitType(element, { types: 'words' });

    const tween = gsap.fromTo(
      splitted.words,
      { opacity: 0.28, yPercent: 8 },
      {
        opacity: 1,
        yPercent: 0,
        ease: 'none',
        scrollTrigger: {
          trigger,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          scroller: document?.querySelector('main'),
          invalidateOnRefresh: true,
        },
        stagger: 0.03,
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      splitted.revert();
    };
  }, [trigger]);

  return (
    <div ref={containerRef} className={styles.title}>
      {children}
    </div>
  );
}

export default TextOpacity;
