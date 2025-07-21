import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../../contexts";
import { useCourses, useDeleteCourse } from "../../hooks";
import {
  ConfirmModal,
  CourseCard,
  Footer,
  I,
  Loader,
  Navbar,
  Title,
} from "../../components";
import { CourseModal } from "./course-modal";

import styles from "./styles.module.css";

export function Courses() {
  const navigate = useNavigate();

  const { user } = useUser();
  const { courses, isLoading, error, refetch } = useCourses();
  const { deleteCourse } = useDeleteCourse();

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  let isAdmin = false;
  if (user && user.roles.includes("admin")) {
    isAdmin = true;
  }

  function handleOpenConfirmModal(id: string) {
    setSelectedCourseId(id);
    setIsConfirmModalOpen(true);
  }

  async function handleDeleteCourse() {
    if (!selectedCourseId) return;

    try {
      await deleteCourse(selectedCourseId);
      setSelectedCourseId(null);
      setIsConfirmModalOpen(false);
    } catch (error) {
      console.error("Erro ao excluir curso:", error);
    }
  }

  return (
    <>
      <Navbar />
      <section className={styles.courseSection} id="courses">
        <Title title="Nossos Cursos" size="2rem" />
        {isAdmin && (
          <>
            <button
              onClick={() => setIsModalOpen(true)}
              className={`btn btn-info ${styles.courseAdminButton}`}
            >
              <I.add_circle className={styles.courseAdminIcon} />
              Cadastrar Curso
            </button>
            <CourseModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              refetch={refetch}
            />
            <ConfirmModal
              isOpen={isConfirmModalOpen}
              fn={async () => await handleDeleteCourse()}
              actionName="Excluir curso"
              onClose={() => {
                setIsConfirmModalOpen(false);
                setSelectedCourseId(null);
              }}
            />
          </>
        )}
        <ul className={styles.courseList}>
          {isLoading && <Loader />}
          {error && <p>Houve um erro ao buscar os cursos: {error.message}</p>}
          {courses && courses.length === 0 && <p>Nenhum curso encontrado</p>}

          {courses &&
            courses.length > 0 &&
            courses.map((course) => (
              <li key={course.id}>
                <CourseCard
                  course={course}
                  onClick={() => navigate(`/courses/${course.slug}/info`)}
                  onEdit={() => {}}
                  onDelete={() => handleOpenConfirmModal(course.id)}
                  isAdmin={isAdmin}
                />
              </li>
            ))}
        </ul>
      </section>
      <Footer />
    </>
  );
}
