import { useQuery } from "@tanstack/react-query";

import { api } from "../../services";
import { extractErrorMessage } from "../../utils";
import type { Module } from "../../types";

export async function fetchModuleById(id: string) {
  try {
    const response = await api.get<Module>(`/api/v1/module/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error, "Erro ao buscar módulo"));
  }
}

export function useModuleById(id: string) {
  const {
    data: module,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["module", id],
    queryFn: async () => await fetchModuleById(id),
  });

  return { module, isLoading, error, refetch };
}
