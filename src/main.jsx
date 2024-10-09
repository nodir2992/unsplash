import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
//  TOASTER
import { Toaster } from "react-hot-toast";
//  CONTEXT
import { GlobalContextProvider } from "./context/globalContext.jsx";
//  STYLE
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalContextProvider>
      <App />
      <Toaster position="bottom-right" />
    </GlobalContextProvider>
  </StrictMode>,
);
