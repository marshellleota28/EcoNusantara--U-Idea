# Eco Nusantara 🌿

> **"Tanam Pohon Hari Ini, Selamatkan Masa Depan Indonesia"**

Platform reboisasi komunitas berbasis web untuk mendukung penghijauan Indonesia. Dibangun sepenuhnya dengan HTML, Tailwind CSS, dan Vanilla JavaScript — tanpa framework, tanpa build tool, tanpa backend. Semua data disimpan di `localStorage` browser sebagai simulasi database.

---

## Daftar Isi

1. [Tech Stack](#tech-stack)
2. [Struktur File](#struktur-file)
3. [Cara Menjalankan](#cara-menjalankan)
4. [Akun Default](#akun-default)
5. [Arsitektur & Shared Logic (app.js)](#arsitektur--shared-logic-appjs)
6. [localStorage Schema](#localstorage-schema)
7. [Alur Lengkap Per Role](#alur-lengkap-per-role)
   - [Guest (Belum Login)](#1-guest-belum-login)
   - [User Terdaftar](#2-user-terdaftar)
   - [Admin](#3-admin)
8. [Detail Setiap Halaman](#detail-setiap-halaman)
9. [Sistem Eco Points](#sistem-eco-points)
10. [Fitur PDF Generator](#fitur-pdf-generator)
11. [EcoBot AI (Groq)](#ecobot-ai-groq)
12. [Internasionalisasi (i18n)](#internasionalisasi-i18n)
13. [Peta Penanaman (Leaflet)](#peta-penanaman-leaflet)
14. [Catatan Pengembangan](#catatan-pengembangan)

---

## Tech Stack

| Library / Tool | Versi | Kegunaan |
|---|---|---|
| Tailwind CSS | CDN | Styling utility-first |
| Lucide Icons | CDN | Icon set |
| SweetAlert2 | v11 | Modal & notifikasi |
| Leaflet.js | v1.9.4 | Peta interaktif |
| Chart.js | CDN | Grafik admin & transparansi |
| jsPDF | v2.5.1 | Generate PDF (invoice, sertifikat, audit) |
| Swiper.js | v10 | Carousel (hero, testimoni, about) |
| CountUp.js | v2.0.0 | Animasi angka statistik |
| Groq API | llama-3.3-70b | AI chatbot EcoBot |
| Google Fonts | Inter + Merriweather | Tipografi |

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

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@econusantara.id` | `admin123` |
| User | `user@test.com` | `password` |

### Membuat Akun Admin Baru

Daftar via `register.html`, lalu ubah role di DevTools Console:

```js
let users = JSON.parse(localStorage.getItem('users'));
let idx = users.findIndex(u => u.email === 'email@kamu.com');
users[idx].role = 'admin';
localStorage.setItem('users', JSON.stringify(users));
```

---

## Arsitektur & Shared Logic (app.js)

`js/app.js` adalah file inti yang di-load di semua halaman. Berisi:

### Fungsi Utama

| Fungsi | Deskripsi |
|--------|-----------|
| `initStorage()` | Seed data awal ke localStorage jika belum ada |
| `getCurrentUser()` | Ambil objek user yang sedang login |
| `isLoggedIn()` | Cek status login (boolean) |
| `protectRoute()` | Redirect ke login jika belum login |
| `protectAdminRoute()` | Redirect ke login jika bukan admin |
| `logout()` | Hapus `currentUser`, redirect ke `index.html` |
| `renderNavbar()` | Render navbar responsif + search + mobile drawer |
| `renderFooter()` | Render footer dengan link sosial media |
| `renderChatbot()` | Inject tombol & modal EcoBot AI ke DOM |
| `toggleLang()` | Toggle bahasa ID/EN, simpan ke localStorage, reload |
| `loadQuiz()` | Load pertanyaan kuis harian |
| `checkChainAnswer()` | Validasi jawaban kuis, tambah poin |
| `finishQuiz()` | Simpan poin kuis ke user, tampilkan hasil |
| `filterEdu()` | Filter kartu artikel berdasarkan kategori |
| `showFullArticle()` | Tampilkan artikel lengkap via SweetAlert2 |
| `downloadAuditReport()` | Generate PDF laporan audit keuangan |
| `showFieldProgress()` | Tampilkan laporan lapangan per area |
| `downloadEStoreCertificate()` | Generate e-Sertifikat adopsi pohon (PDF landscape) |
| `initLeaderboard()` | Render leaderboard donatur di komunitas.html |
| `joinGroupAlert()` | Konfirmasi sebelum redirect ke grup WhatsApp |
| `joinEvent()` | Daftarkan user ke event, simpan ke `joinedEvents[]` |
| `filterEventsByDate()` | Filter event berdasarkan tanggal kalender |
| `navSearch()` | Pencarian halaman via search bar navbar |

### Hero Slider (IIFE)

Auto-play slider 5 detik dengan navigasi manual (prev/next), swipe touch, dan pause on hover. Teks hero berubah dinamis per slide menggunakan `slideData[]`.

### Sistem Terjemahan

Objek `translations` berisi key-value untuk bahasa `id` dan `en`. Navbar membaca `localStorage.lang` untuk menentukan bahasa aktif.

---

## localStorage Schema

### Key yang Digunakan

| Key | Tipe | Isi |
|-----|------|-----|
| `users` | `Array<User>` | Semua akun terdaftar |
| `currentUser` | `User` | Objek user yang sedang login |
| `rememberedEmail` | `string` | Email untuk fitur "Ingat Saya" |
| `rememberedPassword` | `string` | Password untuk fitur "Ingat Saya" |
| `newsletters` | `Array<string>` | Daftar email subscriber newsletter |
| `umkm_queue` | `Array<UMKMSubmission>` | Antrian pengajuan produk mitra |
| `lang` | `"id" \| "en"` | Bahasa aktif |

### Skema Objek User

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

### Skema Objek UMKM Submission

```json
{
  "id": 1700000000000,
  "userEmail": "mitra@email.com",
  "umkm": "Nama Usaha",
  "phone": "0812...",
  "product": "Nama Produk",
  "price": "50000",
  "image": "https://...",
  "desc": "Manfaat lingkungan produk",
  "status": "pending"
}
```

---

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

### 2. User Terdaftar

```
login.html
  ├── Form email + password
  ├── Fitur "Ingat Saya" (simpan ke localStorage)
  ├── Tombol Login Google (simulasi: ambil user terakhir dari users[])
  ├── Redirect: role=admin → admin.html | role=user → dashboard.html
  └── Auto-redirect jika sudah login

dashboard.html (protectRoute)
  ├── Greeting: "Halo, [Nama]! 👋"
  ├── Notifikasi H-3: banner oranye jika ada event dalam 3 hari
  ├── Stat cards:
  │   ├── Pohon Diadopsi (dari user.treesAdopted)
  │   ├── Dampak Karbon: treesAdopted × 21 kg CO2/tahun
  │   └── Eco Points (klik → redirect ke rewards.html)
  ├── Tabel riwayat donasi (tanggal, lokasi, jumlah pohon, nominal)
  ├── Agenda volunteer yang diikuti (dari user.joinedEvents[])
  ├── Status level: Eco Warrior + progress bar
  ├── Tombol "Adopsi Lagi" → donasi.html
  └── Card e-Sertifikat (muncul jika ada riwayat donasi) → download PDF

donasi.html (user login)
  ├── Field nama & email tersembunyi (auto-fill dari currentUser)
  ├── Redirect dari peta.html: auto-select area via ?area= query param
  ├── Setelah sukses:
  │   ├── user.treesAdopted += jumlah pohon
  │   ├── user.points += jumlah pohon × 10
  │   ├── donations[].unshift({ date, amount, trees, location })
  │   └── Simpan ke users[] dan currentUser di localStorage
  └── Download invoice PDF (nama, lokasi, jumlah, metode, LUNAS stamp)

events.html
  ├── Filter: lokasi, jenis kegiatan, kalender tanggal
  ├── 3 event tersedia:
  │   ├── 25 Mar 2026 - Aksi Tanam 1.000 Mangrove (kuota 15/50)
  │   ├── 02 Apr 2026 - Rehabilitasi Koridor Orangutan (PENUH 40/40)
  │   └── 14 Apr 2026 - Edukasi Tani & Tanam Pohon (kuota 20/50)
  ├── Klik "Daftar Sekarang":
  │   ├── Cek login → jika belum, prompt login
  │   ├── Cek duplikat pendaftaran
  │   ├── Simpan ke user.joinedEvents[]
  │   └── Redirect ke dashboard.html
  └── Filter kalender: 2026-03-25, 2026-04-02, 2026-04-14

rewards.html (protectRoute)
  ├── Tampilkan saldo Eco Points user
  ├── Katalog 4 item:
  │   ├── Tumbler Eksklusif → 1.500 pts
  │   ├── T-Shirt Relawan Limited → 2.500 pts
  │   ├── Jaket Outdoor Relawan → 3.000 pts
  │   └── Donasi Ekstra 10 Pohon → 500 pts
  ├── Klik Redeem:
  │   ├── Cek saldo cukup
  │   ├── Konfirmasi SweetAlert2
  │   ├── Potong poin dari user.points
  │   └── Jika "Donasi 10 Pohon": tambah treesAdopted += 10 + entry donations[]

marketplace.html
  ├── 12 produk UMKM (4 habis terjual = grayscale + disabled)
  ├── Search real-time (nama, seller, deskripsi)
  ├── Keranjang belanja (add, qty +/-, remove)
  ├── Modal pembayaran: QRIS atau BCA VA
  ├── Setelah bayar: modal sukses + form nama & lokasi penerima
  └── Download invoice PDF (tabel item, subtotal, donasi 10%, LUNAS stamp)

komunitas.html
  ├── Greeting personal jika login
  ├── Tombol gabung grup WhatsApp Econusa (5.000+ anggota)
  ├── Leaderboard top 4 donatur (data statis)
  ├── Posisi user sendiri di leaderboard (dari user.points)
  ├── 2 grup lokal: Sobat Mangrove Jakarta, Relawan IKN Hijau
  └── Klik grup → konfirmasi → buka link WhatsApp

edukasi.html
  ├── Hero dengan background image
  ├── Filter artikel: Semua / Jenis Pohon / Krisis Iklim / Tutorial
  ├── 4 artikel dengan tombol "Baca Selengkapnya" → modal SweetAlert2
  │   ├── Mangrove (Jenis Pohon)
  │   ├── Kompos Organik (Tutorial)
  │   ├── Deforestasi Kalimantan (Krisis Iklim)
  │   └── Kenaikan Air Laut Jawa (Krisis Iklim)
  └── Kuis Harian (5 pertanyaan, +20 pts per jawaban benar)
      ├── Jawaban benar/salah → SweetAlert2 → lanjut otomatis
      ├── Selesai: total poin ditampilkan
      └── Poin disimpan ke user.points (jika login)

kontak.html
  ├── Auto-fill nama & email jika login
  ├── Form: nama, email, subjek (dropdown), pesan
  ├── Simulasi kirim (loading 1.5 detik → sukses)
  └── Info kontak: email, WhatsApp, alamat kantor, sosial media

settings.html (protectRoute)
  ├── Auto-fill data profil dari currentUser
  ├── Update nama & telepon → simpan ke users[] dan currentUser
  ├── Ganti password (min 6 karakter, harus match)
  └── Hapus akun permanen:
      ├── Konfirmasi SweetAlert2
      ├── Hapus dari users[]
      └── Logout + redirect

about.html
  ├── Hero banner
  ├── Narasi "Mengapa Kami Mulai?"
  └── Galeri Before-After (Swiper.js, 2 slide):
      ├── Restorasi Lahan Bekas Tambang Kaltim (2019 vs 2025)
      └── Sabuk Hijau Mangrove Demak (2023 vs 2025)

mitra.html (protectRoute)
  ├── Form: nama UMKM, WhatsApp, nama produk, harga, URL foto, deskripsi
  ├── Auto-fill nama dari currentUser
  ├── Submit → simpan ke localStorage umkm_queue[]
  └── Status: "pending" (menunggu approval admin)

transparansi.html
  ├── Donut chart alokasi dana: Bibit 60% / Operasional 25% / Edukasi 15%
  ├── Progress bar: Dana Terkumpul Rp 1,25M | Dana Disalurkan Rp 980jt
  ├── Download Laporan Audit PDF (jsPDF)
  └── 2 card before-after lapangan:
      ├── Kalimantan → modal laporan lapangan detail
      └── Jawa Barat → modal laporan lapangan detail
```

---

### 3. Admin

```
login.html → admin.html (protectAdminRoute)

admin.html
├── Navbar khusus admin (dark green gradient, shimmer accent line)
├── Sidebar desktop + mobile drawer
├── Toggle bahasa ID/EN (adminToggleLang)
└── 4 Section (switchSection):

  [Dashboard]
  ├── Stat cards: Total User, Relawan Terdaftar, Total Donasi (Rp), Newsletter Subs
  ├── Tabel monitoring: semua user + agenda diikuti + total donasi
  ├── Tombol "Reset Database" (clearDummyData)
  ├── Bar chart: Tren Donasi Tahunan (Chart.js)
  └── Donut chart: Distribusi Pohon per Area (Chart.js)

  [Manajemen User]
  ├── Stat cards: Total User, Jumlah Admin, Relawan Aktif
  ├── Search bar (nama/email) + filter dropdown (role)
  ├── Tabel: nama, email, role badge, pohon, poin, aksi
  ├── Tombol Tambah User → modal form
  ├── Edit user → modal pre-filled
  └── Hapus user → konfirmasi SweetAlert2

  [Monitoring Relawan]
  └── Tabel: siapa mendaftar event apa, tanggal, lokasi

  [Persetujuan UMKM]
  ├── Badge notifikasi jumlah pending di sidebar
  ├── Tabel: nama UMKM, produk, harga, status
  ├── Tombol Approve → status = "approved"
  └── Tombol Reject → hapus dari queue
```

---

## Sistem Eco Points

| Aktivitas | Poin Didapat |
|-----------|-------------|
| Adopsi 1 pohon via donasi | +10 pts |
| Jawab kuis benar (per soal) | +20 pts |
| Redeem Tumbler | -1.500 pts |
| Redeem T-Shirt | -2.500 pts |
| Redeem Jaket | -3.000 pts |
| Redeem Donasi 10 Pohon | -500 pts |

Poin disimpan di `user.points` dan `users[i].points` di localStorage.

---

## Fitur PDF Generator

Semua PDF di-generate client-side menggunakan **jsPDF** tanpa server.

| File PDF | Halaman | Isi |
|----------|---------|-----|
| `Invoice_Donasi_EcoNusantara.pdf` | `donasi.html` | Header, tabel pohon, total, metode, LUNAS stamp, dampak lingkungan |
| `Invoice_[Nama]_EcoNusantara.pdf` | `marketplace.html` | Tabel item, subtotal, donasi 10%, LUNAS stamp |
| `Sertifikat_Adopsi_[Nama].pdf` | `dashboard.html` | Sertifikat landscape A5, nama donatur, jumlah pohon, tanggal, stempel verified |
| `Laporan_Audit_EcoNusantara_Q1_2026.pdf` | `transparansi.html` | Ringkasan keuangan, alokasi dana, tanggal unduh |

---

## EcoBot AI (Groq)

Chatbot floating di semua halaman, powered by **Groq API** dengan model `llama-3.3-70b-versatile`.

- System prompt: pakar lingkungan EcoNusantara, fokus deforestasi & reboisasi Indonesia
- Tampil sebagai tombol hijau kanan bawah
- Modal chat 480px dengan area scroll
- Indikator "EcoBot sedang berpikir..." saat menunggu respons
- Fallback error message jika API gagal

> API Key tersimpan sebagai konstanta di `app.js`. Untuk produksi, pindahkan ke environment variable atau backend proxy.

---

## Internasionalisasi (i18n)

Mendukung 2 bahasa: **Indonesia (id)** dan **English (en)**.

- Toggle via tombol `ID/EN` di navbar
- Bahasa disimpan di `localStorage.lang`
- Halaman reload otomatis setelah toggle
- Terjemahan mencakup semua label navbar dan teks panel admin
- Konten halaman (artikel, form) belum diterjemahkan (hanya UI chrome)

---

## Peta Penanaman (Leaflet)

5 lokasi penanaman aktif:

| Lokasi | Provinsi | Jenis | Status | Survival |
|--------|----------|-------|--------|---------|
| Muara Gembong Mangrove | Jawa Barat | Mangrove | Pemulihan | 88% |
| Hutan Lindung Lembang | Jawa Barat | Mahoni | Hijau | 95% |
| Koridor Orangutan Leuser | Sumatera | Buah | Pemulihan | 82% |
| Lahan Kritis Merbabu | Jawa Tengah | Beringin | Kritis | N/A |
| Restorasi Gambut | Kalimantan | Mahoni | Kritis | 40% |

Popup setiap marker berisi foto lokasi, survival rate, jumlah pohon ditanam, dan tombol "Adopsi Pohon di Sini" yang redirect ke `donasi.html?area=[nama_lokasi]`.

---

## Catatan Pengembangan

- Semua data bersifat **simulasi** — tidak ada backend atau database nyata
- Password disimpan **plain text** di localStorage (hanya untuk demo/prototype)
- API Key Groq tersimpan di client-side (tidak aman untuk produksi)
- Donasi guest tidak tersimpan (hanya user login yang datanya persisten)
- Statistik landing page (124.536 pohon, dll) adalah data statis hardcoded
- Leaderboard komunitas menggunakan data dummy statis
- Untuk deployment produksi, diperlukan: backend API, database, autentikasi proper, dan environment variables
