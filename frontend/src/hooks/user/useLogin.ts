import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { useMessage } from "../../contexts";
import { api } from "../../services";
import type { LoginDTO } from "../../types";

export async function fetchLogin(loginDTO: LoginDTO) {
  try {
    const response = await api.post<string>("/api/v1/auth/login", loginDTO);
    return response.data;
  } catch {
    throw new Error("Erro ao realizar login");
  }
}

export function useLogin() {
  const navigate = useNavigate();
  const { showMessage } = useMessage();

  return useMutation({
    mutationFn: fetchLogin,
    onSuccess: () => {
      showMessage("Login realizado com sucesso", "success");
      navigate("/");
    },
    onError: () => showMessage("Erro ao realizar login", "error"),
  });
}
