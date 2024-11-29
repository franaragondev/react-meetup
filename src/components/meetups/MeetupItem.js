import { useState } from "react";
import classes from "./MeetupItem.module.css";
import Card from "../ui/Card";

export default function MeetupItem({ item }) {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  const isFavorite = favorites.some((favorite) => favorite.id === item.id);

  const toggleFavoriteHandler = () => {
    let updatedFavorites;

    if (isFavorite) {
      // Remove from favorites
      updatedFavorites = favorites.filter(
        (favorite) => favorite.id !== item.id
      );
    } else {
      // Add to favorites
      updatedFavorites = [...favorites, item];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    window.location.reload();
  };

  return (
    <li className={classes.item} data-test="meet-up-item">
      <Card>
        <div className={classes.image}>
          <img src={item.image} alt={item.title} />
        </div>
        <div className={classes.content}>
          <h3>{item.title}</h3>
          <address>{item.address}</address>
          <p>{item.description}</p>
        </div>
        <div className={classes.actions}>
          <button onClick={toggleFavoriteHandler}>
            {isFavorite ? "Remove from favorites" : "Add to favorites"}
          </button>
        </div>
      </Card>
    </li>
  );
}
