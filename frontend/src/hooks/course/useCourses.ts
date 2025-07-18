import { useQuery } from "@tanstack/react-query";

import { api } from "../../services";
import { extractErrorMessage } from "../../utils";
import type { Course } from "../../types";

export async function fetchCourses() {
  try {
    const response = await api.get<Course[]>("/api/v1/course");
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error, "Erro ao buscar cursos"));
  }
}

export function useCourses() {
  const {
    data: courses,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });

  return { courses, isLoading, error };
}
