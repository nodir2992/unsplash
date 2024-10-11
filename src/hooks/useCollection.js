//  FIREBASE
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
//  REACT
import { useEffect, useState } from "react";

export const useCollection = (collectionName, user) => {
  const [data, setDate] = useState(null);

  useEffect(() => {
    onSnapshot(collection(db, collectionName), (querySnapshot) => {
      let queryData = [];
      querySnapshot.forEach((doc) => {
        queryData.push({ id: doc.id, ...doc.data() });
      });

      setDate(queryData);
    });
  }, []);

  return { data };
};
