import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { api } from "../../services";
import type { Content } from "../../types";

export async function fetchContentById(id: string) {
  const response = await api.get<Content>(`/api/v1/content/${id}`);
  return response.data;
}

export function useContentById() {
  const [id, setId] = useState("");

  const {
    data: content,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["content", id],
    queryFn: id ? async () => await fetchContentById(id) : undefined,
    enabled: false,
  });

  async function fetchContent(id: string) {
    setId(id);
    await refetch();
  }

  return { content, isLoading, error, fetchContent };
}
