import { useEffect, useState } from "react";

import { ContentCard, I, Loader } from "../../../";
import type { Content, Module } from "../../../../types";

import styles from "./styles.module.css";
import { CreateContentModal } from "./create-content-modal";

interface ModuleCardContentsProps {
  module: Module;
  fetchModule: () => Promise<void>;
  isOpen: boolean;
  isAdmin?: boolean;
}

export function ModuleCardContents({
  module,
  fetchModule,
  isOpen,
  isAdmin,
}: ModuleCardContentsProps) {
  const [contents, setContents] = useState<Content[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isCreateContentOpen, setCreateContentOpen] = useState(false);

  useEffect(() => {
    async function load() {
      if (isOpen && contents.length === 0) {
        setIsLoading(true);

        await fetchModule();

        if (module.contents) {
          const sorted = [...module.contents].sort((a, b) => a.order - b.order);
          setContents(sorted);
        }

        setIsLoading(false);
      }
    }

    load();
  }, [isOpen, fetchModule, module.contents, contents.length]);

  if (!isOpen) return null;

  return (
    <div className={styles.moduleCardContent}>
      {isAdmin && (
        <>
          <button
            className={`btn btn-info ${styles.newContentButton}`}
            onClick={() => setCreateContentOpen(true)}
          >
            <I.add_circle /> Novo conteúdo
          </button>
          <CreateContentModal
            isOpen={isCreateContentOpen}
            onClose={() => setCreateContentOpen(false)}
            moduleId={module.id}
            refetch={async () => {
              await fetchModule();

              if (module.contents) {
                const sorted = [...module.contents].sort(
                  (a, b) => a.order - b.order
                );
                setContents(sorted);
              }
            }}
          />
        </>
      )}
      {isLoading ? (
        <Loader />
      ) : contents.length > 0 ? (
        contents.map((content) => (
          <ContentCard.Root key={content.id} onClick={() => {}}>
            <ContentCard.IconArea content={content} />
            <ContentCard.Info title={content.title} />
            <ContentCard.Actions
              isAdmin={isAdmin}
              onEdit={() => {}}
              onDelete={() => {}}
              onChangeOrder={() => Promise.resolve()}
            />
          </ContentCard.Root>
        ))
      ) : (
        <p>Nenhum conteúdo disponível.</p>
      )}
    </div>
  );
}
