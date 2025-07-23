import React, { useEffect, useState } from "react";

import { useModuleById } from "../../../../hooks";
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
  const { module, isLoading } = useModuleById(moduleId);

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
              onClick={() => {
                setActiveContent(content);
                setActiveContentId(content.id);
              }}
            >
              <ContentCard.Info>
                <ContentCard.IconArea content={content} />
                <ContentCard.Title title={content.title} />
              </ContentCard.Info>
            </ContentCard.Root>
          </li>
        ))}
      </ul>
    </div>
  );
}
