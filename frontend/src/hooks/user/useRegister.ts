import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { useMessage } from "../../contexts";
import { api } from "../../services";
import { extractErrorMessage } from "../../utils";
import type { User, UserDTO } from "../../types";

export async function fetchRegister(userDTO: UserDTO) {
  const response = await api.post<User>("/api/v1/user", userDTO);
  return response.data;
}

export function useRegister() {
  const navigate = useNavigate();
  const { showMessage } = useMessage();

  const { mutateAsync: register } = useMutation({
    mutationFn: fetchRegister,
    onSuccess: (user: User) => {
      showMessage(
        "Cadastro realizado com sucesso, verifique seu email",
        "success"
      );
      navigate(`/${user.id}/verify`);
    },

    onError: (error) => {
      console.log(error);
      const message = extractErrorMessage(error, "Erro ao realizar cadastro");
      showMessage(message, "error");
    },
  });

  return { register };
}
