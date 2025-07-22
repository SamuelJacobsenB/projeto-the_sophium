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
import { UpdateCourseModal } from "./update-course-modal";

import styles from "./styles.module.css";

export function Courses() {
  const navigate = useNavigate();

  const { user } = useUser();
  const { courses, isLoading, error, refetch } = useCourses();
  const { deleteCourse } = useDeleteCourse();

  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  const isAdmin = user?.roles.includes("admin") ?? false;

  const courseToEdit = courses?.find((c) => c.id === activeCourseId) ?? null;

  async function handleDeleteCourse() {
    if (!activeCourseId) return;

    try {
      await deleteCourse(activeCourseId);
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
              onClick={() => setCreateModalOpen(true)}
              className={`btn btn-info ${styles.courseAdminButton}`}
            >
              <I.add_circle className={styles.courseAdminIcon} />
              Cadastrar Curso
            </button>

            <CourseModal
              isOpen={isCreateModalOpen}
              onClose={() => setCreateModalOpen(false)}
              refetch={refetch}
            />

            {courseToEdit && (
              <UpdateCourseModal
                course={courseToEdit}
                isOpen={isEditModalOpen}
                onClose={() => {
                  setEditModalOpen(false);
                  setActiveCourseId(null);
                }}
                refetch={refetch}
              />
            )}

            <ConfirmModal
              isOpen={isDeleteModalOpen}
              fn={async () => await handleDeleteCourse()}
              actionName="Excluir curso"
              onClose={() => {
                setDeleteModalOpen(false);
                setActiveCourseId(null);
              }}
            />
          </>
        )}

        <ul className={styles.courseList}>
          {isLoading && <Loader />}
          {error && <p>Houve um erro ao buscar os cursos: {error.message}</p>}
          {!isLoading && courses?.length === 0 && (
            <p>Nenhum curso encontrado</p>
          )}

          {courses?.map((course) => (
            <li key={course.id}>
              <CourseCard.Root>
                <CourseCard.Image
                  src={course.file?.path}
                  alt={course.file?.name}
                />
                <CourseCard.Info
                  title={course.title}
                  description={course.description}
                />
                <CourseCard.Actions
                  onClick={() => navigate(`/courses/${course.slug}/info`)}
                  isAdmin={isAdmin}
                  onEdit={() => {
                    setActiveCourseId(course.id);
                    setEditModalOpen(true);
                  }}
                  onDelete={() => {
                    setActiveCourseId(course.id);
                    setDeleteModalOpen(true);
                  }}
                />
              </CourseCard.Root>
            </li>
          ))}
        </ul>
      </section>

      <Footer />
    </>
  );
}
