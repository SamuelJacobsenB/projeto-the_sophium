export function validateDescription(description: string): string[] {
  const errors: string[] = [];

  if (!description) {
    errors.push("Descrição é obrigatória");
  }

  if (description.length > 1024) {
    errors.push("Descrição deve ter menos de 1024 caracteres");
  }

  return errors;
}
