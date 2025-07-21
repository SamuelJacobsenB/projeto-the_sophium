import { useMutation } from "@tanstack/react-query";

import { useMessage } from "../../contexts";
import { api } from "../../services";
import { extractErrorMessage } from "../../utils";
import type { Course, CourseDTO } from "../../types";

export async function fetchCreateCourse(courseDTO: CourseDTO) {
  const response = await api.post<Course>("/api/v1/course", courseDTO);
  return response.data;
}

export function useCreateCourse() {
  const { showMessage } = useMessage();

  const { mutateAsync: createCourse } = useMutation({
    mutationFn: fetchCreateCourse,
    onSuccess: () => {
      showMessage("Curso criado com sucesso", "success");
    },
    onError: (error) => {
      const message = extractErrorMessage(error, "Erro ao criar curso");
      showMessage(message, "error");
    },
  });

  return { createCourse };
}
