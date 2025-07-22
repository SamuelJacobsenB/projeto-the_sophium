import { useMutation } from "@tanstack/react-query";

import { useMessage } from "../../contexts";
import { api } from "../../services";
import { extractErrorMessage } from "../../utils";
import type { File as ResponseFile } from "../../types";

export async function fetchUpdateContentFile({
  id,
  file,
}: {
  id: string;
  file: File;
}) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.patch<ResponseFile>(
    `/api/v1/content/${id}/file`,
    formData
  );
  return response.data;
}

export function useUpdateContentFile() {
  const { showMessage } = useMessage();

  const { mutateAsync: updateContentFile } = useMutation({
    mutationFn: fetchUpdateContentFile,
    onError: (error) => {
      const message = extractErrorMessage(error, "Erro ao atualizar conteúdo");
      showMessage(message, "error");
    },
  });

  return { updateContentFile };
}
