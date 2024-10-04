//  RRD
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//  LAYOUT
import MainLayout from "./layout/MainLayout";
//  PAGES
import {
  ErrorPage,
  HomePage,
  AboutPage,
  ContactPage,
  LikedImagesPage,
} from "./pages";
//  ACTIONS
import { action as HomeAction } from "./pages/home/Home";

export default function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <HomePage />,
          action: HomeAction,
        },
        {
          path: "about",
          element: <AboutPage />,
        },
        {
          path: "contact",
          element: <ContactPage />,
        },
        {
          path: "liked-images",
          element: <LikedImagesPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}
