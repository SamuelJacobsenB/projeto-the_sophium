import React, { useEffect, useState } from "react";

import { useUser } from "../../../../contexts";
import {
  useCreateProgress,
  useDeleteProgress,
  useModuleById,
} from "../../../../hooks";
import { ContentCard, Loader } from "../../";
import type { Content } from "../../../../types";

import styles from "./styles.module.css";

interface ModuleCardContentsProps {
  moduleId: string;
  setActiveContent: React.Dispatch<React.SetStateAction<Content | null>>;
}

export function ModuleCardContents({
  moduleId,
  setActiveContent,
}: ModuleCardContentsProps) {
  const { user } = useUser();

  const { module, isLoading } = useModuleById(moduleId);

  const enrollment =
    user?.enrollments.find(
      (enrollment) => enrollment.course_id === module?.course_id
    ) || null;
  const { createProgress } = useCreateProgress(enrollment?.id || "");
  const { deleteProgress } = useDeleteProgress(enrollment?.id || "");

  const [contents, setContents] = useState<Content[]>([]);
  const [activeContentId, setActiveContentId] = useState("");

  useEffect(() => {
    async function load() {
      if (contents.length === 0 && module && module.contents) {
        const sorted = [...module.contents].sort((a, b) => a.order - b.order);
        setContents(sorted);
      }
    }

    load();
  }, [contents.length, module]);

  if (!module) return null;
  if (!user || !user.enrollments) return null;

  return (
    <div className={styles.moduleCardContent}>
      {isLoading && <Loader />}
      <ul className={styles.moduleCardContentList}>
        {contents.map((content) => (
          <li key={content.id}>
            <ContentCard.Root
              className={
                activeContentId === content.id ? styles.activeContent : ""
              }
            >
              <ContentCard.Info
                onClick={() => {
                  setActiveContent(content);
                  setActiveContentId(content.id);
                }}
              >
                <ContentCard.IconArea content={content} />
                <ContentCard.Title title={content.title} />
              </ContentCard.Info>
              <ContentCard.Check
                onClick={async () => {
                  if (enrollment) {
                    if (!enrollment.progress) {
                      await createProgress({
                        enrollment_id: enrollment.id,
                        content_id: content.id,
                      });

                      return;
                    }

                    const progress = enrollment.progress.find(
                      (p) => p.content_id === content.id
                    );

                    if (progress && progress.content_id === content.id) {
                      await deleteProgress(progress.id);
                    } else {
                      await createProgress({
                        enrollment_id: enrollment.id,
                        content_id: content.id,
                      });
                    }
                  }
                }}
                checked={
                  user.enrollments.find(
                    (enrollment) => enrollment.course_id === module.course_id
                  )?.progress
                    ? user.enrollments
                        .find(
                          (enrollment) =>
                            enrollment.course_id === module.course_id
                        )
                        ?.progress.find((p) => p.content_id === content.id) !==
                      undefined
                    : false
                }
              />
            </ContentCard.Root>
          </li>
        ))}
      </ul>
    </div>
  );
}
