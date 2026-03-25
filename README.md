# Eco Nusantara 🌿

> **"Tanam Pohon Hari Ini, Selamatkan Masa Depan Indonesia"**

Platform reboisasi komunitas berbasis web untuk mendukung penghijauan Indonesia. Dibangun sepenuhnya dengan HTML, Tailwind CSS, dan Vanilla JavaScript — tanpa framework, tanpa build tool, tanpa backend. Semua data disimpan di `localStorage` browser sebagai simulasi database.

> **Cara menambahkan screenshot nyata:** Buat folder `screenshots/` di root project, ambil screenshot setiap halaman, simpan sesuai nama file yang tertera di setiap bagian, lalu ganti URL `via.placeholder.com` dengan path relatif `screenshots/nama-file.png`.

---

## Daftar Isi

1. [Tech Stack](#tech-stack)
2. [Struktur File](#struktur-file)
3. [Cara Menjalankan](#cara-menjalankan)
4. [Akun Default](#akun-default)
5. [Arsitektur & Shared Logic](#arsitektur--shared-logic-appjs)
6. [localStorage Schema](#localstorage-schema)
7. [Detail Setiap Halaman & Screenshot](#detail-setiap-halaman--screenshot)
8. [Sistem Eco Points](#sistem-eco-points)
9. [Fitur PDF Generator](#fitur-pdf-generator)
10. [EcoBot AI](#ecobot-ai-groq)
11. [Internasionalisasi i18n](#internasionalisasi-i18n)
12. [Peta Penanaman](#peta-penanaman-leaflet)
13. [Catatan Pengembangan](#catatan-pengembangan)

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

**Hero Slider (IIFE):** Auto-play 5 detik, navigasi prev/next, swipe touch, pause on hover. Teks berubah dinamis per slide via `slideData[]`.

**Sistem Terjemahan:** Objek `translations` berisi key-value `id`/`en`. Navbar membaca `localStorage.lang`.

---

## localStorage Schema

| Key | Tipe | Isi |
|-----|------|-----|
| `users` | `Array<User>` | Semua akun terdaftar |
| `currentUser` | `User` | Objek user yang sedang login |
| `rememberedEmail` | `string` | Email untuk fitur "Ingat Saya" |
| `rememberedPassword` | `string` | Password untuk fitur "Ingat Saya" |
| `newsletters` | `Array<string>` | Daftar email subscriber newsletter |
| `umkm_queue` | `Array<UMKMSubmission>` | Antrian pengajuan produk mitra |
| `lang` | `"id" \| "en"` | Bahasa aktif |

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
  "donations": [{ "date": "2026-03-25T10:00:00.000Z", "amount": 150000, "trees": 3, "location": "Muara Gembong Mangrove" }],
  "joinedEvents": [{ "name": "Aksi Tanam 1.000 Mangrove", "date": "2026-03-25", "location": "Pantai Muara Gembong" }]
}
```

---

## Detail Setiap Halaman & Screenshot

---

### 🏠 Landing Page — `index.html`

![index](https://via.placeholder.com/1280x640/166534/ffffff?text=📸+Screenshot+→+screenshots/index.png)
> Ganti dengan: `screenshots/index.png`

- Hero slider 4 slide (auto-play 5 detik, swipe support, teks dinamis per slide)
- Impact counter animasi: 124.536 pohon | 2.615 ton CO2 | 842 petani
- Preview 3 event mendatang → `events.html`
- Testimoni carousel (Swiper.js, 3 slide)
- EcoBot AI floating button kanan bawah

---

### 🔐 Login — `login.html`

![login](https://via.placeholder.com/1280x640/1e40af/ffffff?text=📸+Screenshot+→+screenshots/login.png)
> Ganti dengan: `screenshots/login.png`

- Form email + password
- Fitur "Ingat Saya" (simpan ke localStorage)
- Tombol Login Google (simulasi: ambil user terakhir dari `users[]`)
- Redirect: `role=admin` → `admin.html` | `role=user` → `dashboard.html`
- Auto-redirect jika sudah login

---

### 📝 Registrasi — `register.html`

![register](https://via.placeholder.com/1280x640/1e40af/ffffff?text=📸+Screenshot+→+screenshots/register.png)
> Ganti dengan: `screenshots/register.png`

- Form: nama, telepon, email, password, konfirmasi password
- Validasi: password min 6 karakter, password match, email unik
- Auto-login setelah daftar → redirect ke `dashboard.html`

---

### 📊 Dashboard User — `dashboard.html`

![dashboard](https://via.placeholder.com/1280x640/166534/ffffff?text=📸+Screenshot+→+screenshots/dashboard.png)
> Ganti dengan: `screenshots/dashboard.png`

- Greeting: "Halo, [Nama]! 👋"
- Banner notifikasi H-3 (oranye) jika ada event dalam 3 hari
- Stat cards: Pohon Diadopsi | CO2 (`treesAdopted × 21 kg/thn`) | Eco Points
- Tabel riwayat donasi (tanggal, lokasi, jumlah pohon, nominal)
- Agenda volunteer dari `user.joinedEvents[]`
- Status level Eco Warrior + progress bar
- Card e-Sertifikat → download PDF (muncul jika ada riwayat donasi)

---

### 🌱 Donasi Pohon — `donasi.html`

![donasi](https://via.placeholder.com/1280x640/166534/ffffff?text=📸+Screenshot+→+screenshots/donasi.png)
> Ganti dengan: `screenshots/donasi.png`

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

![peta](https://via.placeholder.com/1280x640/0f766e/ffffff?text=📸+Screenshot+→+screenshots/peta.png)
> Ganti dengan: `screenshots/peta.png`

![peta-popup](https://via.placeholder.com/1280x640/0f766e/ffffff?text=📸+Screenshot+→+screenshots/peta-popup.png)
> Ganti dengan: `screenshots/peta-popup.png` (popup marker terbuka)

- Peta Leaflet.js (OpenStreetMap tile)
- 5 marker: merah (kritis), kuning (pemulihan), hijau (sukses)
- Popup: foto lokasi, survival rate, jumlah pohon, tombol adopsi
- Filter sidebar: provinsi + jenis pohon (checkbox)
- Klik "Adopsi Pohon di Sini" → redirect `donasi.html?area=...`

---

### 📅 Agenda Volunteer — `events.html`

![events](https://via.placeholder.com/1280x640/92400e/ffffff?text=📸+Screenshot+→+screenshots/events.png)
> Ganti dengan: `screenshots/events.png`

- Filter: lokasi, jenis kegiatan, kalender tanggal
- 3 event: 25 Mar (Mangrove), 02 Apr (Orangutan/PENUH), 14 Apr (Edukasi Tani)
- Daftar → cek login → cek duplikat → simpan ke `user.joinedEvents[]` → redirect dashboard

---

### 🏆 Eco Rewards — `rewards.html`

![rewards](https://via.placeholder.com/1280x640/92400e/ffffff?text=📸+Screenshot+→+screenshots/rewards.png)
> Ganti dengan: `screenshots/rewards.png`

- Saldo Eco Points user ditampilkan di hero banner
- Katalog: Tumbler (1.500 pts) | T-Shirt (2.500 pts) | Jaket (3.000 pts) | Donasi 10 Pohon (500 pts)
- Redeem: cek saldo → konfirmasi → potong poin → simpan ke localStorage

---

### 🛒 Eco Market — `marketplace.html`

![marketplace](https://via.placeholder.com/1280x640/166534/ffffff?text=📸+Screenshot+→+screenshots/marketplace.png)
> Ganti dengan: `screenshots/marketplace.png`

![marketplace-cart](https://via.placeholder.com/1280x640/166534/ffffff?text=📸+Screenshot+→+screenshots/marketplace-cart.png)
> Ganti dengan: `screenshots/marketplace-cart.png` (modal keranjang terbuka)

- 12 produk UMKM (4 habis terjual = grayscale + disabled)
- Search real-time (nama, seller, deskripsi)
- Keranjang: add, qty +/-, remove
- Modal pembayaran: QRIS atau BCA VA
- Download invoice PDF (tabel item, subtotal, donasi 10%, LUNAS stamp)

---

### 👥 Komunitas — `komunitas.html`

![komunitas](https://via.placeholder.com/1280x640/166534/ffffff?text=📸+Screenshot+→+screenshots/komunitas.png)
> Ganti dengan: `screenshots/komunitas.png`

- Greeting personal jika login
- Tombol gabung grup WhatsApp Econusa (5.000+ anggota)
- Leaderboard top 4 donatur
- Posisi user sendiri di leaderboard (dari `user.points`)
- 2 grup lokal dengan link WhatsApp masing-masing

---

### 📚 Edukasi & Kuis — `edukasi.html`

![edukasi](https://via.placeholder.com/1280x640/166534/ffffff?text=📸+Screenshot+→+screenshots/edukasi.png)
> Ganti dengan: `screenshots/edukasi.png`

![edukasi-kuis](https://via.placeholder.com/1280x640/166534/ffffff?text=📸+Screenshot+→+screenshots/edukasi-kuis.png)
> Ganti dengan: `screenshots/edukasi-kuis.png` (section kuis harian)

- Filter artikel: Semua / Jenis Pohon / Krisis Iklim / Tutorial
- 4 artikel → modal SweetAlert2 dengan referensi sumber resmi
- Kuis Harian 5 soal, +20 pts per jawaban benar, poin tersimpan ke user

---

### 💬 Kontak — `kontak.html`

![kontak](https://via.placeholder.com/1280x640/1e40af/ffffff?text=📸+Screenshot+→+screenshots/kontak.png)
> Ganti dengan: `screenshots/kontak.png`

- Auto-fill nama & email jika login
- Form: nama, email, subjek (dropdown 4 opsi), pesan
- Simulasi kirim loading 1.5 detik → sukses
- Info: email, WhatsApp, alamat kantor, sosial media

---

### ⚙️ Pengaturan Akun — `settings.html`

![settings](https://via.placeholder.com/1280x640/374151/ffffff?text=📸+Screenshot+→+screenshots/settings.png)
> Ganti dengan: `screenshots/settings.png`

- Update nama & telepon
- Ganti password (min 6 karakter, harus match)
- Danger Zone: hapus akun permanen → konfirmasi → logout

---

### ℹ️ Tentang Kami — `about.html`

![about](https://via.placeholder.com/1280x640/166534/ffffff?text=📸+Screenshot+→+screenshots/about.png)
> Ganti dengan: `screenshots/about.png`

- Narasi "Mengapa Kami Mulai?"
- Galeri Before-After Swiper.js (2 slide):
  - Restorasi Lahan Bekas Tambang Kaltim (2019 vs 2025)
  - Sabuk Hijau Mangrove Demak (2023 vs 2025)

---

### 🤝 Daftar Mitra UMKM — `mitra.html`

![mitra](https://via.placeholder.com/1280x640/166534/ffffff?text=📸+Screenshot+→+screenshots/mitra.png)
> Ganti dengan: `screenshots/mitra.png`

- Form: nama UMKM, WhatsApp, nama produk, harga, URL foto, deskripsi manfaat lingkungan
- Auto-fill nama dari `currentUser`
- Submit → masuk `umkm_queue[]` dengan status `"pending"`

---

### 📊 Transparansi — `transparansi.html`

![transparansi](https://via.placeholder.com/1280x640/166534/ffffff?text=📸+Screenshot+→+screenshots/transparansi.png)
> Ganti dengan: `screenshots/transparansi.png`

- Donut chart alokasi dana: Bibit 60% / Operasional 25% / Edukasi 15%
- Progress bar: Dana Terkumpul Rp 1,25M | Dana Disalurkan Rp 980jt
- Download Laporan Audit PDF
- 2 card lapangan → modal laporan detail (Kalimantan & Jawa Barat)

---

### 🛡️ Admin Dashboard — `admin.html`

![admin-dashboard](https://via.placeholder.com/1280x640/052e16/ffffff?text=📸+Screenshot+→+screenshots/admin-dashboard.png)
> Ganti dengan: `screenshots/admin-dashboard.png`

- Navbar khusus admin (dark green gradient + shimmer accent line)
- Stat cards: Total User | Relawan Terdaftar | Total Donasi (Rp) | Newsletter Subs
- Tabel monitoring semua user
- Bar chart tren donasi tahunan + Donut chart distribusi pohon (Chart.js)
- Tombol Reset Database

---

### 👤 Manajemen User — `admin.html` (tab: users)

![admin-users](https://via.placeholder.com/1280x640/052e16/ffffff?text=📸+Screenshot+→+screenshots/admin-users.png)
> Ganti dengan: `screenshots/admin-users.png`

- Search + filter role
- Tabel: nama, email, role badge, pohon, poin, aksi (edit/hapus)
- Modal tambah & edit user

---

### 🌿 Monitoring Relawan — `admin.html` (tab: volunteers)

![admin-volunteers](https://via.placeholder.com/1280x640/052e16/ffffff?text=📸+Screenshot+→+screenshots/admin-volunteers.png)
> Ganti dengan: `screenshots/admin-volunteers.png`

- Tabel: nama user, event yang diikuti, tanggal, lokasi

---

### 🏪 Persetujuan UMKM — `admin.html` (tab: umkm)

![admin-umkm](https://via.placeholder.com/1280x640/052e16/ffffff?text=📸+Screenshot+→+screenshots/admin-umkm.png)
> Ganti dengan: `screenshots/admin-umkm.png`

- Badge notifikasi jumlah pending di sidebar
- Approve → `status = "approved"` | Reject → hapus dari queue

---

## Sistem Eco Points

![ecopoints](https://via.placeholder.com/1280x320/92400e/ffffff?text=📸+Screenshot+→+screenshots/ecopoints.png)
> Ganti dengan: `screenshots/ecopoints.png`

| Aktivitas | Poin |
|-----------|------|
| Adopsi 1 pohon via donasi | +10 pts |
| Jawab kuis benar (per soal) | +20 pts |
| Redeem Tumbler Eksklusif | -1.500 pts |
| Redeem T-Shirt Relawan | -2.500 pts |
| Redeem Jaket Outdoor | -3.000 pts |
| Redeem Donasi 10 Pohon | -500 pts |

---

## Fitur PDF Generator

![pdf-preview](https://via.placeholder.com/1280x320/1e3a5f/ffffff?text=📸+Screenshot+→+screenshots/pdf-preview.png)
> Ganti dengan: `screenshots/pdf-preview.png`

Semua PDF di-generate client-side menggunakan **jsPDF** tanpa server.

| File PDF | Halaman | Screenshot | Isi |
|----------|---------|------------|-----|
| `Invoice_Donasi_EcoNusantara.pdf` | `donasi.html` | `screenshots/pdf-donasi.png` | Header, tabel pohon, total, LUNAS stamp, dampak CO2 |
| `Invoice_[Nama]_EcoNusantara.pdf` | `marketplace.html` | `screenshots/pdf-market.png` | Tabel item, subtotal, donasi 10%, LUNAS stamp |
| `Sertifikat_Adopsi_[Nama].pdf` | `dashboard.html` | `screenshots/pdf-sertifikat.png` | Landscape A5, nama donatur, jumlah pohon, stempel verified |
| `Laporan_Audit_Q1_2026.pdf` | `transparansi.html` | `screenshots/pdf-audit.png` | Ringkasan keuangan, alokasi dana, tanggal unduh |

---

## EcoBot AI (Groq)

![ecobot](https://via.placeholder.com/1280x640/065f46/ffffff?text=📸+Screenshot+→+screenshots/ecobot.png)
> Ganti dengan: `screenshots/ecobot.png`

Chatbot floating di semua halaman, powered by **Groq API** model `llama-3.3-70b-versatile`.

- System prompt: pakar lingkungan, fokus deforestasi & reboisasi Indonesia
- Tombol hijau kanan bawah, modal chat 480px
- Indikator "EcoBot sedang berpikir..." saat menunggu respons
- Fallback error message jika API gagal

> API Key tersimpan sebagai konstanta di `app.js`. Untuk produksi, pindahkan ke environment variable atau backend proxy.

---

## Internasionalisasi (i18n)

![i18n](https://via.placeholder.com/1280x320/1e40af/ffffff?text=📸+Screenshot+→+screenshots/i18n-en.png)
> Ganti dengan: `screenshots/i18n-en.png` (navbar dalam mode bahasa EN)

- Toggle tombol `ID/EN` di navbar
- Bahasa disimpan di `localStorage.lang`, halaman reload otomatis
- Terjemahan mencakup semua label navbar dan teks panel admin

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

---

## Catatan Pengembangan

- Semua data bersifat **simulasi** — tidak ada backend atau database nyata
- Password disimpan **plain text** di localStorage (hanya untuk demo/prototype)
- API Key Groq tersimpan di client-side (tidak aman untuk produksi)
- Donasi guest tidak tersimpan (hanya user login yang datanya persisten)
- Statistik landing page (124.536 pohon, dll) adalah data statis hardcoded
- Untuk deployment produksi diperlukan: backend API, database, autentikasi proper, environment variables
