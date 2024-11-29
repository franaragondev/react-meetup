import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AllMeetupsPage from "./pages/AllMeetupsPage";
import FavoritesPage from "./pages/Favorites";
import NewMeetupsPage from "./pages/NewMeetup";
import MainNavigation from "./components/layout/MainNavigation";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <Router>
      <div data-test="app">
        <MainNavigation />
        <Layout>
          <Routes>
            <Route path="/" element={<AllMeetupsPage />} />
            {/* All Meetups page */}
            <Route path="/favourites" element={<FavoritesPage />} />
            {/* Favorites page */}
            <Route path="/create" element={<NewMeetupsPage />} />
            {/* New Meetup page */}
            <Route path="*" element={<Navigate to="/" replace />} />{" "}
            {/* Redirect to '/' for any unmatched route */}
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
