import { Link } from "react-router-dom";

import { Footer, Navbar } from "../../components";

import stateOfLibert from "../../assets/pngs/statue-of-libert.png";

import styles from "./styles.module.css";

function App() {
  return (
    <>
      <Navbar />
      <main className={styles.mainContent}>
        <div className={styles.mainText}>
          <h1 className={styles.mainTitle}>
            The <br /> Sophium
          </h1>
          <p className={styles.mainSlogan}>Plataforma de aprendizagem</p>
        </div>
        <div className={styles.mainButtons}>
          <Link to="/register" className={`btn btn-primary ${styles.mainLink}`}>
            Registrar
          </Link>
          <small className={styles.mainOr}>ou</small>
          <Link to="/login" className={`btn btn-primary ${styles.mainLink}`}>
            Entrar
          </Link>
        </div>
        <img
          src={stateOfLibert}
          alt="The State of Libert"
          className={styles.stateOfLibert}
        />
      </main>
      <Footer />
    </>
  );
}

export { App };
