import { useState, useEffect } from "react";
import {
  ALL_MEETUP_PAGE,
  FAVORITES_PAGE,
  NEW_MEETUP_PAGE,
} from "./../../utils/constants";

import classes from "./MainNavigation.module.css";

export default function MainNavigation({ setPage }) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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
            <a href="/" onClick={() => setPage(ALL_MEETUP_PAGE)}>
              All Meetups
            </a>
          </li>

          <li>
            <a href="/create" onClick={() => setPage(NEW_MEETUP_PAGE)}>
              Add New Meetup
            </a>
          </li>
          <li>
            <a href="/favourites" onClick={() => setPage(FAVORITES_PAGE)}>
              My Favorites
              <span className={classes.badge}>{0}</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
