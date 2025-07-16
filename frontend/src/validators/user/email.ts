export function validateEmail(email: string): string[] {
  const errors: string[] = [];

  if (!email) {
    errors.push("Email é obrigatório");
  }

  if (email.length > 255) {
    errors.push("Email muito longo");
  }

  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (regex.test(email)) {
    errors.push("Email inválido");
  }

  return errors;
}
