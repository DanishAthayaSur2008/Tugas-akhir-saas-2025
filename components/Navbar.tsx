"use client";

import Link from "next/link";
import { useState } from "react";
import AuthPanel from "./AuthPanel";
import { useAuth } from "./AuthProvider";

export default function Navbar() {
  const [openAuth, setOpenAuth] = useState(false);
  const { user, userProfile, logout } = useAuth();

  return (
    <header
      className="
        sticky top-0 z-50
        bg-white dark:bg-slate-900
        border-b border-slate-200 dark:border-slate-700
        shadow-sm
      "
    >
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold dark:text-white">
          WeatherWeb
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            href="/about"
            className="text-sm text-slate-700 dark:text-slate-300 hover:underline"
          >
            About
          </Link>

          <Link
            href="/contact"
            className="text-sm text-slate-700 dark:text-slate-300 hover:underline"
          >
            Contact
          </Link>

          {user ? (
            <>
              <Link
                href="/profile"
                className="
                  text-sm px-3 py-1 rounded-md border
                  border-slate-300 dark:border-slate-600
                  text-slate-800 dark:text-slate-200
                  hover:bg-slate-100 dark:hover:bg-slate-700
                  transition
                "
              >
                {userProfile?.username ??
                  user.displayName ??
                  user.email ??
                  "Profile"}
              </Link>

              <button
                onClick={logout}
                className="
                  text-sm px-3 py-1 rounded-md border
                  border-red-400/40 dark:border-red-400/20
                  text-red-600 dark:text-red-300
                  hover:bg-red-100 dark:hover:bg-red-900/40
                  transition
                "
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => setOpenAuth(true)}
              className="
                px-4 py-1 text-sm rounded-full border
                border-slate-300 dark:border-slate-600
                text-slate-800 dark:text-slate-200
                hover:bg-slate-100 dark:hover:bg-slate-700 
                transition
              "
            >
              Login / Signup
            </button>
          )}
        </nav>
      </div>

      {openAuth && <AuthPanel onClose={() => setOpenAuth(false)} />}
    </header>
  );
}
