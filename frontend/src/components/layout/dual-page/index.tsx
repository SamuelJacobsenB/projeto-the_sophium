import { Footer } from "../footer";
import { Navbar } from "../navbar";
import styles from "./styles.module.css";

interface DualPageProps {
  sideBar: React.ReactNode;
  content: React.ReactNode;
  sideBarClassName?: string;
  contentClassName?: string;
}

export function DualPage({
  sideBar,
  content,
  sideBarClassName,
  contentClassName,
}: DualPageProps) {
  return (
    <>
      <Navbar staticOpen />
      <div className={styles.dualPage}>
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
