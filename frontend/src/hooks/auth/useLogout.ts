import { useMutation } from "@tanstack/react-query";

import { useMessage } from "../../contexts";
import { api } from "../../services";
import { extractErrorMessage } from "../../utils";

export async function fetchLogout() {
  const response = await api.post<string>("/api/v1/auth/logout");
  return response.data;
}

export function useLogout() {
  const { showMessage } = useMessage();

  const { mutateAsync: logout } = useMutation({
    mutationFn: fetchLogout,
    onSuccess: () => {
      showMessage("Logout realizado com sucesso", "success");
    },
    onError: (error) => {
      const message = extractErrorMessage(error, "Erro ao realizar logout");
      showMessage(message, "error");
    },
  });

  return { logout };
}
