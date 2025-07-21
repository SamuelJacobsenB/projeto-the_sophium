import { useMutation } from "@tanstack/react-query";

import { useMessage } from "../../contexts";
import { api } from "../../services";
import { extractErrorMessage } from "../../utils";
import type { Content, ContentDTO } from "../../types";

export async function fetchCreateContent(contentDTO: ContentDTO) {
  const response = await api.post<Content>("/api/v1/content/", contentDTO);
  return response.data;
}

export function useCreateContent() {
  const { showMessage } = useMessage();

  const { mutateAsync: createContent } = useMutation({
    mutationFn: fetchCreateContent,
    onSuccess: () => {
      showMessage("Conteúdo criado com sucesso", "success");
    },
    onError: (error) => {
      const message = extractErrorMessage(error, "Erro ao criar conteúdo");
      showMessage(message, "error");
    },
  });

  return { createContent };
}
