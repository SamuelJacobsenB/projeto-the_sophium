import { useEffect, useState } from "react";
import type { QueryObserverResult } from "@tanstack/react-query";

import { useCreateFile, useDeleteFile, useUpdateCourse } from "../../../hooks";
import { FileInput, Form, Input, Modal } from "../../../components";
import {
  validateTitle,
  validateSlug,
  validateDescription,
} from "../../../validators";
import type { Course, CourseDTO } from "../../../types";

import styles from "./styles.module.css";

interface UpdateCourseModalProps {
  course?: Course;
  isOpen: boolean;
  onClose: () => void;
  refetch: () => Promise<QueryObserverResult<Course[], unknown>>;
}

export function UpdateCourseModal({
  course,
  isOpen,
  onClose,
  refetch,
}: UpdateCourseModalProps) {
  const { updateCourse } = useUpdateCourse();

  const { createFile } = useCreateFile();
  const { deleteFile } = useDeleteFile();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  async function handleSubmit() {
    if (!course) return;

    setErrors([]);

    const titleErrors = validateTitle(title);
    const slugErrors = validateSlug(slug);
    const descriptionErrors = validateDescription(description);

    const validationErrors = [
      ...titleErrors,
      ...slugErrors,
      ...descriptionErrors,
    ];

    setErrors(validationErrors);

    if (validationErrors.length > 0) return;

    try {
      const dto: CourseDTO = {
        title,
        slug,
        description,
        file_id: null,
      };

      if (file) {
        const responseFile = await createFile(file);

        if (course.file_id) {
          await deleteFile(course.file_id);
        }

        dto.file_id = responseFile.id;
      }

      await updateCourse({ dto, id: course.id });
      await refetch();

      onClose();
    } catch (error) {
      console.log("Error to update course:", error);
    }
  }

  useEffect(() => {
    if (!course) return;

    setTitle(course.title);
    setSlug(course.slug);
    setDescription(course.description);
  }, [course]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h1 className={styles.modalTitle}>Editar Curso</h1>
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
        <Input
          label="Descrição"
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <FileInput label="Image" onChange={(file) => setFile(file)} />
      </Form>
    </Modal>
  );
}
