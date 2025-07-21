import styles from "./styles.module.css";

interface CourseCardImageProps {
  src?: string;
  alt?: string;
}

export function CourseCardImage({ src, alt }: CourseCardImageProps) {
  if (!src) return null;
  return <img src={src} alt={alt} className={styles.courseCardImage} />;
}
