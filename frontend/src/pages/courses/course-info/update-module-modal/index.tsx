import { useEffect, useState } from "react";
import type { QueryObserverResult } from "@tanstack/react-query";

import { useUpdateModule } from "../../../../hooks";
import { Form, Input, Modal } from "../../../../components";
import { validateTitle, validateSlug } from "../../../../validators";
import type { Course, Module, ModuleDTO } from "../../../../types";

import styles from "./styles.module.css";

interface UpdateModuleModalProps {
  module?: Module;
  isOpen: boolean;
  onClose: () => void;
  refetch: () => Promise<QueryObserverResult<Course, unknown>>;
}

export function UpdateModuleModal({
  module,
  isOpen,
  onClose,
  refetch,
}: UpdateModuleModalProps) {
  const { updateModule } = useUpdateModule();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  async function handleSubmit() {
    if (!module) return;

    setErrors([]);

    const titleErrors = validateTitle(title);
    const slugErrors = validateSlug(slug);

    const validationErrors = [...titleErrors, ...slugErrors];

    setErrors(validationErrors);

    if (validationErrors.length > 0) return;

    const dto: ModuleDTO = {
      title,
      slug,
      course_id: module.course_id,
    };

    try {
      await updateModule({ dto, id: module.id });
      await refetch();

      onClose();
    } catch (error) {
      console.log("Error to update course:", error);
    }
  }

  useEffect(() => {
    if (!module) return;

    setTitle(module.title);
    setSlug(module.slug);
  }, [module]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h1 className={styles.modalTitle}>Editar Módulo</h1>
      <hr />
      <Form
        onSubmit={async () => await handleSubmit()}
        errors={errors}
        submitText="Salvar alterações"
      >
        <Input
          label="Título"
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          label="Slug"
          type="text"
          name="slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
      </Form>
    </Modal>
  );
}
