//  REACT
import { createContext, useEffect, useReducer } from "react";

const initialState = {
  colors: [
    "bg-gray-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-orange-500",
    "bg-fuchsia-500",
  ],
  selectedColor: "bg-gray-500",
  pageNumber: 1,
  images: [],
  likedImages: [],
};

export const GlobalContext = createContext(undefined);

const changeState = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "CHANGE_SELECTED_COLOR":
      return { ...state, selectedColor: payload };
    case "SET_PAGE_NUMBER":
      return { ...state, pageNumber: payload };
    case "ADD_IMAGES":
      return { ...state, images: [...state.images, ...payload] };
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
  return (
    <GlobalContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}
