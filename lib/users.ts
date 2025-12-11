// lib/users.ts
import { db } from "./firebase";
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";

export type UserProfile = {
  uid: string;
  username?: string;
  email?: string;
  createdAt?: any;
  updatedAt?: any;
};

export async function setUserProfile(uid: string, data: Partial<UserProfile>) {
  const ref = doc(db, "users", uid);
  const payload = {
    ...data,
    updatedAt: serverTimestamp(),
  } as any;
  if (data && !(data as any).createdAt) {
    (payload as any).createdAt = serverTimestamp();
  }
  await setDoc(ref, payload, { merge: true });
}

export async function getUserProfile(uid: string) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  return snap.exists() ? (snap.data() as UserProfile) : null;
}

export async function updateUserProfile(uid: string, data: Partial<UserProfile>) {
  const ref = doc(db, "users", uid);
  await updateDoc(ref, { ...data, updatedAt: serverTimestamp() } as any);
}
