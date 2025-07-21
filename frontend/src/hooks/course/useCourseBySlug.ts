import { useQuery } from "@tanstack/react-query";

import { api } from "../../services";
import { extractErrorMessage } from "../../utils";
import type { Course } from "../../types";

export async function fetchCourseBySlug(slug: string) {
  try {
    const response = await api.get<Course>(`/api/v1/course/slug/${slug}`);
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error, "Erro ao buscar curso"));
  }
}

export function useCourseBySlug(slug: string) {
  const {
    data: course,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["course", slug],
    queryFn: async () => await fetchCourseBySlug(slug),
    enabled: !!slug,
  });

  return { course, error, isLoading, refetch };
}
