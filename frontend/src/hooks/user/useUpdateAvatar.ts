import { useMutation } from "@tanstack/react-query";

import { useMessage } from "../../contexts";
import { api } from "../../services";
import type { File as ResponseFile } from "../../types";
import { extractErrorMessage } from "../../utils";

export async function fetchUpdateAvatar(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.patch<ResponseFile>("/api/v1/user/avatar");
  return response.data;
}

export function useUpdateAvatar() {
  const { showMessage } = useMessage();

  const { mutateAsync: updateAvatar } = useMutation({
    mutationFn: fetchUpdateAvatar,
    onSuccess: () => {
      showMessage("Avatar atualizado com sucesso", "success");
    },
    onError: (error) => {
      const message = extractErrorMessage(error, "Erro ao atualizar avatar");
      showMessage(message, "error");
    },
  });

  return { updateAvatar };
}
