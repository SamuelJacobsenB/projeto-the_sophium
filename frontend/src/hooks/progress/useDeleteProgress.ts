import { useMutation } from "@tanstack/react-query";

import { useMessage, useUser } from "../../contexts";
import { api } from "../../services";
import { extractErrorMessage } from "../../utils";

export async function fetchDeleteProgress(id: string) {
  await api.delete<string>(`/api/v1/progress/${id}`);
  return id;
}

export function useDeleteProgress(enrollmentId: string) {
  const { setUser } = useUser();
  const { showMessage } = useMessage();

  const { mutateAsync: deleteProgress } = useMutation({
    mutationFn: fetchDeleteProgress,
    onSuccess: (id: string) => {
      setUser((user) => {
        if (user) {
          return {
            ...user,
            enrollments: user.enrollments.map((enrollment) => {
              if (enrollment.id === enrollmentId) {
                return {
                  ...enrollment,
                  progress: enrollment.progress.filter((p) => p.id !== id),
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

  return { deleteProgress };
}
