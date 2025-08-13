import { Navbar, Footer } from "../";

import styles from "./styles.module.css";

interface DualPageProps {
  className?: string;
  sideBar: React.ReactNode;
  content: React.ReactNode;
  sideBarClassName?: string;
  contentClassName?: string;
}

export function DualPage({
  className,
  sideBar,
  content,
  sideBarClassName,
  contentClassName,
}: DualPageProps) {
  return (
    <>
      <Navbar staticOpen />
      <div className={`${styles.dualPage} ${className}`}>
        <div className={`${styles.sideBar} ${sideBarClassName}`}>{sideBar}</div>
        <div className={styles.contentContainer}>
          <div className={`${styles.content} ${contentClassName}`}>
            {content}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
