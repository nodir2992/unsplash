//  FIREBASE
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
//  TOAST
import toast from "react-hot-toast";

export function useLogin() {
  const loginWithEmail = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        toast.success("Welcome, " + user.displayName);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return { loginWithEmail };
}
