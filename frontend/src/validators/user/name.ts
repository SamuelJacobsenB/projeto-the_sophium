export function validateName(name: string): string[] {
  const errors: string[] = [];

  if (!name) {
    errors.push("Nome é obrigatório");
  }

  if (name.length < 3 || name.length > 50) {
    errors.push("Nome deve ter entre 3 e 50 caracteres");
  }

  const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
  if (!regex.test(name)) {
    errors.push("Nome deve conter apenas letras e espaços");
  }

  return errors;
}
