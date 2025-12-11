"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../lib/firebase";
import { onAuthStateChanged, signOut as fbSignOut, User } from "firebase/auth";
import { getUserProfile } from "../lib/users";

export type UserProfile = {
  uid?: string;
  username?: string;
  email?: string;
} | null;

type AuthCtx = {
  user: User | null;
  loading: boolean;
  userProfile: UserProfile;
  logout: () => Promise<void>;
  signOut: () => Promise<void>; // alias biar tidak breaking
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthCtx | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile>(null);

  // Listen ke perubahan auth
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      setLoading(false);

      if (u) {
        const profile = await getUserProfile(u.uid);
        setUserProfile(profile ?? null);
      } else {
        setUserProfile(null);
      }
    });

    return () => unsub();
  }, []);

  // Fungsi logout
  async function logout() {
    try {
      await fbSignOut(auth);
      setUser(null);
      setUserProfile(null);
    } catch (err) {
      console.error("Logout error:", err);
    }
  }

  // Alias agar kode lama tidak rusak
  async function signOut() {
    return logout();
  }

  // Refresh manual data user
  async function refreshUser() {
    if (!auth.currentUser) return;

    const u = auth.currentUser;
    const profile = await getUserProfile(u.uid);

    setUser(u);
    setUserProfile(profile ?? null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        userProfile,
        logout,
        signOut,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
