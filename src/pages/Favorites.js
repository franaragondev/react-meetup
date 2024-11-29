import { useFavorites } from "../contexts/FavoritesContext";
import MeetupItem from "../components/meetups/MeetupItem";
import classes from "./../components/meetups/MeetupList.module.css";

export default function FavoritesPage() {
  // Use the custom hook to get the favorites list from the context
  const { favorites } = useFavorites();

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
