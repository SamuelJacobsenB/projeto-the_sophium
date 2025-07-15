import { useState } from "react";
import { Link } from "react-router-dom";

import { I } from "../../";

import logo from "../../../assets/pngs/logo.png";

import styles from "./styles.module.css";
import { navRoutes } from "../../../routes";

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
            {navRoutes.map((route) => (
              <li key={route.path}>
                <Link to={route.path} className={styles.routeLink}>
                  {route.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
}
