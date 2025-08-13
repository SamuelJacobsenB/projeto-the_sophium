import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useMessage, useUser } from "../../../contexts";
import {
  useChangeModuleOrder,
  useCourseBySlug,
  useCreateEnrollment,
  useDeleteModule,
  useVerifyUserEnrollment,
} from "../../../hooks";
import {
  Button,
  ConfirmModal,
  DualPage,
  I,
  LoadPage,
  ModuleCard,
  Title,
} from "../../../components";
import { CreateModuleModal } from "./create-module-modal";
import { UpdateModuleModal } from "./update-module-modal";
import type { Directon, Module } from "../../../types";

import styles from "./styles.module.css";

export function CourseInfo() {
  const navigate = useNavigate();
  const { slug } = useParams() as { slug: string };

  const { showMessage } = useMessage();

  const { user } = useUser();
  const { course, error, isLoading, refetch } = useCourseBySlug(slug);

  const [modules, setModules] = useState<Module[]>([]);

  const { createEnrollment } = useCreateEnrollment();
  const { isEnrolled, checkEnrollment } = useVerifyUserEnrollment(
    course?.id || ""
  );

  const { changeModuleOrder } = useChangeModuleOrder();
  const { deleteModule } = useDeleteModule();

  const [moduleOpenMap, setModuleOpenMap] = useState<Record<string, boolean>>(
    {}
  );
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  const [activeModuleId, setActiveModuleId] = useState("");
  const [isEditModuleModalOpen, setEditModuleModalOpen] = useState(false);
  const [isDeleteModuleModalOpen, setDeleteModuleModalOpen] = useState(false);

  const isAdmin = user?.roles.includes("admin") ?? false;

  useEffect(() => {
    async function load() {
      if (modules.length === 0 && course?.modules?.length) {
        const sorted = [...course.modules].sort((a, b) => a.order - b.order);
        setModules(sorted);
      }
    }

    load();
  }, [course, modules]);

  if (isLoading || !course) return <LoadPage />;
  if (error) {
    navigate("/");
    return null;
  }

  async function handleCreateEnrollment() {
    if (!course || !user) {
      showMessage("Erro ao realizar matrícula", "error");
      return;
    }

    try {
      await createEnrollment({
        user_id: user.id,
        course_id: course.id,
      });

      checkEnrollment();
    } catch (error) {
      console.log("error creating enrollment", error);
    }
  }

  async function handleChangeOrder(id: string, direction: Directon) {
    if (!course) return;

    const order = course.modules.findIndex((module) => module.id === id);

    try {
      if (direction === "up") {
        if (order === 0) return;
        await changeModuleOrder(id);
      } else {
        if (order === course.modules.length - 1) return;

        const previosModule = course.modules.find((m) => m.order === order + 1);
        if (!previosModule) return;

        await changeModuleOrder(previosModule.id);
      }

      await refetch().then((res) => {
        if (!res.data) return;

        const sorted = [...res.data.modules].sort((a, b) => a.order - b.order);
        setModules(sorted);
      });
    } catch (error) {
      console.log("error changing module order", error);
    }
  }

  async function handleDeleteModule() {
    if (!activeModuleId) return;

    try {
      await deleteModule(activeModuleId);
      await refetch();
    } catch (error) {
      console.log("error deleting module", error);
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
          {isEnrolled ? (
            <Button
              className={`btn btn-info ${styles.sideBarEnrollButton}`}
              onClick={() => navigate(`/courses/${slug}/enrolled`)}
            >
              Acessar curso
            </Button>
          ) : (
            <Button
              className={`btn btn-info ${styles.sideBarEnrollButton}`}
              onClick={async () => await handleCreateEnrollment()}
            >
              Matricular-se
            </Button>
          )}
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
            <Title title="Módulos" size="2rem" />
            {isAdmin && (
              <>
                <button
                  className={`btn btn-info ${styles.newModuleButton}`}
                  onClick={() => setCreateModalOpen(true)}
                >
                  <I.add_circle />
                  Novo módulo
                </button>

                <CreateModuleModal
                  isOpen={isCreateModalOpen}
                  onClose={() => setCreateModalOpen(false)}
                  refetch={refetch}
                  courseId={course.id}
                />

                <UpdateModuleModal
                  isOpen={isEditModuleModalOpen}
                  onClose={() => {
                    setEditModuleModalOpen(false);
                    setActiveModuleId("");
                  }}
                  module={
                    course.modules
                      ? course.modules.find((m) => m.id === activeModuleId)
                      : undefined
                  }
                  refetch={refetch}
                />

                <ConfirmModal
                  isOpen={isDeleteModuleModalOpen}
                  onClose={() => {
                    setDeleteModuleModalOpen(false);
                    setActiveModuleId("");
                  }}
                  actionName="Excluir"
                  fn={handleDeleteModule}
                />
              </>
            )}

            <div className={styles.modules}>
              {!modules || modules.length === 0 ? (
                <p>Nenhum módulo encontrado</p>
              ) : (
                modules.map((module) => (
                  <ModuleCard.Root key={module.id}>
                    <ModuleCard.Header>
                      <ModuleCard.Info module={module} />
                      <ModuleCard.Actions
                        isOpen={moduleOpenMap[module.id] ?? false}
                        toggleOpen={() => {
                          setModuleOpenMap((prev) => ({
                            ...prev,
                            [module.id]: !prev[module.id],
                          }));
                        }}
                        onEdit={() => {
                          setEditModuleModalOpen(true);
                          setActiveModuleId(module.id);
                        }}
                        onDelete={() => {
                          setDeleteModuleModalOpen(true);
                          setActiveModuleId(module.id);
                        }}
                        onChangeOrder={(direction) =>
                          handleChangeOrder(module.id, direction)
                        }
                        adminActions={isAdmin}
                      />
                    </ModuleCard.Header>

                    {moduleOpenMap[module.id] && (
                      <div className={styles.contentContainer}>
                        <ModuleCard.InfoContents
                          moduleId={module.id}
                          isAdmin={isAdmin}
                        />
                      </div>
                    )}
                  </ModuleCard.Root>
                ))
              )}
            </div>
          </div>
        </>
      }
      sideBarClassName={styles.sideBar}
      className={styles.dualPage}
    />
  );
}
