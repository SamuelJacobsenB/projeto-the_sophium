import { useEffect, useState } from "react";

import {
  useChangeContentOrder,
  useDeleteContent,
  useModuleById,
} from "../../../../hooks";
import { ConfirmModal, ContentCard, I, Loader } from "../../../";
import { CreateContentModal } from "./create-content-modal";
import { UpdateContentModal } from "./update-content-modal";
import type { Content, Directon } from "../../../../types";

import styles from "./styles.module.css";

interface ModuleCardContentsProps {
  moduleId: string;
  isAdmin?: boolean;
}

export function ModuleCardInfoContents({
  moduleId,
  isAdmin,
}: ModuleCardContentsProps) {
  const { module, isLoading, refetch } = useModuleById(moduleId);
  const { changeContentOrder } = useChangeContentOrder();
  const { deleteContent } = useDeleteContent();

  const [contents, setContents] = useState<Content[]>([]);

  const [isCreateContentOpen, setCreateContentOpen] = useState(false);

  const [activeContentId, setActiveContentId] = useState("");
  const [isEditContentOpen, setEditContentOpen] = useState(false);
  const [isDeleteContentOpen, setDeleteContentOpen] = useState(false);

  async function handleChangeOrder(id: string, direction: Directon) {
    if (!module) return;

    const order = module.contents.findIndex((content) => content.id === id);

    try {
      if (direction === "up") {
        if (order === 0) return;
        await changeContentOrder(id);
      } else {
        if (order === module.contents.length - 1) return;

        const previosContent = module.contents.find(
          (content) => content.order === order + 1
        );
        if (!previosContent) return;

        await changeContentOrder(previosContent.id);
      }

      refetch().then((res) => {
        if (!res.data) return;

        const sorted = [...res.data.contents].sort((a, b) => a.order - b.order);
        setContents(sorted);
      });
    } catch (error) {
      console.log("error changing module order", error);
    }
  }

  useEffect(() => {
    async function load() {
      if (contents.length === 0 && module?.contents?.length) {
        const sorted = [...module.contents].sort((a, b) => a.order - b.order);
        setContents(sorted);
      }
    }

    load();
  }, [contents, module]);

  return (
    <div className={styles.moduleCardContent}>
      {isAdmin && module && (
        <div className={styles.newContentArea}>
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
              await refetch();

              if (module && module.contents) {
                const sorted = [...module.contents].sort(
                  (a, b) => a.order - b.order
                );
                setContents(sorted);
              }
            }}
          />
          <UpdateContentModal
            content={
              module.contents
                ? module.contents.find(
                    (content) => content.id === activeContentId
                  )
                : undefined
            }
            isOpen={isEditContentOpen}
            onClose={() => {
              setEditContentOpen(false);
              setActiveContentId("");
            }}
            refetch={async () => {
              await refetch();

              if (module && module.contents) {
                const sorted = [...module.contents].sort(
                  (a, b) => a.order - b.order
                );
                setContents(sorted);
              }
            }}
          />
          <ConfirmModal
            isOpen={isDeleteContentOpen}
            onClose={() => {
              setDeleteContentOpen(false);
              setActiveContentId("");
            }}
            fn={async () => {
              await deleteContent(activeContentId);
            }}
            actionName="Excluir Conteúdo"
          />
        </div>
      )}
      {isLoading ? (
        <Loader />
      ) : contents.length > 0 ? (
        <ul className={styles.moduleCardContentList}>
          {contents.map((content) => (
            <li key={content.id}>
              <ContentCard.Root>
                <ContentCard.Info>
                  <ContentCard.IconArea content={content} />
                  <ContentCard.Title title={content.title} />
                </ContentCard.Info>
                <ContentCard.Actions
                  adminActions={isAdmin}
                  onEdit={() => {
                    setActiveContentId(content.id);
                    setEditContentOpen(true);
                  }}
                  onDelete={() => {
                    setActiveContentId(content.id);
                    setDeleteContentOpen(true);
                  }}
                  onChangeOrder={async (direction) => {
                    await handleChangeOrder(content.id, direction);
                  }}
                />
              </ContentCard.Root>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum conteúdo disponível.</p>
      )}
    </div>
  );
}
