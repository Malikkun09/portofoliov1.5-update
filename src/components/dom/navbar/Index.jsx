import ButtonLink from '@src/components/animationComponents/buttonLink/Index';
import Link from 'next/link';
import MenuButton from '@src/components/dom/navbar/components/MenuButton';
import MenuLinks from '@src/components/dom/navbar/components/MenuLinks';
import clsx from 'clsx';
import profile from '@src/constants/profile';
import styles from '@src/components/dom/navbar/styles/index.module.scss';
import { useCallback } from 'react';
import useIsMobile from '@src/hooks/useIsMobile';
import { useRouter } from 'next/router';
import { useShallow } from 'zustand/react/shallow';
import { useStore } from '@src/store';

function Navbar() {
  const isMobile = useIsMobile();
  const router = useRouter();
  const [lenis] = useStore(useShallow((state) => [state.lenis]));

  const scrollToPosition = useCallback(
    (position, duration = 1.5) => {
      if (lenis) {
        lenis.scrollTo(position, {
          duration,
          force: true,
          easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
          onComplete: () => {
            lenis.start();
          },
        });
      }
    },
    [lenis],
  );

  const goToTop = useCallback(() => {
    if (router.pathname === '/') {
      scrollToPosition(0);
    }
  }, [router.pathname, scrollToPosition]);

  return (
    <>
      <MenuLinks />

      <header className={styles.root} role="banner">
        <div className={styles.innerHeader}>
          <Link onClick={goToTop} aria-label="Go home" scroll={false} href="/">
            <h4 className={clsx('bold', 'h4')}>{profile.brand}</h4>
          </Link>

          <nav className={styles.pageNav} aria-label="Pages">
            <Link scroll={false} href="/" className={router.pathname === '/' ? styles.active : undefined}>
              Home
            </Link>
            <Link scroll={false} href="/about" className={router.pathname === '/about' ? styles.active : undefined}>
              About
            </Link>
            <Link scroll={false} href="/projects" className={router.pathname.startsWith('/projects') ? styles.active : undefined}>
              Projects
            </Link>
          </nav>

          <div className={styles.rightContainer}>
            {!isMobile && <ButtonLink href={profile.contactHref} label="GET IN TOUCH" target />}
            <MenuButton />
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
