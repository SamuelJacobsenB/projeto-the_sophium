import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { useMessage } from "../../contexts";
import { api } from "../../services";
import { extractErrorMessage } from "../../utils";
import type { VerifyUser } from "../../types";

export async function fetchVerifyUser({ id, token }: VerifyUser) {
  const response = await api.patch<string>(
    `/api/v1/user/${id}/verify?token=${token}`
  );
  return response.data;
}

export function useVerifyUser() {
  const navigate = useNavigate();
  const { showMessage } = useMessage();

  const { mutateAsync: verifyUser } = useMutation({
    mutationFn: fetchVerifyUser,
    onSuccess: () => {
      showMessage("Usuário verificado com sucesso, faça o login", "success");
      navigate("/login");
    },
    onError: (error) => {
      const message = extractErrorMessage(error, "Erro ao verificar usuário");
      showMessage(message, "error");
    },
  });

  return { verifyUser };
}
