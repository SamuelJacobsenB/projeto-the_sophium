import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { useMessage } from "../../contexts";
import { api } from "../../services";
import type { VerifyUser } from "../../types";

export async function fetchVerifyUser({ id, token }: VerifyUser) {
  try {
    const response = await api.post<string>(
      `/api/v1/auth/${id}/verify?token=${token}`
    );
    return response.data;
  } catch {
    throw new Error("Erro ao verificar usuário");
  }
}

export function useVerifyUser() {
  const navigate = useNavigate();
  const { showMessage } = useMessage();

  return useMutation({
    mutationFn: fetchVerifyUser,
    onSuccess: () => {
      showMessage("Usuário verificado com sucesso, faça o login", "success");
      navigate("/login");
    },
    onError: () => showMessage("Erro ao verificar usuário", "error"),
  });
}
