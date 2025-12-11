"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../../components/AuthProvider";
import { updateProfile, updateEmail, updatePassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { setUserProfile } from "../../lib/users";

export default function ProfilePage() {
  const { user, refreshUser, userProfile } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!user) return;
    setUsername(userProfile?.username ?? user.displayName ?? "");
    setEmail(user.email ?? "");
  }, [user, userProfile]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setStatus(null);

    try {
      if (username !== user?.displayName) {
        await updateProfile(user!, { displayName: username });
      }

      if (email !== user?.email && auth.currentUser) {
        await updateEmail(auth.currentUser, email);
      }

      if (newPassword.length >= 6 && auth.currentUser) {
        await updatePassword(auth.currentUser, newPassword);
      }

      await setUserProfile(user!.uid, { username, email });
      await refreshUser();
      setStatus("Profil berhasil diperbarui!");
    } catch (e: unknown) {
      if (e instanceof Error) setStatus(e.message);
      else setStatus("Gagal memperbarui profil");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">Profile Settings</h1>

      <form
        onSubmit={handleSave}
        className="rounded-xl bg-white dark:bg-gray-900 shadow-md border border-gray-200 dark:border-gray-700 p-6 space-y-5"
      >
        <div>
          <label className="text-sm font-medium">Username</label>
          <input
            className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-3 py-2 text-sm"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-3 py-2 text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Password Baru</label>
          <input
            type="password"
            className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-3 py-2 text-sm"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Kosongkan jika tidak diubah"
          />
        </div>

        {status && (
          <div className="text-sm text-gray-600 dark:text-gray-300">{status}</div>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={busy}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm transition disabled:opacity-60"
          >
            {busy ? "Menyimpan..." : "Simpan Perubahan"}
          </button>

          <button
            type="button"
            onClick={() => setStatus(null)}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-sm"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
