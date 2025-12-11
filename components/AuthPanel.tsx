/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { auth, googleProvider } from "../lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { setUserProfile } from "../lib/users";

export default function AuthPanel({ onClose }: { onClose: () => void }) {
  const [isReg, setIsReg] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // 🔥 Fungsi format error
  function prettyErrorMessage(code: string) {
    const wrongCredentials = [
      "auth/invalid-email",
      "auth/wrong-password",
      "auth/user-not-found",
    ];
    if (wrongCredentials.includes(code)) {
      return "Email atau Password salah!";
    }
    return "Terjadi kesalahan. Coba lagi.";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);

    try {
      if (isReg) {
        const cred = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await updateProfile(cred.user, { displayName: username });

        await setUserProfile(cred.user.uid, {
          uid: cred.user.uid,
          username,
          email,
        });

        onClose();
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        onClose();
      }
    } catch (e: any) {
      setErr(prettyErrorMessage(e.code));
    } finally {
      setBusy(false);
    }
  }

  async function handleGoogle() {
    setBusy(true);
    try {
      const cred = await signInWithPopup(auth, googleProvider);
      await setUserProfile(cred.user.uid, {
        uid: cred.user.uid,
        username: cred.user.displayName ?? "",
        email: cred.user.email ?? "",
      });
      onClose();
    } catch (e: any) {
      setErr(prettyErrorMessage(e.code));
    } finally {
      setBusy(false);
    }
  }

  const inputStyle =
    "mt-1 w-full px-3 py-2 text-sm rounded-lg outline-none transition " +
    "bg-white/40 dark:bg-black/30 backdrop-blur-md " +
    "border border-white/30 dark:border-white/20 " +
    "text-gray-900 dark:text-gray-100 " +
    "placeholder-gray-600 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-400";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        onClick={onClose}
        className="absolute inset-0 backdrop-blur-sm bg-black/40"
      />

      <motion.div
        initial={false}
        animate={{ opacity: 1, scale: 1 }}
        className="
          relative w-full max-w-md p-8 rounded-2xl shadow-2xl
          bg-white/30 dark:bg-black/30 backdrop-blur-2xl
          border border-white/20 dark:border-white/10
          text-gray-900 dark:text-gray-100
        "
      >
        <h2 className="text-2xl font-semibold mb-1">
          {isReg ? "Sign Up" : "Login"}
        </h2>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-6">
          {isReg ? "Buat akun baru" : "Masuk untuk melanjutkan"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* EMAIL */}
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              placeholder="masukan Email anda"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={inputStyle}
            />
          </div>

          {/* USERNAME */}
          {isReg && (
            <div>
              <label className="text-sm font-medium">Username</label>
              <input
                placeholder="nama pengguna"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className={inputStyle}
              />
            </div>
          )}

          {/* PASSWORD */}
          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="masukan password anda"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={inputStyle}
            />
          </div>

          {err && <div className="text-sm text-red-600">{err}</div>}

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={busy}
            className="
              w-full py-2 text-sm font-medium rounded-lg
              bg-indigo-600/90 hover:bg-indigo-700/90
              text-white backdrop-blur-md
              transition disabled:opacity-50
            "
          >
            {busy ? "Memproses..." : isReg ? "Daftar" : "Masuk"}
          </button>

          {/* GOOGLE SIGN IN */}
          <button
            type="button"
            disabled={busy}
            onClick={handleGoogle}
            className="
              w-full py-2 text-sm font-medium rounded-lg mt-2
              flex items-center justify-center gap-2
              bg-white/40 dark:bg-white/10
              border border-white/30 dark:border-white/20
              backdrop-blur-md
              hover:bg-white/50 dark:hover:bg-white/20
              transition
            "
          >
            <img src="/google_logo.png" alt="Google" className="w-5 h-5" />
            Lanjutkan dengan Google
          </button>

          <p className="text-sm text-center mt-4 text-gray-900 dark:text-gray-300">
            {isReg ? (
              <>
                Sudah punya akun?{" "}
                <button
                  type="button"
                  onClick={() => setIsReg(false)}
                  className="text-indigo-600 dark:text-indigo-400"
                >
                  Login
                </button>
              </>
            ) : (
              <>
                Belum punya akun?{" "}
                <button
                  type="button"
                  onClick={() => setIsReg(true)}
                  className="text-indigo-600 dark:text-indigo-400"
                >
                  Sign Up
                </button>
              </>
            )}
          </p>
        </form>
      </motion.div>
    </div>
  );
}
