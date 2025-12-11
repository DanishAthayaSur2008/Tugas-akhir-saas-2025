"use client";

import { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Mengirim...");

    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify({ name, message }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      setStatus("Pesan berhasil dikirim!");
      setName("");
      setMessage("");
    } else {
      setStatus("Gagal mengirim pesan.");
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Contact</h1>
      <p>Kontak untuk keperluan tugas: upload link GitHub, dokumentasi, atau hubungi guru.</p>

      <form className="max-w-lg panel space-y-3" onSubmit={handleSubmit}>
        <div>
          <label className="text-sm">Nama</label>
          <input
            className="w-full mt-1 p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="text-sm block">Pesan</label>
          <textarea
            className="w-full mt-1 p-2 border rounded"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>

        <div>
          <button
            type="submit"
            className="px-4 py-2 rounded text-white bg-blue-600 hover:bg-blue-700 transition"
          >
            Kirim
          </button>
        </div>

        {status && <p className="text-sm mt-2">{status}</p>}
      </form>
    </div>
  );
}
