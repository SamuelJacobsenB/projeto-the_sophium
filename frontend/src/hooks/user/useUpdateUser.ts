import { useMutation } from "@tanstack/react-query";

import { useMessage, useUser } from "../../contexts";
import { api } from "../../services";
import type { UpdateUserDTO, User } from "../../types";
import { extractErrorMessage } from "../../utils";

export async function fetchUpdateUser({
  dto,
  id,
}: {
  dto: UpdateUserDTO;
  id: string;
}) {
  const response = await api.put<User>(`/api/v1/user/${id}`, {
    name: dto.name,
    phone: dto.phone,
    bio: dto.bio,
  });
  return response.data;
}

export function useUpdateUser() {
  const { setUser } = useUser();
  const { showMessage } = useMessage();

  const { mutateAsync: updateUser } = useMutation({
    mutationFn: fetchUpdateUser,
    onSuccess: (user: User) => {
      setUser((previosUser) => {
        if (previosUser) {
          return {
            ...previosUser,
            name: user.name,
            phone: user.phone,
            bio: user.bio,
          };
        }

        return previosUser;
      });

      showMessage("Usuário atualizado com sucesso", "success");
    },
    onError: (error) => {
      const message = extractErrorMessage(error, "Erro ao atualizar usuário");
      showMessage(message, "error");
    },
  });

  return { updateUser };
}
