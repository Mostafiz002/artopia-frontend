import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "../provider/PrivateRoute";
import ExploreArtworks from "../pages/ExploreArtworks";
import AddArtworks from "../pages/AddArtworks";
import MyGallery from "../pages/MyGallery";
import MyFavorites from "../pages/MyFavorites";
import ArtworkDetails from "../components/ArtworkDetails";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      {
        path: "/explore-artworks",
        element: <ExploreArtworks />,
      },
      {
        path: "/add-artworks",
        element: (
          <PrivateRoute>
            <AddArtworks />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-gallery",
        element: (
          <PrivateRoute>
            <MyGallery />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-favorites",
        element: (
          <PrivateRoute>
            <MyFavorites />
          </PrivateRoute>
        ),
      },
      {
        path: "/artwork-details/:id",
        element: (
          <PrivateRoute>
            <ArtworkDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
