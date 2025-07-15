import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { I } from "../../icons";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInfo}>
        <p>
          © {new Date().getFullYear()} The Sophium. Todos os direitos
          reservados.
        </p>
      </div>

      <div className={styles.footerLinks}>
        <Link to="/" className={styles.footerLink}>
          Home
        </Link>
        <a
          href="mailto:thesophium@gmail.com"
          target="_blank"
          className={styles.footerLink}
        >
          Contato
        </a>
        <a
          href="https://www.youtube.com/@TheSophiumOfficial"
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.footerLink} ${styles.footerIconLink}`}
        >
          <I.youtube />
        </a>
      </div>
    </footer>
  );
}
