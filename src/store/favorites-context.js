import { createContext, useState, useEffect } from "react";

const FavoritesContext = createContext({
  favorites: [],
  totalFavorites: 0,
  addFavorite: (meetupId) => {},
  removeFavorite: (meetupId) => {},
  itemIsFavorite: (meetupId) => {},
  getLocalFavorites: () => {},
});

export function FavoritesContextProvider({ children }) {
  const [userFavorites, setUserFavorites] = useState([]);

  //run once
  useEffect(() => {
    getLocalFavorites();
  }, []);
  //save to local
  useEffect(() => {
    saveToLocalFavorites();
  }, [userFavorites]);

  function saveToLocalFavorites() {
    localStorage.setItem("favorites", JSON.stringify(userFavorites));
  }

  function getLocalFavorites() {
    if (localStorage.getItem("favorites") === null) {
      localStorage.setItem("favorites", JSON.stringify([]));
    } else {
      let favoritesFromLocal = JSON.parse(localStorage.getItem("favorites"));
      setUserFavorites(favoritesFromLocal);
    }
  }

  function addFavoriteHandler(favoriteMeetup) {
    setUserFavorites((prevUserFavorites) => {
      return prevUserFavorites.concat(favoriteMeetup);
    });
    saveToLocalFavorites();
  }
  function removeFavoriteHandler(meetupId) {
    setUserFavorites((prevUserFavorites) => {
      return prevUserFavorites.filter((meetup) => meetup.id !== meetupId);
    });
    saveToLocalFavorites();
  }
  function itemIsFavoriteHandler(meetupId) {
    return userFavorites.some((meetup) => meetup.id === meetupId);
  }

  const context = {
    favorites: userFavorites,
    totalFavorites: userFavorites.length,
    addFavorite: addFavoriteHandler,
    removeFavorite: removeFavoriteHandler,
    itemIsFavorite: itemIsFavoriteHandler,
  };

  return (
    <FavoritesContext.Provider value={context}>
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContext;
