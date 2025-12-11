"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "./AuthProvider";
import { addFavorite } from "../lib/favorites";

type Props = {
  title?: string;
  temp: number;
  wind?: number;
  weatherCode?: number;
  time?: string;
  latitude?: number;
  longitude?: number;
};

type FavoritePayload = {
  uid: string;
  label?: string;
  latitude: number;
  longitude: number;
};

export default function WeatherCard({
  title = "Lokasi",
  temp,
  wind,
  weatherCode,
  time,
  latitude,
  longitude,
}: Props) {
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState<string | null>(null);

  async function handleSave() {
    if (!user) return;

    if (latitude == null || longitude == null) {
      setSavedMsg("Koordinat tidak tersedia");
      return;
    }

    setSaving(true);
    setSavedMsg(null);

    try {
      const payload: FavoritePayload = {
        uid: user.uid,
        label: title,
        latitude,
        longitude,
      };

      await addFavorite(payload);
      setSavedMsg("Tersimpan ke favorit");
    } catch (_e) {
      setSavedMsg("Gagal menyimpan");
    } finally {
      setSaving(false);
      setTimeout(() => setSavedMsg(null), 3000);
    }
  }

  return (
    <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="panel max-w-md">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">{title}</h3>
          {time && <p className="text-sm text-slate-500">{time}</p>}
        </div>
        <div className="text-4xl font-bold">{Math.round(temp)}°C</div>
      </div>

      <div className="mt-4 text-sm text-slate-700">
        <div>Wind: {wind ?? "-"} m/s</div>
        <div>Weather code: {weatherCode ?? "-"}</div>
      </div>

      <div className="mt-4 flex gap-2">
        {user && (
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-3 py-1 bg-primary text-white rounded"
          >
            {saving ? "Menyimpan..." : "Simpan Favorit"}
          </button>
        )}
        {savedMsg && <div className="text-sm text-slate-600 self-center">{savedMsg}</div>}
      </div>
    </motion.div>
  );
}
