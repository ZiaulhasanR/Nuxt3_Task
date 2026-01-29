
export const loadFavorites = () => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
};

export const saveFavorites = (favorites) => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
};

export const removeFavorite = (productId) => {
    const favorites = loadFavorites();
    const updatedFavorites = favorites.filter(item => item.id !== productId);
    saveFavorites(updatedFavorites);
    return updatedFavorites;
};

export const addFavorite = (product) => {
    const favorites = loadFavorites();
    const exists = favorites.find(item => item.id === product.id);
    if (!exists) {
        favorites.push(product);
        saveFavorites(favorites);
    }
    return favorites;
};