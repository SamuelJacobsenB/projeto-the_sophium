import { useState } from "react";

import ReactQuill from "react-quill";

import { useCreateContent, useCreateFile } from "../../../../../hooks";
import { FileInput, Form, Input, Modal } from "../../../";
import { validateTitle } from "../../../../../validators";
import type { ContentDTO } from "../../../../../types";

import styles from "./styles.module.css";

import "react-quill/dist/quill.snow.css";

interface CreateContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => Promise<void>;
  moduleId: string;
}

export function CreateContentModal({
  isOpen,
  onClose,
  refetch,
  moduleId,
}: CreateContentModalProps) {
  const { createContent } = useCreateContent();

  const { createFile } = useCreateFile();

  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [html, setHtml] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string[]>([]);

  async function handleSubmit() {
    setError([]);

    const titleErrors = validateTitle(title);
    const validationErrors = [...titleErrors];

    setError(validationErrors);

    if (validationErrors.length > 0) return;

    const dto: ContentDTO = {
      module_id: moduleId,
      title,
      video_url: videoUrl || null,
      html: html || null,
      file_id: null,
    };

    try {
      if (file) {
        const responseFile = await createFile(file);

        dto.file_id = responseFile.id;
      }

      await createContent(dto);
      await refetch();

      handleClose();
    } catch (error) {
      console.error("Error to create module:", error);
    }
  }

  function handleClose() {
    setTitle("");
    setVideoUrl("");
    setHtml("");
    setFile(null);
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
          label="URL do vídeo"
          type="text"
          name="videoUrl"
          placeholder="URL do vídeo"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
        <ReactQuill
          theme="snow"
          value={html}
          onChange={setHtml}
          placeholder="Conteúdo do módulo"
          className={styles.quillEditor}
        />
        <FileInput label="Arquivo" onChange={setFile} />
      </Form>
    </Modal>
  );
}
