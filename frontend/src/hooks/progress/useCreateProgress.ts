import { useMutation } from "@tanstack/react-query";

import { useMessage, useUser } from "../../contexts";
import { api } from "../../services";
import { extractErrorMessage } from "../../utils";
import type { Progress, ProgressDTO } from "../../types";

export async function fetchCreateProgress(progressDTO: ProgressDTO) {
  const response = await api.post<Progress>(`/api/v1/progress`, progressDTO);
  return response.data;
}

export function useCreateProgress(enrollmentId: string) {
  const { setUser } = useUser();
  const { showMessage } = useMessage();

  const { mutateAsync: createProgress } = useMutation({
    mutationFn: fetchCreateProgress,
    onSuccess: (progress: Progress) => {
      setUser((user) => {
        if (user) {
          return {
            ...user,
            enrollments: user.enrollments.map((enrollment) => {
              if (enrollment.id === enrollmentId) {
                return {
                  ...enrollment,
                  progress: [...enrollment.progress, progress],
                };
              }

              return enrollment;
            }),
          };
        }
        return user;
      });
    },
    onError: (error) => {
      const message = extractErrorMessage(error, "Erro ao criar progresso");
      showMessage(message, "error");
    },
  });

  return { createProgress };
}
