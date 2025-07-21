export function validateBio(bio: string): string[] {
  const errors: string[] = [];

  if (bio.length > 128) {
    errors.push("Biografia muito longa");
  }

  return errors;
}
