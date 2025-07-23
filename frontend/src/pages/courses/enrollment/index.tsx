import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useMessage } from "../../../contexts";
import { useCourseBySlug } from "../../../hooks";
import {
  DualPage,
  EnrolledRoute,
  FileCard,
  I,
  LoadPage,
  ModuleCard,
  Title,
} from "../../../components";
import type { Content } from "../../../types";

import styles from "./styles.module.css";

export function Enrollment() {
  const navigate = useNavigate();
  const { slug } = useParams() as { slug: string };

  const { showMessage } = useMessage();

  const { course, isLoading, error } = useCourseBySlug(slug);

  const [moduleOpenMap, setModuleOpenMap] = useState<Record<string, boolean>>(
    {}
  );
  const [activedContent, setActivedContent] = useState<Content | null>(null);

  if (isLoading) return <LoadPage />;
  if (error) {
    showMessage("Erro ao carregar curso", "error");
    navigate("/");
  }
  if (!course && !isLoading) {
    showMessage("Curso nao encontrado", "error");
    navigate("/");
  }

  if (!course) return <LoadPage />;

  return (
    <EnrolledRoute courseId={course?.id || ""}>
      <DualPage
        content={
          activedContent ? (
            <>
              <Title title={activedContent.title} size="2rem" />
              {activedContent.video_url && (
                <iframe
                  className={styles.contentVideo}
                  src={activedContent.video_url}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
              {activedContent.file_id && (
                <>
                  <hr />
                  <Title title="Arquivo" size="1.4rem" />
                  <FileCard file={activedContent.file!} />
                </>
              )}
              {activedContent.html && (
                <>
                  <hr />
                  <Title title="Conteúdo" size="1.4rem" />
                  <div
                    className={styles.contentHTML}
                    dangerouslySetInnerHTML={{ __html: activedContent.html }}
                  />
                </>
              )}
            </>
          ) : (
            <>
              <Title title={course?.title} size="2rem" />
              <img
                src={course?.file?.path}
                alt={course?.title}
                className={styles.courseImage}
              />
              <hr />
              <Title title="Descrição" size="1.4rem" />
              <p>{course?.description}</p>
            </>
          )
        }
        sideBar={
          <>
            <button className={styles.backButton} onClick={() => navigate(-1)}>
              <I.arrow_left /> Voltar
            </button>
            <ul className={styles.sideBarModuleList}>
              {course?.modules?.map((module) => (
                <li key={module.id}>
                  <ModuleCard.Root>
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
                      />
                    </ModuleCard.Header>
                    {moduleOpenMap[module.id] && (
                      <ModuleCard.Contents
                        moduleId={module.id}
                        setActiveContent={setActivedContent}
                      />
                    )}
                  </ModuleCard.Root>
                </li>
              ))}
            </ul>
          </>
        }
        sideBarClassName={styles.sideBar}
      />
    </EnrolledRoute>
  );
}
