import { useState } from "react";
import { Link } from "react-router-dom";

import { I } from "../..";

import logo from "../../../assets/pngs/logo.png";

import styles from "./styles.module.css";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={`${styles.navbar} ${isOpen ? styles.actived : ""}`}>
      <div className={styles.buttonArea}>
        <div className={styles.buttonSection}>
          <Link to="/" className={styles.circleButton}>
            <img src={logo} alt="Logo" className={styles.logoImg} />
          </Link>
        </div>
        <div className={styles.buttonSection}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={styles.circleButton}
          >
            <I.menu />
          </button>
        </div>
      </div>

      <div className={styles.menu}>
        {isOpen && (
          <ul className={styles.routeList}>
            <li>
              <Link to={"/"} className={styles.routeLink}>
                Home
              </Link>
            </li>
            <li>
              <Link to={"/#courses"} className={styles.routeLink}>
                Cursos
              </Link>
            </li>
            <li>
              <a
                href="mailto:thesophium@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.routeLink}
              >
                Contato
              </a>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
