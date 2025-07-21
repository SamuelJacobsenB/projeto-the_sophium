import { useMutation } from "@tanstack/react-query";

import { useMessage } from "../../contexts";
import { api } from "../../services";
import { extractErrorMessage } from "../../utils";
import type { Module, ModuleDTO } from "../../types";

export async function fetchUpdateModule({
  dto,
  id,
}: {
  dto: ModuleDTO;
  id: string;
}) {
  const response = await api.put<Module>(`/api/v1/module/${id}`, dto);
  return response.data;
}

export function useUpdateModule() {
  const { showMessage } = useMessage();

  const { mutateAsync: updateModule } = useMutation({
    mutationFn: fetchUpdateModule,
    onSuccess: () => {
      showMessage("Módulo atualizado com sucesso", "success");
    },
    onError: (error) => {
      const message = extractErrorMessage(error, "Erro ao atualizar módulo");
      showMessage(message, "error");
    },
  });

  return { updateModule };
}
