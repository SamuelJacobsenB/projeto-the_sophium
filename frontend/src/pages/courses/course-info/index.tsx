import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useUser } from "../../../contexts";
import { useCourseBySlug, useModuleById } from "../../../hooks";
import { DualPage, I, LoadPage, ModuleCard, Title } from "../../../components";
import { CreateModuleModal } from "./create-module-modal";

import styles from "./styles.module.css";

export function CourseInfo() {
  const navigate = useNavigate();

  const { user } = useUser();
  const { slug } = useParams() as { slug: string };
  const { course, error, isLoading, refetch } = useCourseBySlug(slug);
  const { fetchModule } = useModuleById();

  const [isModalOpen, setIsModalOpen] = useState(false);

  let isAdmin = false;
  if (user && user.roles.includes("admin")) {
    isAdmin = true;
  }

  if (isLoading) return <LoadPage />;
  if (error) {
    navigate("/");
    return null;
  }
  if (!course) return <LoadPage />;

  return (
    <DualPage
      sideBar={
        <>
          <img
            src={course.file?.path}
            alt={course.file?.name}
            className={styles.sideBarImage}
          />
          <div className={styles.sideBarContent}>
            <h1 className={styles.sideBarTitle}>{course.title}</h1>
            <small className={styles.sideBarSlug}>{course.slug}</small>
          </div>
          <p className={styles.sideBarDate}>
            <I.calendar className={styles.sideBarDateIcon} />
            {course.created_at.toString().split("T")[0]}
          </p>
        </>
      }
      content={
        <>
          <Title title={course.title} size="2.5rem" />
          <p>{course.description}</p>
          <div className={styles.infoContainer}>
            <Title title="Módulos" size="2rem" />
            {isAdmin && (
              <>
                <button
                  className={`btn btn-info ${styles.newModuleButton}`}
                  onClick={() => setIsModalOpen(true)}
                >
                  <I.add_circle />
                  Novo módulo
                </button>
                <CreateModuleModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  refetch={refetch}
                  courseId={course.id}
                />
              </>
            )}
            <div className={styles.modules}>
              {(!course.modules || course.modules.length === 0) && (
                <p>Nenhum módulo encontrado</p>
              )}
              {course.modules &&
                course.modules.map((module) => (
                  <ModuleCard
                    module={module}
                    fetchModule={async () => fetchModule(module.id)}
                    onEdit={async () => {}}
                    onDelete={async () => {}}
                    isAdmin={isAdmin}
                    key={module.id}
                  />
                ))}
            </div>
          </div>
        </>
      }
      sideBarClassName={styles.sideBar}
    />
  );
}
