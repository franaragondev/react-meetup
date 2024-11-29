import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { FavoritesProvider } from "./contexts/FavoritesContext.js";
import AllMeetupsPage from "./pages/AllMeetupsPage";
import FavoritesPage from "./pages/Favorites";
import NewMeetupsPage from "./pages/NewMeetup";
import MainNavigation from "./components/layout/MainNavigation";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <FavoritesProvider>
      <Router>
        <div data-testid="app">
          <MainNavigation />
          <Layout>
            <Routes>
              <Route path="/" element={<AllMeetupsPage />} />
              <Route path="/favourites" element={<FavoritesPage />} />
              <Route path="/create" element={<NewMeetupsPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </div>
      </Router>
    </FavoritesProvider>
  );
}

export default App;
