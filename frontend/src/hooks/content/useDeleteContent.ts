import { useMutation } from "@tanstack/react-query";

import { useMessage } from "../../contexts";
import { api } from "../../services";
import { extractErrorMessage } from "../../utils";

export async function fetchDeleteContent(id: string) {
  const response = await api.delete<string>(`/api/v1/content/${id}`);
  return response.data;
}

export function useDeleteContent() {
  const { showMessage } = useMessage();

  const { mutateAsync: deleteContent } = useMutation({
    mutationFn: fetchDeleteContent,
    onSuccess: () => {
      showMessage("Conteúdo deletado com sucesso", "success");
    },
    onError: (error) => {
      const message = extractErrorMessage(error, "Erro ao deletar conteúdo");
      showMessage(message, "error");
    },
  });

  return { deleteContent };
}
