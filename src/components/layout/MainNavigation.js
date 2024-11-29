import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useFavorites } from "../../contexts/FavoritesContext";
import {
  ALL_MEETUP_PAGE,
  FAVORITES_PAGE,
  NEW_MEETUP_PAGE,
} from "../../utils/constants";
import classes from "./MainNavigation.module.css";

export default function MainNavigation({ setPage }) {
  const { favorites } = useFavorites();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header
      className={`${classes.header} ${
        isVisible ? classes.visible : classes.hidden
      }`}
      data-testid="main-navigation"
    >
      <div className={classes.logo}>React Meetups</div>
      <nav>
        <ul>
          <li>
            <Link
              to="/"
              className={location.pathname === "/" ? classes.active : ""}
              onClick={() => setPage(ALL_MEETUP_PAGE)}
            >
              All Meetups
            </Link>
          </li>

          <li>
            <Link
              to="/create"
              className={location.pathname === "/create" ? classes.active : ""}
              onClick={() => setPage(NEW_MEETUP_PAGE)}
            >
              Add New Meetup
            </Link>
          </li>

          <li>
            <Link
              to="/favourites"
              className={
                location.pathname === "/favourites" ? classes.active : ""
              }
              onClick={() => setPage(FAVORITES_PAGE)}
            >
              My Favorites
              <span className={classes.badge}>
                {favorites.length || 0} {/* Display the count of favorites */}
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
