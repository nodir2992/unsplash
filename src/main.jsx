import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
//  TOAST
import { ToastContainer } from "react-toastify";
//  CONTEXT
import { GlobalContextProvider } from "./context/globalContext.jsx";
//  STYLE
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalContextProvider>
      <App />
      <ToastContainer position="bottom-right" />
    </GlobalContextProvider>
  </StrictMode>,
);
