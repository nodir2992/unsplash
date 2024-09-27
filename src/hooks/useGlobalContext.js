//  REACT
import { useContext } from "react";
//  CONTEXT
import { GlobalContext } from "../context/globalContext";

export function useGlobalContext() {
  const context = useContext(GlobalContext);

  if (context === undefined) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider"
    );
  }

  return context;
}
