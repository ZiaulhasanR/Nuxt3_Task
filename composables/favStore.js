

export const  loadFavorites = () => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
     return storedFavorites
};