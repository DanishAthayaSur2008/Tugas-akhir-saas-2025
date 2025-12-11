"use client";

import { useState } from "react";
import WeatherCard from "../components/WeatherCard";
import ForecastChart from "../components/ForecastChart";
import LoadingDots from "../components/LoadingDots";

type OpenMeteoResp = {
  latitude: number;
  longitude: number;
  current_weather?: {
    temperature: number;
    windspeed: number;
    weathercode: number;
    time: string;
  };
  daily?: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
};

type ForecastItem = {
  date: string;
  max: number;
  min: number;
};

export default function Home() {
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState<OpenMeteoResp | null>(null);
  const [label, setLabel] = useState<string>("");
  const [forecast, setForecast] = useState<ForecastItem[]>([]);
  const [err, setErr] = useState<string | null>(null);

  async function fetchWeather(lat: number, lon: number, labelName?: string) {
    setErr(null);
    setLoading(true);

    try {
      const r = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
      );
      const json: OpenMeteoResp = await r.json();

      setWeather(json);
      setLabel(labelName ?? `${lat.toFixed(3)},${lon.toFixed(3)}`);

      if (json.daily) {
        const arr: ForecastItem[] = json.daily.time.map((date, i) => ({
          date,
          max: json.daily!.temperature_2m_max[i],
          min: json.daily!.temperature_2m_min[i],
        }));
        setForecast(arr);
      } else {
        setForecast([]);
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_e) {
      setErr("Gagal mengambil data cuaca.");
    } finally {
      setLoading(false);
    }
  }

  async function onSearch(e?: React.FormEvent) {
    if (e) e.preventDefault();
    setErr(null);

    if (!q) return setErr("Masukkan nama kota atau koordinat lat,lon");

    const parts = q.split(",").map((s) => s.trim());
    if (parts.length === 2 && !isNaN(Number(parts[0])) && !isNaN(Number(parts[1]))) {
      fetchWeather(Number(parts[0]), Number(parts[1]));
      return;
    }

    setLoading(true);
    try {
      const geo = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          q
        )}&format=json&limit=1`
      );
      const arr = (await geo.json()) as {
        lat: string;
        lon: string;
        display_name?: string;
      }[];

      if (!arr || arr.length === 0) return setErr("Lokasi tidak ditemukan.");

      const lat = parseFloat(arr[0].lat);
      const lon = parseFloat(arr[0].lon);
      const labelName = arr[0].display_name ?? q;

      fetchWeather(lat, lon, labelName);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
      setErr("Gagal geocoding lokasi.");
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6 text-(--text) dark:text-(--text-dark)">

      {/* SEARCH */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <h1 className="text-3xl font-bold">Cek Cuaca</h1>

        <form onSubmit={onSearch} className="flex gap-2 w-full max-w-2xl">
          <input
            className="
              flex-1 p-2 rounded 
              bg-(--surface) dark:bg-(--surface-dark) 
              text-(--text) dark:text-(--text-dark)
              border border-(--border) dark:border-(--border-dark)
            "
            placeholder="Masukkan kota atau lat,lon"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />

          <button
            className="
              px-4 py-2 rounded 
              bg-blue-600 dark:bg-blue-500 
              text-white
            "
          >
            Cari
          </button>
        </form>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="flex items-center gap-2">
          <LoadingDots />
          <span>Loading...</span>
        </div>
      )}

      {/* ERROR */}
      {err && <div className="text-red-500">{err}</div>}

      {/* CURRENT WEATHER */}
      {weather?.current_weather ? (
        <WeatherCard
          title={label}
          temp={weather.current_weather.temperature}
          wind={weather.current_weather.windspeed}
          weatherCode={weather.current_weather.weathercode}
          time={weather.current_weather.time}
          latitude={weather.latitude}
          longitude={weather.longitude}
        />
      ) : (
        <div className="text-slate-500 dark:text-slate-400">
          Belum ada data. Coba cari lokasi.
        </div>
      )}

      {/* FORECAST */}
      {forecast.length > 0 && <ForecastChart data={forecast} />}
    </div>
  );
}
