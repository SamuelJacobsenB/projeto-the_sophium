import { useQuery } from "@tanstack/react-query";

import { useUser } from "../../contexts";
import { api } from "../../services";
import { extractErrorMessage } from "../../utils";
import type { Course, Enrollment } from "../../types";

export async function fetchCoursesByEnrollment(enrollments?: Enrollment[]) {
  if (!enrollments || !enrollments.length) return [];

  try {
    const courses: Course[] = [];

    for (const enrollment of enrollments) {
      console.log(enrollment);
      const response = await api.get<Course>(
        `/api/v1/course/${enrollment.course_id}`
      );
      courses.push(response.data);
    }

    return courses;
  } catch (error) {
    throw new Error(extractErrorMessage(error, "Erro ao buscar cursos"));
  }
}

export function useCoursesByEnrollment() {
  const { user } = useUser();

  const enabled = !!user?.enrollments?.length;

  const {
    data: courses,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["enrollment-courses"],
    queryFn: () => fetchCoursesByEnrollment(user?.enrollments),
    enabled,
  });

  return { courses, isLoading, error, refetch };
}
