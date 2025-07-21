import { useMutation } from "@tanstack/react-query";

import { useMessage } from "../../contexts";
import { api } from "../../services";
import { extractErrorMessage } from "../../utils";
import type { File as ResponseFile } from "../../types";

export async function fetchCreateFile(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post<ResponseFile>("/api/v1/file/", formData);
  return response.data;
}

export function useCreateFile() {
  const { showMessage } = useMessage();

  const { mutateAsync: createFile } = useMutation({
    mutationFn: fetchCreateFile,
    onError: (error) => {
      const message = extractErrorMessage(error, "Erro ao criar arquivo");
      showMessage(message, "error");
    },
  });

  return { createFile };
}
