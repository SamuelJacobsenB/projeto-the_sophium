import { useMutation } from "@tanstack/react-query";

import { useMessage } from "../../contexts";
import { api } from "../../services";
import { extractErrorMessage } from "../../utils";

export async function fetchDeleteAvatar() {
  const response = await api.delete<string>("/api/v1/user/avatar");
  return response.data;
}

export function useDeleteAvatar() {
  const { showMessage } = useMessage();

  const { mutateAsync: deleteAvatar } = useMutation({
    mutationFn: fetchDeleteAvatar,
    onSuccess: () => {
      showMessage("Avatar deletado com sucesso", "success");
    },
    onError: (error) => {
      const message = extractErrorMessage(error, "Erro ao deletar avatar");
      showMessage(message, "error");
    },
  });

  return { deleteAvatar };
}
