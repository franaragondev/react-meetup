import { useFavorites } from "../../contexts/FavoritesContext"; // Import the context
import classes from "./MeetupItem.module.css";
import Card from "../ui/Card";

export default function MeetupItem({ item }) {
  const { favorites, addFavorite, removeFavorite } = useFavorites(); // Access the context
  const isFavorite = favorites.some((favorite) => favorite.id === item.id);

  const toggleFavoriteHandler = () => {
    if (isFavorite) {
      removeFavorite(item); // Remove from favorites using context
    } else {
      addFavorite(item); // Add to favorites using context
    }
  };

  return (
    <li className={classes.item} data-testid="meet-up-item">
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
