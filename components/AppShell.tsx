// components/AppShell.tsx
"use client";

import { useAuth } from "./AuthProvider";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AuthPanel from "./AuthPanel";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="mb-2">Memeriksa status login...</div>
          <div className="w-8 h-8 border-2 border-slate-300 rounded-full loader" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen">
        <AuthPanel onClose={() => {}} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-5xl mx-auto p-6 w-full">{children}</main>
      <Footer />
    </div>
  );
}
