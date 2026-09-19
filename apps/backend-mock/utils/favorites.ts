const favorites = new Map<number, Set<number>>();
export function getFavorite(userId: number, productId: number) {
  return {
    productId,
    favorite: favorites.get(userId)?.has(productId) ?? false,
  };
}
export function setFavorite(
  userId: number,
  productId: number,
  favorite: boolean,
) {
  const saved = favorites.get(userId) ?? new Set<number>();
  if (favorite) saved.add(productId);
  else saved.delete(productId);
  favorites.set(userId, saved);
  return getFavorite(userId, productId);
}
