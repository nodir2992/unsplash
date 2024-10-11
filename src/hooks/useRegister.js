//  FIREBASE
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
//  FIREBASE CONFIG
import { auth } from "../firebase/firebaseConfig";
//  TOAST
import { toast } from "react-toastify";
//  CUSTOM HOOKS
import { useGlobalContext } from "./useGlobalContext";

export const useRegister = () => {
  const { dispatch } = useGlobalContext();
  const registerWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        toast.success("Welcome, " + user.displayName);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const registerWithEmail = (displayName, email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        await updateProfile(auth.currentUser, {
          displayName: displayName,
          photoURL: `https://api.dicebear.com/9.x/initials/svg?seed=${displayName}`,
        })
          .then(() => {
            const user = userCredential.user;
            dispatch({ type: "SET_USER", payload: user });
            toast.success("Welcome, " + user.displayName);
          })
          .catch((error) => {
            toast.error(error.message);
          });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return { registerWithGoogle, registerWithEmail };
};
