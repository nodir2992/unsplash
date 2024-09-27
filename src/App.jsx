//  RRD
import { RouterProvider, createBrowserRouter } from "react-router-dom";
//  LAYOUT
import MainLayout from "./layout/MainLayout";
//  PAGES
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import ErrorPage from "./pages/error/Error";
import Contact from "./pages/contact/Contact";
import LikedImages from "./pages/likedImages/LikedImages";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/liked-images",
          element: <LikedImages />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
