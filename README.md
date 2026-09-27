<div align="center">

# 💍 The Wedding of **Dian & Iqbal**

**Undangan Pernikahan Digital** — Ahad, 10 Januari 2027 • Pekanbaru, Riau

Desain mewah bertema *dusty rose* & emas dengan sentuhan estetik Islami, Jawa, dan Minang.

<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5">
<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript">
<img src="https://img.shields.io/badge/Vercel-Siap%20Deploy-000000?style=flat-square&logo=vercel&logoColor=white" alt="Vercel">
<img src="https://img.shields.io/badge/Mobile--First-Responsif-9c5f66?style=flat-square" alt="Responsive">

**[✨ Lihat Pratinjau](#-pratinjau-tampilan)** • **[🚀 Cara Online-kan](#-cara-menampilkan-website-online)** • **[✏️ Cara Mengubah Data](#%EF%B8%8F-cara-mengubah-data-undangan)**

</div>

---

## 📑 Daftar Isi

1. [Tentang Proyek Ini](#-tentang-proyek-ini)
2. [Fitur Utama](#-fitur-utama)
3. [Pratinjau Tampilan](#-pratinjau-tampilan)
4. [Struktur Proyek](#-struktur-proyek)
5. [Cara Menampilkan Website Online](#-cara-menampilkan-website-online)
6. [Cara Mengubah Data Undangan](#%EF%B8%8F-cara-mengubah-data-undangan)
7. [Cara Mengirim Undangan ke Tamu](#-cara-mengirim-undangan-ke-tamu)
8. [Tentang Musik Latar](#-tentang-musik-latar)
9. [Menyimpan Ucapan Tamu ke Google Sheets (Opsional)](#-menyimpan-ucapan-tamu-ke-google-sheets-opsional)
10. [Pertanyaan yang Sering Diajukan](#-pertanyaan-yang-sering-diajukan)
11. [Kredit](#-kredit)

---

## 📖 Tentang Proyek Ini

Website undangan pernikahan digital yang dirancang **khusus untuk dibuka lewat HP** (tetap rapi di
layar komputer). Tamu cukup menerima sebuah **tautan (link)** — saat dibuka, mereka melihat sampul
undangan dengan **nama mereka sendiri**, menekan tombol *Buka Undangan*, dan musik langsung berbunyi.

Dibangun **tanpa framework** (HTML + CSS + JavaScript murni) sehingga ringan, cepat, dan bisa
di-online-kan **gratis** lewat Vercel — tanpa perlu mengerti coding sama sekali.

| Detail | Informasi |
|---|---|
| Mempelai Wanita | Dian Ayu Puspa Sari (Pekanbaru, 10 September 2005) |
| Mempelai Pria | Iqbal Pradana (3 Mei 1997) |
| Hari Pernikahan | **Ahad, 10 Januari 2027** |
| Lokasi | Kel. Air Putih, Tuah Madani, Kota Pekanbaru, Riau (Plus Code `F9M2+C8`) |
| Tema Desain | Dusty rose 🌸 + emas ✨ + ornamen Islami, gunungan Jawa & songket Minang |

## ✨ Fitur Utama

| Fitur | Penjelasan Singkat |
|---|---|
| 💌 **Nama tamu otomatis** | Link yang dikirim ke tiap tamu menampilkan nama tamu itu, contoh: `undangan.com/?to=Budi` → sampul tertulis "Kepada Yth. … Budi" |
| 🎵 **Musik otomatis** | Lagu *Mahalini x Nuca — Janji Kita* berputar saat undangan dibuka, lengkap dengan tombol putar/jeda melayang |
| ⏳ **Hitung mundur** | Penghitung hari/jam/menit/detik menuju hari pernikahan, berjalan langsung |
| 🌸 **Animasi halus** | Setiap bagian muncul perlahan saat digulir + kelopak bunga berjatuhan |
| 🗺️ **Lokasi & peta** | Alamat lengkap, peta Google Maps tersemat, tombol *Buka Google Maps*, dan tombol simpan ke Google Calendar |
| 🖼️ **Galeri foto** | Tata letak masonry mewah; foto bisa diperbesar (lightbox) dengan geser kiri/kanan |
| 📝 **RSVP & ucapan** | Tamu mengisi kehadiran dan doa; ucapan langsung tampil di halaman |
| 💳 **Amplop digital** | Kartu rekening bank / e-wallet / alamat kirim kado dengan tombol **salin nomor** |
| 📱 **Menu navigasi** | Dock melayang di bawah layar untuk lompat antar-bagian |

## 🖼️ Pratinjau Tampilan

Berikut tampilan asli website (diuji di layar HP 390×844):

| Sampul + nama tamu | Hitung mundur | Profil mempelai |
|:---:|:---:|:---:|
| <img src="docs/screenshots/01-cover.png" width="220" alt="Sampul undangan"> | <img src="docs/screenshots/02-hitung-mundur.png" width="220" alt="Hitung mundur"> | <img src="docs/screenshots/03-mempelai.png" width="220" alt="Profil mempelai"> |

| Detail acara | Galeri | Amplop digital |
|:---:|:---:|:---:|
| <img src="docs/screenshots/04-acara.png" width="220" alt="Detail acara"> | <img src="docs/screenshots/05-galeri.png" width="220" alt="Galeri"> | <img src="docs/screenshots/07-amplop.png" width="220" alt="Amplop digital"> |

> Semua tangkapan layar ada di folder [`docs/screenshots/`](docs/screenshots/).

## 📁 Struktur Proyek

```
undangan-dian-iqbal/
├── index.html      ← Seluruh isi halaman (teks, foto, section)
├── style.css       ← Desain tampilan (warna, font, animasi)
├── script.js       ← Logika interaktif + DATA yang sering diedit
├── vercel.json     ← Pengaturan link nama tamu (site.com/NamaTamu)
├── favicon.svg     ← Ikon kecil di tab browser
├── docs/           ← Tangkapan layar untuk dokumentasi ini
└── README.md       ← File panduan yang sedang Anda baca
```

## 🚀 Cara Menampilkan Website Online

> 💡 *Istilah **"deploy"** = meng-online-kan website supaya bisa dibuka orang lain lewat link.
> Semua cara di bawah **gratis**.*

### Cara 1 — Tanpa GitHub (paling cepat, ±2 menit)

1. Buka **[vercel.com/new](https://vercel.com/new)** lalu login (bisa dengan akun GitHub/Email).
2. Seret (**drag & drop**) seluruh folder proyek ini ke area bertuliskan *deploy*.
3. Tunggu ±30 detik sampai muncul tulisan **Congratulations**.
4. Selesai! Link website Anda contohnya: `https://undangan-dian-iqbal.vercel.app`

### Cara 2 — Lewat GitHub + Vercel (bisa update otomatis)

Cocok jika website sudah ada di GitHub (seperti repo ini):

1. Buka **[vercel.com/new](https://vercel.com/new)**.
2. Klik **Import Git Repository** → pilih repo `undangan-dian-iqbal`.
3. Biarkan semua pengaturan apa adanya → klik **Deploy**.
4. Selesai. **Bonus:** setiap kali file di GitHub diubah, website otomatis ikut ter-update.

> 🌐 **Ingin domain sendiri?** Misal `undangan.dianiqbal.com` — atur di
> *Project → Settings → Domains* di dashboard Vercel (domain berbayar, sekitar ±150 ribu/tahun).

## ✏️ Cara Mengubah Data Undangan

Buka file terkait dengan editor teks apa pun (Notepad pun bisa, tapi disarankan
[VS Code](https://code.visualstudio.com)), cari teks yang mau diubah, simpan, lalu unggah ulang.

| Yang Ingin Diubah | File | Petunjuk |
|---|---|---|
| 🔢 **Nomor rekening & e-wallet** | `script.js` | Bagian `CONFIG` paling atas — ganti angka contoh `1234567890` & `0812-xxxx-xxxx` |
| 🏠 **Alamat kirim kado** | `script.js` | Bagian `CONFIG.giftAddress` |
| 🕐 **Jam akad & resepsi** | `index.html` | Cari `Pukul 08.00` lalu ubah |
| 📝 **Nama & biodata mempelai** | `index.html` | Cari nama `Dian` / `Iqbal` |
| 🖼️ **Foto & galeri** | `index.html` | Ganti alamat `https://i.pinimg.com/...` dengan URL foto Anda (harus online, mis. di [Imgur](https://imgur.com) atau GitHub) |
| 🎵 **Lagu** | `script.js` | `CONFIG.youtubeVideoId` — isi kode 11 karakter dari link YouTube (contoh: `youtube.com/watch?v=`**`In8kDy_WU4s`**) |
| 🎨 **Warna tema** | `style.css` | Bagian `:root` paling atas (`--rose-500`, `--gold-500`, dst.) |

> ⚠️ **Penting sebelum disebar:** nomor rekening, nomor e-wallet, dan alamat kado masih
> **data contoh** — wajib diganti dengan data asli terlebih dahulu!

## 💌 Cara Mengirim Undangan ke Tamu

Tinggal tambahkan nama tamu di belakang link. Dua format sama hasilnya:

| Format | Contoh |
|---|---|
| **Dengan `?to=`** *(disarankan, paling aman)* | `https://site-anda.vercel.app/?to=Budi%20Santoso` |
| **Dengan garis miring** | `https://site-anda.vercel.app/Budi-Santoso` |

Keterangan ringkas:

- Spasi ditulis `%20` (format 1) atau gunakan tanda hubung `-` (format 2) — keduanya otomatis
  tampil sebagai spasi di undangan.
- Contoh untuk WhatsApp:
  `Kepada Yth. Bapak Budi, mohon kesediaan hadir pada pernikahan kami 🌸 https://site-anda.vercel.app/?to=Bapak%20Budi`
- Jika link dibuka **tanpa** nama, sampul menampilkan tulisan "Tamu Undangan".

## 🎵 Tentang Musik Latar

Lagu diputar langsung dari **YouTube** (lagu *Mahalini x Nuca — Janji Kita*) memakai pemutar
tersembunyi, sehingga tidak perlu file MP3 dan tidak memperbesar ukuran website.

Catatan kecil: sebagian HP (terutama iPhone) membatasi bunyi otomatis — karena itu musik sengaja
dimulai tepat saat tamu **menekan tombol "Buka Undangan"** (tindakan menekan tombol dianggap
izin oleh browser). Tombol **putar/jeda** melayang tetap tersedia di kanan atas.

## 📊 Menyimpan Ucapan Tamu ke Google Sheets (Opsional)

Saat ini setiap ucapan tamu tersimpan di HP tamu itu sendiri. Jika ingin **semua ucapan terkumpul
dalam satu spreadsheet**:

1. Buat Google Sheet baru → menu **Extensions → Apps Script**.
2. Tempel kode berikut, ganti `GANTI_ID_SHEET` dengan ID Sheet Anda (deretan huruf di URL sheet
   antara `/d/` dan `/edit`):

   ```js
   function doPost(e) {
     const sh = SpreadsheetApp.openById('GANTI_ID_SHEET').getSheets()[0];
     const d = JSON.parse(e.postData.contents);
     sh.appendRow([new Date(), d.name, d.attend, d.guests, d.message]);
     return ContentService.createTextOutput(JSON.stringify({ ok: true }))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```

3. Klik **Deploy → New deployment → Web app** → *Who has access* pilih **Anyone** → salin URL `/exec`.
4. Buka `script.js`, tempel URL tersebut di `CONFIG.rsvpWebAppUrl` (awali `https://`), lalu deploy ulang.

Selesai — setiap ucapan tamu otomatis masuk ke sheet berisi waktu, nama, kehadiran, jumlah tamu, dan isinya.

## ❓ Pertanyaan yang Sering Diajukan

<details>
<summary><b> Musik tidak bunyi, kenapa?</b></summary>

Pastikan volume HP menyala dan tidak dalam mode senyap. Di iPhone, musik mulai setelah tombol
"Buka Undangan" ditekan. Jika tetap tidak bunyi, tekan tombol musik (ikon nada) di kanan atas.
</details>

<details>
<summary><b> Nama tamu tidak muncul di sampul?</b></summary>

Periksa penulisan link — harus ada <code>?to=Nama</code> di belakang alamat, contoh:
<code>?to=Budi%20Santoso</code>. Tanpa itu, sampul menampilkan "Tamu Undangan".
</details>

<details>
<summary><b> Foto galeri bisa diganti punya sendiri?</b></summary>

Bisa. Ganti alamat gambar di <code>index.html</code> bagian galeri dengan URL foto Anda yang sudah
online. Foto lokal harus diunggah dulu (mis. ke repo GitHub ini lalu panggil path-nya).
</details>

<details>
<summary><b> Apakah website ini gratis selamanya?</b></summary>

Ya. Vercel menyediakan hosting gratis untuk website statis seperti ini tanpa batas waktu.
Yang berbayar hanya jika Anda membeli domain kustom.
</details>

<details>
<summary><b> Bagaimana mengubah nama tamu menjadi "Keluarga Bapak X"?</b></summary>

Tinggal tulis lengkap di link: <code>?to=Keluarga%20Bapak%20X</code> — semua karakter huruf dan
angka aman digunakan.
</details>

## 🙏 Kredit

- **Font** — [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond),
  [Great Vibes](https://fonts.google.com/specimen/Great+Vibes),
  [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans),
  [Amiri](https://fonts.google.com/specimen/Amiri) via Google Fonts.
- **Musik** — *Janji Kita* — Mahalini x Nuca (dimutar via YouTube).
- **Foto** — bersumber dari [Pinterest](https://pinterest.com) untuk keperluan demonstrasi;
  seluruh hak milik pemilik masing-masing. Silakan ganti dengan foto Anda sendiri.
- **Ikon & ornamen** — SVG buatan sendiri: gunungan (Jawa), motif songket (Minang), batik kawung.

---

<div align="center">

**Dian ❤️ Iqbal** — 10 . 01 . 2027

*Undangan ini dibuat dengan penuh cinta dan doa.* 🤍

</div>
