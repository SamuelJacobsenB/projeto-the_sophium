export function validatePassword(password: string): string[] {
  const errors: string[] = [];

  if (!password) {
    errors.push("Senha é obrigatória");
    return errors;
  }

  if (password.length < 8 || password.length > 15) {
    errors.push("Senha deve ter entre 8 e 15 caracteres");
    return errors;
  }

  const regex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  if (!regex.test(password)) {
    errors.push(
      "Senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial"
    );
  }

  return errors;
}
