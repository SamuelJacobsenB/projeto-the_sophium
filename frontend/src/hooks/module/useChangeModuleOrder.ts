import { useMutation } from "@tanstack/react-query";

import { useMessage } from "../../contexts";
import { api } from "../../services";
import { extractErrorMessage } from "../../utils";

export async function fetchChangeModuleOrder(id: string) {
  const response = await api.patch<string>(`/api/v1/module/${id}/order`);
  return response.data;
}

export function useChangeModuleOrder() {
  const { showMessage } = useMessage();

  const { mutateAsync: changeModuleOrder } = useMutation({
    mutationFn: fetchChangeModuleOrder,
    onError: (error) => {
      const message = extractErrorMessage(error, "Erro ao alterar ordem");
      showMessage(message, "error");
    },
  });

  return { changeModuleOrder };
}
