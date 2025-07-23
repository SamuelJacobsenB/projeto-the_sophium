import { useQuery } from "@tanstack/react-query";

import { api } from "../../services";

export async function fetchVerifyUser() {
  const response = await api.get<string>("/api/v1/auth/verify/user");
  return response.data;
}

export function useVerifyUser() {
  const {
    data: isVerified,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["verify-user"],
    queryFn: async () => await fetchVerifyUser(),
  });

  return { isVerified, isLoading, error };
}
