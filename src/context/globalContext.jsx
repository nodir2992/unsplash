//  REACT
import { createContext, useEffect, useReducer } from "react";

const initialState = {
  pageNumber: 1,
  images: [],
  likedImages: [],
  searchParams: "",
};

export const GlobalContext = createContext(undefined);

const changeState = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_PAGE_NUMBER":
      return { ...state, pageNumber: payload };
    case "SET_SEARCH_PARAMS":
      return { ...state, searchParams: payload };
    case "ADD_IMAGES":
      return { ...state, images: [...state.images, ...payload] };
    case "SEARCH_IMAGES":
      return { ...state, images: payload };
    case "TOGGLE_LIKED_IMAGE":
      return { ...state, likedImages: payload };
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
