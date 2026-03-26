# Eco Nusantara 🌿

[![Status](https://img.shields.io/badge/Status-Prototype-brightgreen?style=for-the-badge)](https://github.com/michaeljuliosonda/eco-nusantara)
[![Tech](https://img.shields.io/badge/Tech-Vanilla_JS_--_Tailwind-blue?style=for-the-badge)](https://github.com/michaeljuliosonda/eco-nusantara)

> _"Satu Klik, Satu Pohon, Seribu Harapan untuk Indonesia."_

## Informasi Proyek

**Nama Institusi**  
Universitas Kristen Satya Wacana (UKSW)

**Anggota Tim**

- **Ketua** : Michael Julio Sonda
- **Anggota** : Marshell Leota Timang

---

## Deskripsi Karya

**EcoNusantara** adalah platform reboisasi komunitas berbasis web yang mengintegrasikan teknologi web ringan dengan sistem transparansi dan akuntabilitas tinggi. Platform ini bertujuan mendemokrasikan partisipasi masyarakat dalam pemulihan ekosistem hutan Indonesia melalui mekanisme donasi, monitoring real-time, dan pelaporan yang terukur.

### Latar Belakang

Indonesia masih menghadapi tekanan deforestasi yang signifikan. Berdasarkan data resmi Kementerian Kehutanan, deforestasi netto tahun 2024 mencapai **175,4 ribu hektare**, yang berasal dari deforestasi bruto sebesar 216,2 ribu hektare dikurangi reforestasi seluas 40,8 ribu hektare. Mayoritas deforestasi bruto (92,8%) terjadi pada hutan sekunder, dengan 69,3% berada di dalam kawasan hutan.

Dampak ekologis dan sosial dari deforestasi ini sangat luas, meliputi penurunan biodiversitas, peningkatan emisi gas rumah kaca, gangguan siklus hidrologi, serta ancaman langsung terhadap mata pencaharian masyarakat adat dan petani di sekitar kawasan hutan. Meskipun kesadaran lingkungan masyarakat terus meningkat, tingkat partisipasi aktif masih rendah. Hambatan utama yang dihadapi adalah kurangnya transparansi pengelolaan dana, kesulitan memantau hasil penanaman secara real-time, minimnya bukti kontribusi yang dapat diverifikasi, serta akses teknologi yang belum inklusif bagi masyarakat luas.

EcoNusantara hadir sebagai solusi teknologi untuk menjembatani kesenjangan tersebut, dengan menyediakan platform digital yang mudah diakses, transparan, dan berorientasi komunitas.

**Sumber:** [Kementerian Kehutanan – Hutan dan Deforestasi Indonesia Tahun 2024](https://www.kehutanan.go.id/news/article-10)

### Tujuan

Proyek ini bertujuan untuk:

- Memfasilitasi partisipasi masyarakat secara luas dalam aksi reboisasi melalui platform yang transparan, terukur, dan akuntabel.
- Meningkatkan literasi lingkungan masyarakat melalui edukasi interaktif, kuis harian, dan asisten AI EcoBot berbasis Groq.
- Mewujudkan akuntabilitas donasi dengan peta penanaman interaktif (Leaflet.js), dashboard transparansi real-time, serta laporan audit berbasis PDF.
- Memberdayakan UMKM lokal melalui Eco Market dengan mekanisme ekonomi sirkular yang mendukung pendanaan reboisasi berkelanjutan.
- Mengembangkan aplikasi web yang ringan, cepat, dan inklusif menggunakan pendekatan “Back to Basics” (HTML, Tailwind CSS, dan Vanilla JavaScript) tanpa ketergantungan framework berat.

### Manfaat

- **Bagi Masyarakat** : Kemudahan dalam mengadopsi pohon, memperoleh sertifikat digital instan, sistem gamifikasi Eco Points, serta akses ke produk UMKM ramah lingkungan.
- **Bagi Lingkungan** : Percepatan reboisasi di lokasi kritis dengan monitoring real-time melalui peta interaktif dan indikator survival rate.
- **Bagi UMKM Lokal** : Peningkatan visibilitas pasar dan pendapatan, sekaligus kontribusi langsung terhadap dana reboisasi berkelanjutan.
- **Bagi Dunia Pendidikan** : Menjadi model implementasi nyata pengembangan aplikasi web, integrasi artificial intelligence, dan penerapan teknologi untuk menyelesaikan permasalahan lingkungan.
- **Bagi Indonesia** : Memberikan dukungan konkret terhadap target nasional rehabilitasi hutan dan pencapaian **Net Zero Emission** melalui gerakan reboisasi yang partisipatif dan berbasis teknologi.

Proyek ini dikembangkan dengan filosofi **"Back to Basics"** agar aplikasi tetap ringan, cepat diakses, dan tidak membebani pengguna. Pada tahap prototype, seluruh data dikelola menggunakan `localStorage` sebagai simulasi database client-side.

---

## Daftar Isi

1. [Fitur Unggulan](#fitur-unggulan)
1. [Tech Stack](#tech-stack)
1. [Struktur File](#struktur-file)
1. [Cara Menjalankan](#cara-menjalankan)
1. [Akun Default](#akun-default)
1. [Arsitektur & Shared Logic](#arsitektur--shared-logic-appjs)
1. [localStorage Schema](#localstorage-schema)
1. [Detail Setiap Halaman & Screenshot](#detail-setiap-halaman--screenshot)
1. [Sistem Eco Points](#sistem-eco-points)
1. [Fitur PDF Generator](#fitur-pdf-generator)
1. [EcoBot AI](#ecobot-ai-groq)
1. [Internasionalisasi i18n](#internasionalisasi-i18n)
1. [Peta Penanaman](#peta-penanaman-leaflet)
1. [Catatan Pengembangan](#catatan-pengembangan)

---

## Fitur Unggulan

- _🌱 Smart Donation System:_ Adopsi pohon di berbagai titik kritis Indonesia dengan sertifikat digital instan sebagai bukti kontribusi nyata.
- _🗺️ Interactive Planting Map:_ Monitoring lokasi penanaman secara real-time menggunakan _Leaflet.js_ di berbagai wilayah konservasi terpantau.
- _🤖 EcoBot AI:_ Asisten cerdas berbasis LLM (_Groq API_) yang siap menjawab pertanyaan seputar lingkungan, krisis iklim, dan reboisasi secara interaktif.
- _🤝 UMKM Partnership & Integration:_ Kolaborasi strategis dengan pelaku usaha lokal untuk menyediakan produk ramah lingkungan, memperkuat ekonomi sirkular masyarakat di sekitar area penanaman.
- _🛍️ Eco Market:_ Digital marketplace khusus produk UMKM hijau yang menyisihkan 10% keuntungan dari setiap transaksi untuk dana reboisasi berkelanjutan.
- _📊 Transparency Dashboard:_ Laporan alokasi dana dan audit keuangan real-time yang dapat diunduh dalam format _PDF_ secara transparan.
- _🏆 Eco Rewards:_ Sistem gamifikasi (_Eco Points_) yang dapat ditukarkan dengan produk eksklusif atau dikonversi kembali menjadi bibit pohon tambahan.

## Tech Stack

| Library / Tool | Versi                | Kegunaan                                  |
| -------------- | -------------------- | ----------------------------------------- |
| Tailwind CSS   | CDN                  | Styling utility-first                     |
| Lucide Icons   | CDN                  | Icon set                                  |
| SweetAlert2    | v11                  | Modal & notifikasi                        |
| Leaflet.js     | v1.9.4               | Peta interaktif                           |
| Chart.js       | CDN                  | Grafik admin & transparansi               |
| jsPDF          | v2.5.1               | Generate PDF (invoice, sertifikat, audit) |
| Swiper.js      | v10                  | Carousel (hero, testimoni, about)         |
| CountUp.js     | v2.0.0               | Animasi angka statistik                   |
| Groq API       | llama-3.3-70b        | AI chatbot EcoBot                         |
| Google Fonts   | Inter + Merriweather | Tipografi                                 |

---

## Struktur File

```
eco-nusantara/
├── index.html          → Landing page utama
├── about.html          → Tentang misi & galeri before-after
├── login.html          → Halaman login
├── register.html       → Halaman registrasi
├── dashboard.html      → Dashboard personal user
├── admin.html          → Panel admin (protected)
├── donasi.html         → Form adopsi pohon
├── peta.html           → Peta penanaman interaktif
├── events.html         → Agenda volunteer
├── komunitas.html      → Komunitas & leaderboard
├── edukasi.html        → Artikel & kuis harian
├── marketplace.html    → Eco Market (produk UMKM)
├── mitra.html          → Pendaftaran mitra UMKM
├── rewards.html        → Penukaran Eco Points
├── transparansi.html   → Laporan keuangan publik
├── kontak.html         → Form kontak
├── settings.html       → Pengaturan akun
├── screenshots/        → Folder screenshot (buat manual)
├── js/
│   └── app.js          → Shared logic (navbar, footer, auth, chatbot, dll)
└── css/
    └── styles.css      → Custom styles + CSS variables
```

---

## Cara Menjalankan

Tidak memerlukan instalasi apapun. Cukup buka langsung di browser:

```
Buka index.html di browser
```

Atau gunakan Live Server di VS Code untuk hot-reload:

```
Klik kanan index.html → "Open with Live Server"
```

> Semua dependensi di-load via CDN. Pastikan koneksi internet aktif saat pertama kali membuka.

---

## Akun Default

Akun berikut sudah di-seed otomatis oleh `initStorage()` di `app.js` saat pertama kali halaman dibuka:

| Role  | Email                   | Password   |
| ----- | ----------------------- | ---------- |
| Admin | `admin@econusantara.id` | `admin123` |
| User  | `user@test.com`         | `password` |

### Membuat Akun Admin Baru

Daftar via `register.html`, lalu ubah role di DevTools Console:

```js
let users = JSON.parse(localStorage.getItem('users'));
let idx = users.findIndex((u) => u.email === 'email@kamu.com');
users[idx].role = 'admin';
localStorage.setItem('users', JSON.stringify(users));
```

---

## Arsitektur & Shared Logic (app.js)

`js/app.js` adalah file inti yang di-load di semua halaman. Berisi:

| Fungsi                        | Deskripsi                                           |
| ----------------------------- | --------------------------------------------------- |
| `initStorage()`               | Seed data awal ke localStorage jika belum ada       |
| `getCurrentUser()`            | Ambil objek user yang sedang login                  |
| `isLoggedIn()`                | Cek status login (boolean)                          |
| `protectRoute()`              | Redirect ke login jika belum login                  |
| `protectAdminRoute()`         | Redirect ke login jika bukan admin                  |
| `logout()`                    | Hapus `currentUser`, redirect ke `index.html`       |
| `renderNavbar()`              | Render navbar responsif + search + mobile drawer    |
| `renderFooter()`              | Render footer dengan link sosial media              |
| `renderChatbot()`             | Inject tombol & modal EcoBot AI ke DOM              |
| `toggleLang()`                | Toggle bahasa ID/EN, simpan ke localStorage, reload |
| `loadQuiz()`                  | Load pertanyaan kuis harian                         |
| `checkChainAnswer()`          | Validasi jawaban kuis, tambah poin                  |
| `finishQuiz()`                | Simpan poin kuis ke user, tampilkan hasil           |
| `filterEdu()`                 | Filter kartu artikel berdasarkan kategori           |
| `showFullArticle()`           | Tampilkan artikel lengkap via SweetAlert2           |
| `downloadAuditReport()`       | Generate PDF laporan audit keuangan                 |
| `showFieldProgress()`         | Tampilkan laporan lapangan per area                 |
| `downloadEStoreCertificate()` | Generate e-Sertifikat adopsi pohon (PDF landscape)  |
| `initLeaderboard()`           | Render leaderboard donatur di komunitas.html        |
| `joinGroupAlert()`            | Konfirmasi sebelum redirect ke grup WhatsApp        |
| `joinEvent()`                 | Daftarkan user ke event, simpan ke `joinedEvents[]` |
| `filterEventsByDate()`        | Filter event berdasarkan tanggal kalender           |
| `navSearch()`                 | Pencarian halaman via search bar navbar             |

**Hero Slider (IIFE):** Auto-play 5 detik, navigasi prev/next, swipe touch, pause on hover. Teks berubah dinamis per slide via `slideData[]`.

**Sistem Terjemahan:** Objek `translations` berisi key-value `id`/`en`. Navbar membaca `localStorage.lang`.

---

## localStorage Schema

| Key                  | Tipe                    | Isi                                |
| -------------------- | ----------------------- | ---------------------------------- |
| `users`              | `Array<User>`           | Semua akun terdaftar               |
| `currentUser`        | `User`                  | Objek user yang sedang login       |
| `rememberedEmail`    | `string`                | Email untuk fitur "Ingat Saya"     |
| `rememberedPassword` | `string`                | Password untuk fitur "Ingat Saya"  |
| `newsletters`        | `Array<string>`         | Daftar email subscriber newsletter |
| `umkm_queue`         | `Array<UMKMSubmission>` | Antrian pengajuan produk mitra     |
| `lang`               | `"id" \| "en"`          | Bahasa aktif                       |

```json
{
  "id": 1700000000000,
  "name": "Nama Lengkap",
  "email": "user@email.com",
  "password": "password123",
  "phone": "08123456789",
  "role": "user",
  "points": 150,
  "treesAdopted": 3,
  "donations": [
    {
      "date": "2026-03-25T10:00:00.000Z",
      "amount": 150000,
      "trees": 3,
      "location": "Muara Gembong Mangrove"
    }
  ],
  "joinedEvents": [
    {
      "name": "Aksi Tanam 1.000 Mangrove",
      "date": "2026-03-25",
      "location": "Pantai Muara Gembong"
    }
  ]
}
```

---

## Detail Setiap Halaman & Screenshot

=======

## Alur Lengkap Per Role

### 1. Guest (Belum Login)

```
index.html
  ├── Hero slider 4 slide (auto-play 5 detik, swipe support)
  ├── Impact counter: 124.536 pohon | 2.615 ton CO2 | 842 petani
  ├── Preview 3 event mendatang → events.html
  ├── Testimoni carousel (Swiper.js)
  ├── Navbar: Home, Peta, Donasi, Edukasi, Eco Market, Transparansi, Events
  ├── Search bar navbar (fuzzy search ke semua halaman)
  └── EcoBot AI (floating button kanan bawah)



donasi.html (tanpa login)
  ├── Form tampil dengan field nama & email (guest mode)
  ├── Peringatan kuning: "Donasi sebagai Anonim"
  ├── Pilih area penanaman (6 opsi + "Terserah Tim")
  ├── Pilih jumlah: 1/3/10 pohon atau custom nominal
  ├── Tipe: Sekali Bayar atau Bulanan (Recurring)
  ├── Metode: QRIS / BCA VA / Mandiri VA / Kartu Kredit
  ├── Simulasi loading 1.5 detik → sukses
  ├── Data TIDAK tersimpan ke localStorage (guest)
  └── Download invoice PDF (jsPDF)

peta.html
  ├── Peta Leaflet.js (OpenStreetMap)
  ├── 5 marker lokasi: Muara Gembong, Lembang, Leuser, Merbabu, Kalimantan
  ├── Warna marker: merah (kritis), kuning (pemulihan), hijau (sukses)
  ├── Popup per marker: foto, survival rate, jumlah pohon, tombol adopsi
  ├── Filter: provinsi + jenis pohon (checkbox)
  └── Klik "Adopsi Pohon di Sini" → redirect ke donasi.html?area=...

register.html
  ├── Form: nama, telepon, email, password, konfirmasi password
  ├── Validasi: password min 6 karakter, password match, email unik
  ├── Simpan ke localStorage users[]
  ├── Auto-login setelah daftar
  └── Redirect ke dashboard.html
```

---

### 🏠 Landing Page — `index.html`

![index](gambar/gambar1.png)

- Hero slider 4 slide (auto-play 5 detik, swipe support, teks dinamis per slide)
- Impact counter animasi: 124.536 pohon | 2.615 ton CO2 | 842 petani
- Preview 3 event mendatang → `events.html`
- Testimoni carousel (Swiper.js, 3 slide)
- EcoBot AI floating button kanan bawah

---

### 🔐 Login — `login.html`

![index](gambar/gambar2.png)

- Form email + password
- Fitur "Ingat Saya" (simpan ke localStorage)
- Tombol Login Google (simulasi: ambil user terakhir dari `users[]`)
- Redirect: `role=admin` → `admin.html` | `role=user` → `dashboard.html`
- Auto-redirect jika sudah login

---

### 📝 Registrasi — `register.html`

![registrasi](gambar/gambar8.png)

- Form: nama, telepon, email, password, konfirmasi password
- Validasi: password min 6 karakter, password match, email unik
- Auto-login setelah daftar → redirect ke `dashboard.html`

---

### 📊 Dashboard User — `dashboard.html`

![dashboard](gambar/gambar3.png)

- Greeting: "Halo, [Nama]! 👋"
- Banner notifikasi H-3 (oranye) jika ada event dalam 3 hari
- Stat cards: Pohon Diadopsi | CO2 (`treesAdopted × 21 kg/thn`) | Eco Points
- Tabel riwayat donasi (tanggal, lokasi, jumlah pohon, nominal)
- Agenda volunteer dari `user.joinedEvents[]`
- Status level Eco Warrior + progress bar
- Card e-Sertifikat → download PDF (muncul jika ada riwayat donasi)

---

### 🌱 Donasi Pohon — `donasi.html`

![donasi](gambar/gambar4.png)

- Guest mode: field nama & email tampil + banner peringatan anonim
- Login mode: nama & email auto-fill, field tersembunyi
- Pilih area penanaman (6 lokasi + "Terserah Tim")
- Pilih jumlah: 1 / 3 / 10 pohon atau custom nominal (min Rp 50.000)
- Tipe: Sekali Bayar atau Bulanan (Recurring)
- Metode: QRIS / BCA VA / Mandiri VA / Kartu Kredit
- Setelah sukses: `treesAdopted++`, `points += trees × 10`, entry `donations[]`
- Download invoice PDF dengan LUNAS stamp

---

### 🗺️ Peta Penanaman — `peta.html`

![peta](gambar/gambar5.png)

- Peta Leaflet.js (OpenStreetMap tile)
- 5 marker: merah (kritis), kuning (pemulihan), hijau (sukses)
- Popup: foto lokasi, survival rate, jumlah pohon, tombol adopsi
- Filter sidebar: provinsi + jenis pohon (checkbox)
- Klik "Adopsi Pohon di Sini" → redirect `donasi.html?area=...`

---

### 📅 Agenda Volunteer — `events.html`

![events](gambar/gambar6.png)

- Filter: lokasi, jenis kegiatan, kalender tanggal
- 3 event: 25 Mar (Mangrove), 02 Apr (Orangutan/PENUH), 14 Apr (Edukasi Tani)
- Daftar → cek login → cek duplikat → simpan ke `user.joinedEvents[]` → redirect dashboard

---

### 🏆 Eco Rewards — `rewards.html`

![rewards](gambar/gambar16.png)
![reward](gambar/17.png)

- Saldo Eco Points user ditampilkan di hero banner
- Katalog: Tumbler (1.500 pts) | T-Shirt (2.500 pts) | Jaket (3.000 pts) | Donasi 10 Pohon (500 pts)
- Redeem: cek saldo → konfirmasi → potong poin → simpan ke localStorage

---

### 🛒 Eco Market — `marketplace.html`

![marketplace](gambar/gambar7.png)
![marketplace-cart](gambar/gambar9.png)

- 12 produk UMKM (4 habis terjual = grayscale + disabled)
- Search real-time (nama, seller, deskripsi)
- Keranjang: add, qty +/-, remove
- Modal pembayaran: QRIS atau BCA VA
- Download invoice PDF (tabel item, subtotal, donasi 10%, LUNAS stamp)

---

### 👥 Komunitas — `komunitas.html`

![komunitas](gambar/gambar10.png)
![komunitas](gambar/gambar11.png)

- Greeting personal jika login
- Tombol gabung grup WhatsApp Econusa (5.000+ anggota)
- Leaderboard top 4 donatur
- Posisi user sendiri di leaderboard (dari `user.points`)
- 2 grup lokal dengan link WhatsApp masing-masing

---

### 📚 Edukasi & Kuis — `edukasi.html`

![edukasi](gambar/gambar12.png)

![edukasi-kuis](gambar/gambar13.png)

- Filter artikel: Semua / Jenis Pohon / Krisis Iklim / Tutorial
- 4 artikel → modal SweetAlert2 dengan referensi sumber resmi
- Kuis Harian 5 soal, +20 pts per jawaban benar, poin tersimpan ke user

---

### 💬 Kontak — `kontak.html`

![kontak](gambar/18.png)

- Auto-fill nama & email jika login
- Form: nama, email, subjek (dropdown 4 opsi), pesan
- Simulasi kirim loading 1.5 detik → sukses
- Info: email, WhatsApp, alamat kantor, sosial media

---

### ⚙️ Pengaturan Akun — `settings.html`

![settings](gambar/gambar14.png)

- Update nama & telepon
- Ganti password (min 6 karakter, harus match)
- Danger Zone: hapus akun permanen → konfirmasi → logout

---

### ℹ️ Tentang Kami — `about.html`

![about](gambar/32.jpeg)
![about](gambar/33.jpeg)

- Narasi "Mengapa Kami Mulai?"
- Galeri Before-After Swiper.js (2 slide):
  - Restorasi Lahan Bekas Tambang Kaltim (2019 vs 2025)
  - Sabuk Hijau Mangrove Demak (2023 vs 2025)

---

### 🤝 Daftar Mitra UMKM — `mitra.html`

![mitra](gambar/gambar15.png)
![mitra](gambar/25.png)

- Form: nama UMKM, WhatsApp, nama produk, harga, URL foto, deskripsi manfaat lingkungan
- Auto-fill nama dari `currentUser`
- Submit → masuk `umkm_queue[]` dengan status `"pending"`

---

### 📊 Transparansi — `transparansi.html`

![transparansi](gambar/19.png)
![transparansi](gambar/20.png)

- Donut chart alokasi dana: Bibit 60% / Operasional 25% / Edukasi 15%
- Progress bar: Dana Terkumpul Rp 1,25M | Dana Disalurkan Rp 980jt
- Download Laporan Audit PDF
- 2 card lapangan → modal laporan detail (Kalimantan & Jawa Barat)

---

### 🛡️ Admin Dashboard — `admin.html`

![admin-dashboard](gambar/22.png)

- Navbar khusus admin (dark green gradient + shimmer accent line)
- Stat cards: Total User | Relawan Terdaftar | Total Donasi (Rp) | Newsletter Subs
- Tabel monitoring semua user
- Bar chart tren donasi tahunan + Donut chart distribusi pohon (Chart.js)
- Tombol Reset Database

---

### 👤 Manajemen User — `admin.html` (tab: users)

![admin-users](gambar/23.png)

- Search + filter role
- Tabel: nama, email, role badge, pohon, poin, aksi (edit/hapus)
- Modal tambah & edit user

---

### 🌿 Monitoring Relawan — `admin.html` (tab: volunteers)

![admin-volunteers](gambar/24.png)

- Tabel: nama user, event yang diikuti, tanggal, lokasi

---

### 🏪 Persetujuan UMKM — `admin.html` (tab: umkm)

![admin-umkm](gambar/26.png)
![admin-umkm](gambar/27.png)
![admin-umkm](gambar/28.png)
![admin-umkm](gambar/29.png)

- Badge notifikasi jumlah pending di sidebar
- Approve → `status = "approved"` | Reject → hapus dari queue

---

## Sistem Eco Points

![ecopoints](gambar/gambar16.png)

| Aktivitas                   | Poin       |
| --------------------------- | ---------- |
| Adopsi 1 pohon via donasi   | +10 pts    |
| Jawab kuis benar (per soal) | +20 pts    |
| Redeem Tumbler Eksklusif    | -1.500 pts |
| Redeem T-Shirt Relawan      | -2.500 pts |
| Redeem Jaket Outdoor        | -3.000 pts |
| Redeem Donasi 10 Pohon      | -500 pts   |

---

## Fitur PDF Generator

![pdf-preview](gambar/21.png)

Semua PDF di-generate client-side menggunakan **jsPDF** tanpa server.

| File PDF                          | Halaman             | Screenshot                       | Isi                                                        |
| --------------------------------- | ------------------- | -------------------------------- | ---------------------------------------------------------- |
| `Invoice_Donasi_EcoNusantara.pdf` | `donasi.html`       | `screenshots/pdf-donasi.png`     | Header, tabel pohon, total, LUNAS stamp, dampak CO2        |
| `Invoice_[Nama]_EcoNusantara.pdf` | `marketplace.html`  | `screenshots/pdf-market.png`     | Tabel item, subtotal, donasi 10%, LUNAS stamp              |
| `Sertifikat_Adopsi_[Nama].pdf`    | `dashboard.html`    | `screenshots/pdf-sertifikat.png` | Landscape A5, nama donatur, jumlah pohon, stempel verified |
| `Laporan_Audit_Q1_2026.pdf`       | `transparansi.html` | `screenshots/pdf-audit.png`      | Ringkasan keuangan, alokasi dana, tanggal unduh            |

---

## EcoBot AI (Groq)

![ecobot](gambar/34.png)

Chatbot floating di semua halaman, powered by **Groq API** model `llama-3.3-70b-versatile`.

- System prompt: pakar lingkungan, fokus deforestasi & reboisasi Indonesia
- Tombol hijau kanan bawah, modal chat 480px
- Indikator "EcoBot sedang berpikir..." saat menunggu respons
- Fallback error message jika API gagal

> API Key tersimpan sebagai konstanta di `app.js`. Untuk produksi, pindahkan ke environment variable atau backend proxy.

---

## Internasionalisasi (i18n)

![i18n](gambar/30.png)
![i18n](gambar/31.png)

- Toggle tombol `ID/EN` di navbar
- Bahasa disimpan di `localStorage.lang`, halaman reload otomatis
- Terjemahan mencakup semua label navbar dan teks panel admin

---

## Peta Penanaman (Leaflet)

5 lokasi penanaman aktif:

| Lokasi                   | Provinsi    | Jenis    | Status    | Survival |
| ------------------------ | ----------- | -------- | --------- | -------- |
| Muara Gembong Mangrove   | Jawa Barat  | Mangrove | Pemulihan | 88%      |
| Hutan Lindung Lembang    | Jawa Barat  | Mahoni   | Hijau     | 95%      |
| Koridor Orangutan Leuser | Sumatera    | Buah     | Pemulihan | 82%      |
| Lahan Kritis Merbabu     | Jawa Tengah | Beringin | Kritis    | N/A      |
| Restorasi Gambut         | Kalimantan  | Mahoni   | Kritis    | 40%      |

---

## Catatan Pengembangan

- Semua data bersifat **simulasi** — tidak ada backend atau database nyata
- Password disimpan **plain text** di localStorage (hanya untuk demo/prototype)
- API Key Groq tersimpan di client-side (tidak aman untuk produksi)
- Donasi guest tidak tersimpan (hanya user login yang datanya persisten)
- Statistik landing page (124.536 pohon, dll) adalah data statis hardcoded
- Untuk deployment produksi diperlukan: backend API, database, autentikasi proper, environment variables


## Link Website
http://eco-nusantara.web.id/

