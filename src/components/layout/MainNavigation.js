import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ALL_MEETUP_PAGE,
  FAVORITES_PAGE,
  NEW_MEETUP_PAGE,
} from "./../../utils/constants";

import classes from "./MainNavigation.module.css";

export default function MainNavigation({ setPage }) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const location = useLocation(); // Get actual location

  useEffect(() => {
    // Detect scroll direction
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // Scrolling down: hide header
        setIsVisible(false);
      } else {
        // Scrolling up: show header
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    // Add the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component is unmounted to avoid unnecessary executions
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header
      className={`${classes.header} ${
        isVisible ? classes.visible : classes.hidden
      }`}
      data-test="navigation-header"
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
                {JSON.parse(localStorage.getItem("favorites"))?.length
                  ? JSON.parse(localStorage.getItem("favorites"))?.length
                  : 0}
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
