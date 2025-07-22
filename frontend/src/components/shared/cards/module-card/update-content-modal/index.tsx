import { useEffect, useState } from "react";

import ReactQuill from "react-quill";

import { useUpdateContent, useUpdateContentFile } from "../../../../../hooks";
import { FileInput, Form, Input, Modal } from "../../../";
import { validateTitle } from "../../../../../validators";
import type { Content, ContentDTO } from "../../../../../types";

import styles from "./styles.module.css";

import "react-quill/dist/quill.snow.css";

interface UpdateContentModalProps {
  content?: Content;
  isOpen: boolean;
  onClose: () => void;
  refetch: () => Promise<void>;
}

export function UpdateContentModal({
  content,
  isOpen,
  onClose,
  refetch,
}: UpdateContentModalProps) {
  const { updateContent } = useUpdateContent();
  const { updateContentFile } = useUpdateContentFile();

  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [html, setHtml] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string[]>([]);

  async function handleSubmit() {
    if (!content) return;

    setError([]);

    const titleErrors = validateTitle(title);
    const validationErrors = [...titleErrors];

    setError(validationErrors);

    if (validationErrors.length > 0) return;

    const dto: ContentDTO = {
      module_id: content.module_id,
      title,
      video_url: videoUrl || null,
      html: html || null,
      file_id: null,
    };

    try {
      if (file) {
        await updateContentFile({ id: content.id, file });
      }

      await updateContent({ dto, id: content.id });
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

  useEffect(() => {
    if (content) {
      setTitle(content.title);
      setVideoUrl(content.video_url || "");
      setHtml(content.html || "");
    }
  }, [content]);

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <h1 className={styles.modalTitle}>Editar Conteúdo</h1>
      <hr />
      <Form
        onSubmit={handleSubmit}
        submitText="Salvar alterações"
        errors={error}
      >
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
