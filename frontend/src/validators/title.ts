export function validateTitle(title: string): string[] {
  const errors: string[] = [];

  if (!title) {
    errors.push("Titulo é obrigatório");
  }

  if (title.length > 50) {
    errors.push("Titulo deve ter menos de 50 caracteres");
  }

  return errors;
}
