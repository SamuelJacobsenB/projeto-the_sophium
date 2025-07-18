import { useMutation } from "@tanstack/react-query";

import { useMessage } from "../../contexts";
import { api } from "../../services";
import { extractErrorMessage } from "../../utils";

export async function fetchDeleteCourse(id: string) {
  const response = await api.delete<string>(`/api/v1/course/${id}`);
  return response.data;
}

export function useDeleteCourse() {
  const { showMessage } = useMessage();

  return useMutation({
    mutationFn: fetchDeleteCourse,
    onSuccess: () => {
      showMessage("Curso deletado com sucesso", "success");
    },
    onError: (error) => {
      const message = extractErrorMessage(error, "Erro ao deletar curso");
      showMessage(message, "error");
    },
  });
}
