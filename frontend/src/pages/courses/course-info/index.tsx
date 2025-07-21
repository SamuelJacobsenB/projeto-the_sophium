import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useUser } from "../../../contexts";
import {
  useChangeModuleOrder,
  useCourseBySlug,
  useDeleteModule,
  useModuleById,
} from "../../../hooks";
import {
  ConfirmModal,
  DualPage,
  I,
  LoadPage,
  ModuleCard,
  Title,
} from "../../../components";
import { CreateModuleModal } from "./create-module-modal";
import { UpdateModuleModal } from "./update-module-modal";
import type { Directon } from "../../../types";

import styles from "./styles.module.css";

export function CourseInfo() {
  const navigate = useNavigate();
  const { slug } = useParams() as { slug: string };

  const { user } = useUser();
  const { course, error, isLoading, refetch } = useCourseBySlug(slug);

  const { fetchModule } = useModuleById();
  const { changeModuleOrder } = useChangeModuleOrder();
  const { deleteModule } = useDeleteModule();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedModuleId, setSelectedModuleId] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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

  async function handleChangeOrder(id: string, direction: Directon) {
    const order = course!.modules.findIndex((module) => module.id === id);

    try {
      if (direction === "up") {
        if (order === 0) return;
        await changeModuleOrder(id);
      } else {
        if (order === course!.modules.length - 1) return;

        const previosModule = course!.modules.find(
          (module) => module.order === order + 1
        );

        if (!previosModule) return;

        await changeModuleOrder(previosModule!.id);
      }

      refetch();
    } catch (error) {
      console.log("error to change order ", error);
    }
  }

  async function handleDeleteModule() {
    if (!selectedModuleId) return;

    try {
      await deleteModule(selectedModuleId);
      await refetch();
    } catch (error) {
      console.log("error to delete module", error);
    }
  }

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
                <UpdateModuleModal
                  isOpen={isEditModalOpen}
                  onClose={() => {
                    setIsEditModalOpen(false);
                    setSelectedModuleId("");
                  }}
                  module={
                    course.modules.find(
                      (module) => module.id === selectedModuleId
                    )!
                  }
                  refetch={refetch}
                />
                <ConfirmModal
                  isOpen={isDeleteModalOpen}
                  onClose={() => {
                    setIsDeleteModalOpen(false);
                    setSelectedModuleId("");
                  }}
                  actionName="Excluir"
                  fn={async () => await handleDeleteModule()}
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
                    onEdit={() => {
                      setIsEditModalOpen(true);
                      setSelectedModuleId(module.id);
                    }}
                    onDelete={() => {
                      setIsDeleteModalOpen(true);
                      setSelectedModuleId(module.id);
                    }}
                    onChangeOrder={async (direction: Directon) =>
                      await handleChangeOrder(module.id, direction)
                    }
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
