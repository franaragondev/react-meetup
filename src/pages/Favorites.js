import { useState, useEffect } from "react";
import MeetupItem from "../components/meetups/MeetupItem";
import classes from "./../components/meetups/MeetupList.module.css";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  return (
    <section>
      <h1>Favorites Page</h1>
      {favorites.length === 0 ? (
        <p>No favorites added yet.</p>
      ) : (
        <ul className={classes.list}>
          {favorites.map((favorite) => (
            <MeetupItem key={favorite.id} item={favorite} />
          ))}
        </ul>
      )}
    </section>
  );
}
