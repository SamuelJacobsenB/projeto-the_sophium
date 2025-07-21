import { useMutation } from "@tanstack/react-query";

import { useMessage } from "../../contexts";
import { api } from "../../services";
import { extractErrorMessage } from "../../utils";

export async function fetchDeleteFile(id: string) {
  const response = await api.delete<string>(`/api/v1/file/${id}`);
  return response.data;
}

export function useDeleteFile() {
  const { showMessage } = useMessage();

  const { mutateAsync: deleteFile } = useMutation({
    mutationFn: fetchDeleteFile,
    onError: (error) => {
      const message = extractErrorMessage(error, "Erro ao deletar arquivo");
      showMessage(message, "error");
    },
  });

  return { deleteFile };
}
