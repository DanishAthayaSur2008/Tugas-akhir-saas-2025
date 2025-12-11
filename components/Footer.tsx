// components/Footer.tsx
export default function Footer() {
  return (
    <footer
      className="
        mt-10 border-t
        bg-(--surface) dark:bg-(--surface-dark)
        border-(--border) dark:border-(--border-dark)
      "
    >
      <div
        className="
          max-w-5xl mx-auto px-4 py-6 text-center text-sm
          text-(--text) dark:text-(--text-dark)
        "
      >
        © {new Date().getFullYear()} WeatherWeb — Tugas SaaS SMK TI Bazma
      </div>
    </footer>
  );
}
