import React from "react";

import { Footer, Navbar } from "../";

import stateOfLibert from "../../../assets/pngs/statue-of-libert.png";

import styles from "./styles.module.css";

interface FormPageProps {
  children: React.ReactNode;
}

export function FormPage({ children }: FormPageProps) {
  return (
    <>
      <Navbar />
      <main className={styles.formPageMain}>
        <div className={styles.formPageContainer}>{children}</div>
        <img
          src={stateOfLibert}
          alt="The State Of Libert"
          className={styles.stateOfLibert}
        />
      </main>
      <Footer />
    </>
  );
}
