import { useMutation } from "@tanstack/react-query";

import { useMessage } from "../../contexts";
import { api } from "../../services";
import { extractErrorMessage } from "../../utils";

export async function fetchDeleteModule(id: string) {
  const response = await api.delete<string>(`/api/v1/module/${id}`);
  return response.data;
}

export function useDeleteModule() {
  const { showMessage } = useMessage();

  const { mutateAsync: deleteModule } = useMutation({
    mutationFn: fetchDeleteModule,
    onSuccess: () => {
      showMessage("Módulo deletado com sucesso", "success");
    },
    onError: (error) => {
      const message = extractErrorMessage(error, "Erro ao deletar módulo");
      showMessage(message, "error");
    },
  });

  return { deleteModule };
}
