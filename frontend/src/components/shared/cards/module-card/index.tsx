import { useEffect, useState } from "react";

import { I, Button, ChangeOrder } from "../../../";
import type { Module, Content, Directon } from "../../../../types";

import styles from "./styles.module.css";

interface ModuleCardProps {
  module: Module;
  fetchModule: () => Promise<void>;
  onEdit: () => void;
  onDelete: () => void;
  onChangeOrder: (direction: Directon) => Promise<void>;
  isAdmin?: boolean;
}

export function ModuleCard({
  module,
  fetchModule,
  onEdit,
  onDelete,
  onChangeOrder,
  isAdmin,
}: ModuleCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [contents, setContents] = useState<Content[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getContentsIfNeeded() {
      if (isOpen && module.contents?.length === 0 && contents.length === 0) {
        setIsLoading(true);

        await fetchModule();

        if (module.contents) {
          const sorted = [...module.contents].sort((a, b) => a.order - b.order);
          setContents(sorted);
        }

        setIsLoading(false);
      } else if (isOpen && module.contents && contents.length === 0) {
        const sorted = [...module.contents].sort((a, b) => a.order - b.order);

        setContents(sorted);
      }
    }

    getContentsIfNeeded();
  }, [isOpen, module.contents, fetchModule, contents.length]);

  return (
    <div className={styles.moduleCardContainer}>
      <div className={styles.moduleCard}>
        <div className={styles.moduleCardInfo}>
          <h2 className={styles.moduleCardTitle}>{module.title}</h2>
          <p className={styles.moduleCardSlug}>{module.slug}</p>
        </div>
        <div className={styles.moduleCardActions}>
          <Button
            className={styles.moduleCardViewMoreButton}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <I.arrow_down /> : <I.arrow_up />}
          </Button>

          {isAdmin && (
            <>
              <button className="btn-rounded btn-info" onClick={() => onEdit()}>
                <I.pencil />
              </button>
              <button
                className="btn-rounded btn-danger"
                onClick={() => onDelete()}
              >
                <I.trash />
              </button>
              <ChangeOrder onChangeOrder={onChangeOrder} />
            </>
          )}
        </div>
      </div>

      {isOpen && (
        <div className={styles.moduleCardContent}>
          {isLoading ? (
            <p>Carregando conteúdos...</p>
          ) : contents.length > 0 ? (
            contents.map((content) => (
              <div key={content.id} className={styles.moduleCardContentItem}>
                <strong>{content.title}</strong>
              </div>
            ))
          ) : (
            <p>Nenhum conteúdo disponível.</p>
          )}
        </div>
      )}
    </div>
  );
}
