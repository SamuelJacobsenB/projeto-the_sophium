import { Title } from "../../../components";

import styles from "./styles.module.css";

export function Courses() {
  return (
    <section className={styles.courseSection} id="courses">
      <Title title="Nossos Cursos" size="2rem" />
      <ul className={styles.courseList}></ul>
    </section>
  );
}
