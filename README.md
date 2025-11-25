# Email Generator

Website untuk membuat varian email dengan berbagai metode. Cocok untuk testing, registrasi multiple account, atau keperluan lainnya. Responsif untuk semua device (HP, tablet, PC).

## Fitur

### Mode Satu
Buat satu email sekaligus dan langsung tersalin otomatis ke clipboard. Cocok untuk daftar akun dengan cepat.

### Mode Banyak
Generate banyak email sekaligus (default 100 email). Bisa setting:
- Mulai dari nomor berapa
- Mau berapa banyak (max 1 juta email)

### Empat Metode (Bisa Digabung!)

#### Metode Plus (+)
Format: `username+1@gmail.com`, `username+2@gmail.com`, dst.

Semua email dengan trik plus akan masuk ke inbox yang sama. Jadi `testing+1@gmail.com` dan `testing+2@gmail.com` akan masuk ke `testing@gmail.com`.

#### Metode Titik (.)
Format: `user.name@gmail.com`, `u.sername@gmail.com`, `us.er.name@gmail.com`

Titik akan diacak secara random di username. Gmail anggap semua variasi titik sebagai email yang sama. Jadi `username@gmail.com`, `user.name@gmail.com`, dan `u.s.e.r.name@gmail.com` akan masuk ke inbox yang sama.

#### Uppercase
Ubah semua huruf jadi KAPITAL. Contoh: `USERNAME@gmail.com`

#### Lowercase
Ubah semua huruf jadi kecil. Contoh: `username@gmail.com`

### Gabungan Metode
Kamu bisa aktifkan beberapa metode sekaligus! Contoh kombinasi:
- **Plus + Dot**: `user.name+1@gmail.com`
- **Plus + Uppercase**: `USERNAME+1@gmail.com`
- **Dot + Lowercase**: `user.name@gmail.com`
- **Plus + Dot + Uppercase**: `USER.NAME+1@gmail.com`
- **Uppercase + Lowercase**: `UsErNaMe@gmail.com` (random case tiap huruf)

## Fitur Tambahan

### Download Bulk Email
Di mode banyak, hasil email bisa didownload jadi file `.txt`. Cocok untuk disimpan atau diimport ke aplikasi lain.

### Reset Counter
Kalau pakai metode Plus, nomor urut otomatis bertambah tiap generate. Klik tombol Reset untuk mulai lagi dari 1.

## Cara Pakai

1. **Masukkan Username** - Isi username email (tanpa @gmail.com)
2. **Pilih Domain** - Default gmail.com, bisa diganti sesuai kebutuhan
3. **Pilih Metode** - Klik tombol metode yang mau dipakai (bisa lebih dari satu)
4. **Pilih Mode** - Satu atau Banyak
5. **Klik Generate** - Email langsung dibuat dan tersalin otomatis

### Mode Banyak
Kalau pakai mode banyak:
1. Isi **Mulai dari Nomor** - Misalnya mulai dari 1
2. Isi **Jumlah Email** - Mau bikin berapa email (default 100)
3. Klik **Buat** - Semua email langsung muncul
4. Klik **Salin** - Copy semua email sekaligus
5. Atau klik **Download** - Download sebagai file .txt

## Teknologi

- React + TypeScript
- Vite
- Tailwind CSS
- Lucide Icons

## Install & Run

```bash
npm install
npm run dev
```

## Build Production

```bash
npm run build
```

Hasil build ada di folder `dist/`.

## Deploy

Bisa dideploy di:
- Vercel
- Netlify
- GitHub Pages
- Atau hosting static lainnya

---

Dibuat oleh Iqra
