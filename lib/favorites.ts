import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export type FavoriteData = {
  uid: string;
  label?: string;
  latitude: number;
  longitude: number;
};

export async function addFavorite(data: FavoriteData) {
  const ref = doc(db, "favorites", data.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      items: [data],
    });
  } else {
    await updateDoc(ref, {
      items: [...(snap.data().items || []), data],
    });
  }
}
