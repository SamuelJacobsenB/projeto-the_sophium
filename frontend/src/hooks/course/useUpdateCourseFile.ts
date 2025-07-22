import { useMutation } from "@tanstack/react-query";

import { useMessage } from "../../contexts";
import { api } from "../../services";
import { extractErrorMessage } from "../../utils";
import type { File as ResponseFile } from "../../types";

export async function fetchUpdateCourseFile({
  id,
  file,
}: {
  id: string;
  file: File;
}) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.patch<ResponseFile>(
    `/api/v1/course/${id}/file`,
    formData
  );
  return response.data;
}

export function useUpdateCourseFile() {
  const { showMessage } = useMessage();

  const { mutateAsync: updateCourseFile } = useMutation({
    mutationFn: fetchUpdateCourseFile,
    onError: (error) => {
      const message = extractErrorMessage(error, "Erro ao atualizar curso");
      showMessage(message, "error");
    },
  });

  return { updateCourseFile };
}
