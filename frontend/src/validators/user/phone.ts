export function validatePhone(phone: string): string[] {
  const errors: string[] = [];

  if (!phone) {
    errors.push("Telefone é obrigatório");
  }

  const regex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
  if (!regex.test(phone)) {
    errors.push("Telefone inválido");
  }

  return errors;
}
