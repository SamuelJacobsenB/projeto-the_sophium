import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { useMessage } from "../../contexts";
import { api } from "../../services";
import { extractErrorMessage } from "../../utils";
import type { LoginDTO } from "../../types";

export async function fetchLogin(loginDTO: LoginDTO) {
  const response = await api.post<string>("/api/v1/auth/login", loginDTO);
  return response.data;
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
    onError: (error) => {
      const message = extractErrorMessage(error, "Erro ao realizar login");
      showMessage(message, "error");
    },
  });
}
