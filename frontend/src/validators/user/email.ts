export function validateEmail(email: string): string[] {
  const errors: string[] = [];

  if (!email) {
    errors.push("Email é obrigatório");
  }

  if (email.length > 255) {
    errors.push("Email muito longo");
  }

  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+$/;
  if (!regex.test(email)) {
    errors.push("Email inválido");
  }

  if (email.split("@").length !== 2) {
    errors.push("Email deve conterapenar apenas um '@'");
  }

  return errors;
}
