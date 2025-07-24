import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useUser } from "../../../contexts";
import { Button, I } from "../..";

import logo from "../../../assets/pngs/logo.png";

import styles from "./styles.module.css";
import { useLogout } from "../../../hooks";

interface NavbarProps {
  staticOpen?: boolean;
}

export function Navbar({ staticOpen = false }: NavbarProps) {
  const { user, setUser } = useUser();

  const { logout } = useLogout();

  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    if (!staticOpen) return;

    setIsOpen(true);
    sessionStorage.setItem("nav_open_status", "true");
  }, [staticOpen]);

  useEffect(() => {
    const status = sessionStorage.getItem("nav_open_status");
    setIsOpen(status === "true");
  }, []);

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
            onClick={() => {
              if (staticOpen) return;
              sessionStorage.setItem("nav_open_status", `${!isOpen}`);
              setIsOpen(!isOpen);
            }}
            className={styles.circleButton}
          >
            <I.menu />
          </button>
        </div>
      </div>

      <div className={styles.menu}>
        {isOpen && (
          <>
            <ul className={styles.routeList}>
              <li>
                <Link to={"/"} className={styles.routeLink}>
                  Home
                </Link>
              </li>
              <li>
                <Link to={"/courses"} className={styles.routeLink}>
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
            {user && (
              <div className={styles.userProfile}>
                {user.avatarID ? (
                  <img
                    src={user.avatar?.path}
                    alt="Avatar"
                    className={styles.avatarImg}
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  />
                ) : (
                  <I.user_profile
                    className={styles.avatarIcon}
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  />
                )}
                {isUserMenuOpen && (
                  <div className={styles.userProfileMenu}>
                    <Link to="/profile" className={styles.userProfileLink}>
                      <I.user_profile className={styles.userProfileItemIcon} />{" "}
                      Perfil
                    </Link>
                    <Button
                      className={styles.logoutButton}
                      onClick={async () => {
                        await logout();
                        setUser(null);
                      }}
                    >
                      <I.logout className={styles.userProfileItemIcon} /> Sair
                    </Button>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </nav>
  );
}
