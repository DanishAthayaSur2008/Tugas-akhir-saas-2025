# 🌦️ **WeatherWeb — Modern Weather App**

### *Built with Next.js, Firebase, Open-Meteo & Tailwind CSS 4*

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/TailwindCSS-4.0-06B6D4?style=for-the-badge&logo=tailwindcss" />
  <img src="https://img.shields.io/badge/Firebase-Auth-FFCA28?style=for-the-badge&logo=firebase" />
  <img src="https://img.shields.io/badge/OpenMeteo-API-blue?style=for-the-badge" />
</p>

<p align="center">
  <b>WeatherWeb</b> adalah aplikasi cuaca modern yang menampilkan cuaca real-time dan prakiraan 7 hari berbasis Open-Meteo, lengkap dengan autentikasi Firebase dan dark mode yang tersimpan otomatis.
</p>

---

## ✨ **Features**

* 🔍 Pencarian cuaca (nama kota / koordinat lat,lon)
* 🌎 Geocoding otomatis (OpenStreetMap)
* 🌡️ Cuaca real-time (temperature, wind, weather code)
* 📊 Grafik prakiraan 7 hari (Recharts)
* 👤 Login lengkap (Email/Password + Google)
* 📁 Firestore User Profile
* 🧊 Glassmorphism Auth Panel
* 🎨 Full responsive UI
* ⚡ Fast by Next.js App Router

---

## 📁 **Project Structure**

```
/app
 ├── layout.tsx
 ├── page.tsx
/components
 ├── Navbar.tsx
 ├── AuthPanel.tsx
 ├── ThemeToggle.tsx
 ├── WeatherCard.tsx
 ├── ForecastChart.tsx
 ├── LoadingDots.tsx
/lib
 ├── firebase.ts
 ├── users.ts
/public
 ├── google_logo.png
/styles
 ├── globals.css
```

---

## 🚀 **Getting Started**

### 1️⃣ Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 2️⃣ Jalankan development server

```bash
npm run dev
```

Buka:
👉 [http://localhost:3000](http://localhost:3000)

---

## 🔥 **Environment Variables**

Buat file:

```
.env.local
```

Isi dengan Firebase config:

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBmiixvqSKLq3M9GNqSr6mybq8dhjZpUjo
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tugas-akhir-saas.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tugas-akhir-saas
NEXT_PUBLIC_FIREBASE_APP_ID=1:669210359644:web:ed5930ed8cb9e88d8cb399
```

---

## 🛠️ **Tech Stack**

### **Frontend**

* **Next.js 14 (App Router)**
* **TypeScript**
* **Tailwind CSS v4**
* **Recharts**
* **Framer Motion**

### **Backend / Auth**

* **Firebase Authentication**
* **Firestore Database**

### **Weather Data**

* **Open-Meteo Forecast API**
* **OpenStreetMap Nominatim Geocoding API**

---

## 📚 **Learn More**

* 🔗 [https://nextjs.org/docs](https://nextjs.org/docs)
* 🔗 [https://firebase.google.com/docs](https://firebase.google.com/docs)
* 🔗 [https://open-meteo.com](https://open-meteo.com)
* 🔗 [https://tailwindcss.com](https://tailwindcss.com)

---

## 🌍 **Deploy to Production**

Paling mudah deploy via **Vercel**:

👉 [https://vercel.com/new](https://vercel.com/new)

Dokumentasi resmi:
[https://nextjs.org/docs/app/building-your-application/deploying](https://nextjs.org/docs/app/building-your-application/deploying)

---

## ❤️ **Support & Contribution**

Want to contribute?
PRs & issues are always welcome!

Feel free to fork this repo ⭐

---

## 📝 **License**

This project is licensed under the **MIT License**.

---
