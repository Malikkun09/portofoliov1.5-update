import SplitType from 'split-type';
import { useIsomorphicLayoutEffect } from '@src/hooks/useIsomorphicLayoutEffect';

const useSplitAnimation = (ref, styles) => {
  useIsomorphicLayoutEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const splitted = new SplitType(element, {
      types: 'chars',
      tagName: 'span',
      charClass: styles.char,
    });

    splitted.chars?.forEach((char, i) => {
      char.style.setProperty('--i', i);
    });

    return () => {
      splitted.revert();
    };
  }, [styles]);
};

export default useSplitAnimation;
