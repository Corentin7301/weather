export const slugify = (str: string) => {
  const normalizedStr = str
    .toLowerCase()
    .trim()
    .normalize('NFD') // Décomposition des caractères accentués
    .replace(/[\u0300-\u036f]/g, ''); // Suppression des diacritiques

  return normalizedStr
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}