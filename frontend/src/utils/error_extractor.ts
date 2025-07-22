export function extractErrorMessage(
  error: unknown,
  defaultMessage: string
): string {
  // Verifica se é erro de requisição (ex: axios)
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof (error as any).response?.data === "object"
  ) {
    const data = (error as any).response.data;

    // Tenta pegar "error" personalizado do backend Gin
    if (typeof data?.error === "string") {
      return data.error;
    }

    // Se por acaso tiver "message" em vez de "error"
    if (typeof data?.message === "string") {
      return data.message;
    }
  }

  // Outras formas de erro que você já trata
  if (error instanceof Error && error.message) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as any).message === "string"
  ) {
    return (error as any).message;
  }

  return defaultMessage;
}
