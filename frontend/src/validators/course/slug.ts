export function validateSlug(slug: string): string[] {
  const errors: string[] = [];

  if (!slug) {
    errors.push("Slug é obrigatório");
  }

  if (slug.length > 50) {
    errors.push("Slug deve ter menos de 50 caracteres");
  }

  return errors;
}
