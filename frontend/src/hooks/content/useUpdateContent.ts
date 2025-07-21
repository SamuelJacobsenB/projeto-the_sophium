import { useMutation } from "@tanstack/react-query";

import { useMessage } from "../../contexts";
import { api } from "../../services";
import { extractErrorMessage } from "../../utils";
import type { ContentDTO, Content } from "../../types";

export async function fetchUpdateContent({
  dto,
  id,
}: {
  dto: ContentDTO;
  id: string;
}) {
  const response = await api.put<Content>(`/api/v1/content/${id}`, dto);
  return response.data;
}

export function useUpdateContent() {
  const { showMessage } = useMessage();

  const { mutateAsync: updateContent } = useMutation({
    mutationFn: fetchUpdateContent,
    onSuccess: () => {
      showMessage("Conteúdo atualizado com sucesso", "success");
    },
    onError: (error) => {
      const message = extractErrorMessage(error, "Erro ao atualizar conteúdo");
      showMessage(message, "error");
    },
  });

  return { updateContent };
}
