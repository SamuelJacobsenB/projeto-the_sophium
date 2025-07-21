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
import { UpdateCourseModal } from "./update-course-modal";

export function Courses() {
  const navigate = useNavigate();

  const { user } = useUser();
  const { courses, isLoading, error, refetch } = useCourses();
  const { deleteCourse } = useDeleteCourse();

  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  let isAdmin = false;
  if (user && user.roles.includes("admin")) {
    isAdmin = true;
  }

  async function handleDeleteCourse() {
    if (!selectedCourseId) return;

    try {
      await deleteCourse(selectedCourseId);
      await refetch();
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
            <UpdateCourseModal
              course={
                courses!.find((course) => course.id === selectedCourseId)!
              }
              isOpen={isEditModalOpen}
              onClose={() => {
                setIsEditModalOpen(false);
                setSelectedCourseId(null);
              }}
              refetch={refetch}
            />
            <ConfirmModal
              isOpen={isDeleteModalOpen}
              fn={async () => await handleDeleteCourse()}
              actionName="Excluir curso"
              onClose={() => {
                setIsDeleteModalOpen(false);
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
                  onEdit={() => {
                    setSelectedCourseId(course.id);
                    setIsEditModalOpen(true);
                  }}
                  onDelete={() => {
                    setSelectedCourseId(course.id);
                    setIsDeleteModalOpen(true);
                  }}
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
