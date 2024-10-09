//  REACT
import { useEffect, useState } from "react";
//  RRD
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
//  LAYOUT
import MainLayout from "./layout/MainLayout";
//  PAGES
import {
  ErrorPage,
  HomePage,
  AboutPage,
  ContactPage,
  LikedImagesPage,
  ImageInfo,
  DownloadedImages,
  LoginPage,
  RegisterPage,
} from "./pages";
//  ACTIONS
import { action as HomeAction } from "./pages/home/Home";
import { action as RegisterAction } from "./pages/auth/Register";
import { action as LoginAction } from "./pages/auth/Login";
//  COMPONENTS
import { PrivateRoute } from "./components";
//  FIREBASE
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
//  CUSTOM HOOKS
import { useGlobalContext } from "./hooks/useGlobalContext";

export default function App() {
  const { dispatch, user } = useGlobalContext();
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch({ type: "SET_USER", payload: user });
      setAuthReady(true);
    });
  }, []);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <PrivateRoute Component={HomePage} />,
          action: HomeAction,
        },
        {
          path: "about",
          element: <PrivateRoute Component={AboutPage} />,
        },
        {
          path: "contact",
          element: <PrivateRoute Component={ContactPage} />,
        },
        {
          path: "liked-images",
          element: <PrivateRoute Component={LikedImagesPage} />,
        },
        {
          path: "downloaded-images",
          element: <PrivateRoute Component={DownloadedImages} />,
        },
        {
          path: "/photo-info/:id",
          element: <PrivateRoute Component={ImageInfo} />,
        },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <LoginPage />,
      action: LoginAction,
    },
    {
      path: "/register",
      element: user ? <Navigate to="/" /> : <RegisterPage />,
      action: RegisterAction,
    },
  ]);

  return <>{authReady && <RouterProvider router={routes} />}</>;
}
