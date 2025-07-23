import { useQuery } from "@tanstack/react-query";

import { api } from "../../services";

export async function fetchVerifyAdmin() {
  const response = await api.get<string>("/api/v1/auth/verify/admin");
  return response.data;
}

export function useVerifyAdmin() {
  const {
    data: isVerified,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["verify-admin"],
    queryFn: async () => await fetchVerifyAdmin(),
  });

  return { isVerified, isLoading, error };
}
