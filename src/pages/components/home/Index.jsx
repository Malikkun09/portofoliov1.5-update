import FloatingMeshes from '@src/pages/components/home/components/floatingMeshes/Index';
import clsx from 'clsx';
import styles from '@src/pages/components/home/styles/home.module.scss';
import useIsMobile from '@src/hooks/useIsMobile';
import { useRef } from 'react';

function Home() {
  const isMobile = useIsMobile();
  const rootRef = useRef();

  return (
    <section ref={rootRef} className={clsx(styles.root)}>
      <div className={clsx(styles.topContainer, 'layout-grid-inner')}>
        <div className={styles.leftContainer}>
          <h2 className="h2">Remarkable</h2>
          <h2 className={clsx('h2', 'bold')}>Digital Experiences</h2>
        </div>
        {!isMobile && (
          <h6 className={clsx('h6', styles.rightContainer)}>
            I build websites, interfaces, and experiments that turn ideas into something you can actually use. Join me in making the web feel alive.
          </h6>
        )}
      </div>

      <div className={styles.bottomContainer}>
        <FloatingMeshes />
      </div>
      {isMobile && (
        <div className={styles.rightContainerMobile}>
          <h6 className="h6"> I build websites, interfaces, and experiments that turn ideas into something you can actually use. Join me in making the web feel alive.</h6>
        </div>
      )}

      <div className={styles.scrollHint}>
        <span>Scroll down</span>
      </div>
    </section>
  );
}

export default Home;
