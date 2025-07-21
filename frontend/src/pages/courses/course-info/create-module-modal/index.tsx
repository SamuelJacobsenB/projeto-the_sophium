import { useState } from "react";
import type { QueryObserverResult } from "@tanstack/react-query";

import { useCreateModule } from "../../../../hooks";
import { Form, Input, Modal } from "../../../../components";
import { validateSlug, validateTitle } from "../../../../validators";
import type { Course } from "../../../../types";

import styles from "./styles.module.css";

interface CreateModuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => Promise<QueryObserverResult<Course, unknown>>;
  courseId: string;
}

export function CreateModuleModal({
  isOpen,
  onClose,
  refetch,
  courseId,
}: CreateModuleModalProps) {
  const { createModule } = useCreateModule();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [error, setError] = useState<string[]>([]);

  async function handleSubmit() {
    setError([]);

    const titleErrors = validateTitle(title);
    const slugErrors = validateSlug(slug);

    const validationErrors = [...titleErrors, ...slugErrors];

    setError(validationErrors);

    if (validationErrors.length > 0) return;

    try {
      await createModule({ title, slug, course_id: courseId });
      await refetch();
      handleClose();
    } catch (error) {
      console.error("Error to create module:", error);
    }
  }

  function handleClose() {
    setTitle("");
    setSlug("");
    setError([]);

    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <h1 className={styles.modalTitle}>Cadastrar módulo</h1>
      <hr />
      <Form onSubmit={handleSubmit} submitText="Cadastrar" errors={error}>
        <Input
          label="Título"
          type="text"
          name="title"
          placeholder="Título do módulo"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          label="Slug"
          type="text"
          name="slug"
          placeholder="Slug do módulo"
          required
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
      </Form>
    </Modal>
  );
}
