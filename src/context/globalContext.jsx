//  REACT
import { createContext, useEffect, useReducer } from "react";

const initialState = {
  likedImages: [],
  downloadedImages: [],
  user: null,
};

export const GlobalContext = createContext(undefined);

const changeState = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "TOGGLE_LIKED_IMAGE":
      return { ...state, likedImages: payload };
    case "TOGGLE_DOWNLOADED_IMAGE":
      return { ...state, downloadedImages: payload };
    case "SET_USER":
      return { ...state, user: payload };
    default:
      return state;
  }
};

const getInitialState = () => {
  const data = localStorage.getItem("global");
  return data ? JSON.parse(data) : initialState;
};

export function GlobalContextProvider({ children }) {
  const [state, dispatch] = useReducer(changeState, getInitialState());

  useEffect(() => {
    // localStorage.setItem("global", JSON.stringify(state));
  }, [state]);

  // console.log(state);

  return (
    <GlobalContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}
