import { useState } from "react";
import type { QueryObserverResult } from "@tanstack/react-query";

import { useMessage } from "../../../contexts";
import { useCreateCourse, useCreateFile } from "../../../hooks";
import { FileInput, Form, Input, Modal, Textarea } from "../../../components";
import {
  validateDescription,
  validateSlug,
  validateTitle,
} from "../../../validators";
import type { Course } from "../../../types";

import styles from "./styles.module.css";

interface CreateCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => Promise<QueryObserverResult<Course[], unknown>>;
}

export function CreateCourseModal({
  isOpen,
  onClose,
  refetch,
}: CreateCourseModalProps) {
  const { showMessage } = useMessage();

  const { createFile } = useCreateFile();
  const { createCourse } = useCreateCourse();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  async function handleSubmit() {
    setErrors([]);

    const titleErrors = validateTitle(title);
    const slugErrors = validateSlug(slug);
    const descriptionErrors = validateDescription(description);
    const fileErrors: string[] = [];
    if (file == null) fileErrors.push("Arquivo é obrigatorio");

    const validationErrors = [
      ...titleErrors,
      ...slugErrors,
      ...descriptionErrors,
      ...fileErrors,
    ];

    setErrors(validationErrors);

    if (validationErrors.length > 0) return;

    try {
      const responseFile = await createFile(file!);

      await createCourse({
        title,
        slug,
        description,
        file_id: responseFile.id,
      });

      await refetch();

      showMessage("Curso cadastrado com sucesso", "success");
      handleClose();
    } catch (error) {
      console.error("Error to register course: " + error);
      showMessage("Houve um erro ao cadastrar o curso", "error");
    }
  }

  function handleClose() {
    setTitle("");
    setSlug("");
    setDescription("");
    setFile(null);
    setErrors([]);

    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <h1 className={styles.modalTitle}>Cadastro de Curso</h1>
      <hr />
      <Form onSubmit={handleSubmit} errors={errors} submitText="Cadastrar">
        <Input
          label="Titulo"
          type="text"
          name="title"
          placeholder="Digite o titulo"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          label="Slug"
          type="text"
          name="slug"
          placeholder="Digite o slug"
          required
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
        <Textarea
          label="Descrição"
          name="description"
          placeholder="Digite a descrição"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <FileInput
          label="Imagem"
          id="image"
          required
          onChange={(file) => setFile(file)}
        />
      </Form>
    </Modal>
  );
}
