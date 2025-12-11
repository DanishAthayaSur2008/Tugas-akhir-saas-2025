// app/about/page.tsx
export default function About() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">About</h1>

      <p className="text-(--text) dark:text-(--text-dark)">
        Aplikasi cuaca ini dibuat untuk memenuhi syarat tugas SaaS (Level A) SMK TI Bazma.
      </p>

      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <div
          className="
            rounded-xl shadow p-6 border
            bg-(--card) dark:bg-(--card-dark)
            border-(--border) dark:border-(--border-dark)
          "
        >
          <h3 className="font-semibold">Fitur</h3>
          <ul className="list-disc ml-6 mt-2 text-sm text-(--text) dark:text-(--text-dark)">
            <li>3 halaman: Home, About, Contact</li>
            <li>Open-Meteo untuk data cuaca</li>
            <li>Login/Signup Email & Google (Firebase)</li>
            <li>Animasi: framer-motion</li>
          </ul>
        </div>

        <div
          className="
            rounded-xl shadow p-6 border
            bg-(--card) dark:bg-(--card-dark)
            border-(--border) dark:border-(--border-dark)
          "
        >
          <h3 className="font-semibold">Teknologi</h3>
          <p className="text-sm mt-2 text-(--text) dark:text-(--text-dark)">
            Next.js (App Router), TypeScript, Tailwind CSS v4, Firebase, Framer Motion.
          </p>
        </div>
      </div>
    </div>
  );
}
