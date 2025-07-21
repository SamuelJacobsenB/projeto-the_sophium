import { useMutation } from "@tanstack/react-query";

import type { Course, CourseDTO } from "../../types";
import { api } from "../../services";
import { useMessage } from "../../contexts";
import { extractErrorMessage } from "../../utils";

export async function fetchUpdateCourse({
  dto,
  id,
}: {
  dto: CourseDTO;
  id: string;
}) {
  const response = await api.put<Course>(`/api/v1/course/${id}`, dto);
  return response.data;
}

export function useUpdateCourse() {
  const { showMessage } = useMessage();

  const { mutateAsync: updateCourse } = useMutation({
    mutationFn: fetchUpdateCourse,
    onSuccess: () => {
      showMessage("Curso atualizado com sucesso", "success");
    },
    onError: (error) => {
      const message = extractErrorMessage(error, "Erro ao atualizar curso");
      showMessage(message, "error");
    },
  });

  return { updateCourse };
}
