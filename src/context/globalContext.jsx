//  REACT
import { createContext, useEffect, useReducer } from "react";
//  CUSTOM HOOKS
import { useCollection } from "../hooks/useCollection";
//  CONSTANT
import {
  COLLECTION_DOWNLOADED_IMAGES,
  COLLECTION_LIKED_IMAGES,
} from "../constant/collectionName";

const initialState = {
  likedImages: [],
  downloadedImages: [],
  user: null,
};

export const GlobalContext = createContext(undefined);

const changeState = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_LIKED_IMAGES":
      return { ...state, likedImages: payload };
    case "SET_DOWNLOADED_IMAGE":
      return { ...state, downloadedImages: payload };
    case "SET_USER":
      return { ...state, user: payload };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};

export function GlobalContextProvider({ children }) {
  const [state, dispatch] = useReducer(changeState, initialState);
  const { data: likedImages } = useCollection(COLLECTION_LIKED_IMAGES);
  const { data: downloadedImages } = useCollection(
    COLLECTION_DOWNLOADED_IMAGES,
  );

  useEffect(() => {
    if (likedImages && state.user) {
      const data = likedImages.filter(
        (item) => item.currentUserId == state.user.uid,
      );

      dispatch({ type: "SET_LIKED_IMAGES", payload: data });
    }
  }, [likedImages, state.user]);

  useEffect(() => {
    if (downloadedImages && state.user) {
      const data = downloadedImages.filter(
        (item) => item.currentUserId == state.user.uid,
      );

      dispatch({ type: "SET_DOWNLOADED_IMAGE", payload: data });
    }
  }, [downloadedImages, state.user]);

  // console.log(state);

  return (
    <GlobalContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}
