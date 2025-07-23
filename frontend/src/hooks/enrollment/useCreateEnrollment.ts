import { useMutation } from "@tanstack/react-query";

import { useMessage, useUser } from "../../contexts";
import { api } from "../../services";
import type { Enrollment, EnrollmentDTO } from "../../types";

export async function fetchCreateEnrollment(enrollmentDTO: EnrollmentDTO) {
  const response = await api.post<Enrollment>(
    "/api/v1/enrollment",
    enrollmentDTO
  );
  return response.data;
}

export function useCreateEnrollment() {
  const { setUser } = useUser();
  const { showMessage } = useMessage();

  const { mutateAsync: createEnrollment } = useMutation({
    mutationFn: fetchCreateEnrollment,
    onSuccess: (enrollment: Enrollment) => {
      setUser((user) => {
        if (user) {
          return {
            ...user,
            enrollments: [...user.enrollments, enrollment],
          };
        }

        return user;
      });
    },
    onError: () => {
      showMessage("Erro ao realizar matricula", "error");
    },
  });

  return { createEnrollment };
}
