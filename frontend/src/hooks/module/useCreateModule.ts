import { useMutation } from "@tanstack/react-query";

import { useMessage } from "../../contexts";
import { api } from "../../services";
import { extractErrorMessage } from "../../utils";
import type { Module, ModuleDTO } from "../../types";

export async function fetchCreateModule(moduleDTO: ModuleDTO) {
  const response = await api.post<Module>("/api/v1/module/", moduleDTO);
  return response.data;
}

export function useCreateModule() {
  const { showMessage } = useMessage();

  const { mutateAsync: createModule } = useMutation({
    mutationFn: fetchCreateModule,
    onSuccess: () => {
      showMessage("Módulo criado com sucesso", "success");
    },
    onError: (error) => {
      const message = extractErrorMessage(error, "Erro ao criar módulo");
      showMessage(message, "error");
    },
  });

  return { createModule };
}
