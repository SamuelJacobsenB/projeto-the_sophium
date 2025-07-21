import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { api } from "../../services";
import { extractErrorMessage } from "../../utils";
import type { Module } from "../../types";

export async function fetchModuleById(id: string) {
  try {
    const response = await api.get<Module>(`/api/v1/module/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error, "Erro ao buscar módulo"));
  }
}

export function useModuleById() {
  const [id, setId] = useState("");

  const {
    data: module,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["module", id],
    queryFn: id ? async () => await fetchModuleById(id) : undefined,
    enabled: false,
  });

  async function fetchModule(id: string) {
    setId(id);
    await refetch();
  }

  return { module, isLoading, error, fetchModule };
}
