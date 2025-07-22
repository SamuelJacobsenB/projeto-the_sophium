import { useMutation } from "@tanstack/react-query";

import { useMessage } from "../../contexts";
import { api } from "../../services";
import { extractErrorMessage } from "../../utils";

export async function fetchChangeContentOrder(id: string) {
  const response = await api.patch<string>(`/api/v1/content/${id}/order`);
  return response.data;
}

export function useChangeContentOrder() {
  const { showMessage } = useMessage();

  const { mutateAsync: changeContentOrder } = useMutation({
    mutationFn: fetchChangeContentOrder,
    onError: (error) => {
      const message = extractErrorMessage(error, "Erro ao alterar ordem");
      showMessage(message, "error");
    },
  });

  return { changeContentOrder };
}
