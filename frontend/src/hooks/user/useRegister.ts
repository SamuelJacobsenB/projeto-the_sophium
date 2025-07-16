import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { useMessage } from "../../contexts";
import { api } from "../../services";
import type { User, UserDTO } from "../../types";

export async function fetchRegister(userDTO: UserDTO) {
  try {
    const response = await api.post<User>("/api/v1/user", userDTO);
    return response.data;
  } catch {
    throw new Error("Erro ao realizar cadastro");
  }
}

export function useRegister() {
  const navigate = useNavigate();
  const { showMessage } = useMessage();

  return useMutation({
    mutationFn: fetchRegister,
    onSuccess: (user: User) => {
      showMessage(
        "Cadastro realizado com sucesso, verifique seu email",
        "success"
      );
      navigate(`/verify/user/${user.id}`);
    },
    onError: () => showMessage("Erro ao realizar cadastro", "error"),
  });
}
