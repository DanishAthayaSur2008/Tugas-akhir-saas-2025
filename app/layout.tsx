// app/layout.tsx
import "../styles/globals.css";
import { AuthProvider } from "../components/AuthProvider";
import AppShell from "../components/AppShell";

export const metadata = {
  title: "WeatherWeb",
  description: "Aplikasi cuaca",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Tetap pasang className="dark" di html → semua halaman full dark mode
    <html lang="id" className="dark" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <AppShell>{children}</AppShell>
        </AuthProvider>
      </body>
    </html>
  );
}
