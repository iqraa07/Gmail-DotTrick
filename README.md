# Email Generator

Tool berbasis web untuk membuat varian email menggunakan berbagai metode. Berguna untuk testing aplikasi, managing multiple accounts, atau kebutuhan development lainnya. Interface responsif yang bekerja sempurna di semua perangkat.

## Daftar Isi

- [Fitur Utama](#fitur-utama)
- [Metode Email](#metode-email)
- [Cara Penggunaan](#cara-penggunaan)
- [Fitur Tambahan](#fitur-tambahan)
- [Setup & Development](#setup--development)
- [Tech Stack](#tech-stack)

## Fitur Utama

### Mode Single
Generate satu email dan otomatis tersalin ke clipboard. Ideal untuk registrasi cepat atau testing sederhana.

### Mode Bulk
Buat ratusan hingga jutaan email sekaligus dengan kontrol penuh:
- Tentukan nomor awal (start number)
- Atur jumlah email yang ingin dibuat (hingga 1 juta)
- Preview 5 email pertama sebelum generate semua
- Download hasil dalam format .txt

## Metode Email

Generator ini menyediakan berbagai metode yang bisa dikombinasikan sesuai kebutuhan:

### Metode Username

#### 1. Plus Method (+)
Menambahkan suffix numerik setelah tanda plus.
```
contoh+1@gmail.com
contoh+2@gmail.com
contoh+3@gmail.com
```
Semua email dengan plus masuk ke inbox yang sama (`contoh@gmail.com`).

#### 2. Dot Method (.)
Menyisipkan titik secara random pada username.
```
con.toh@gmail.com
c.ontoh@gmail.com
co.nt.oh@gmail.com
```
Gmail memperlakukan semua variasi titik sebagai alamat yang identik.

#### 3. Uppercase (Username)
Mengubah karakter username menjadi huruf kapital.
```
CONTOH@gmail.com
```

#### 4. Lowercase (Username)
Mengubah karakter username menjadi huruf kecil.
```
contoh@gmail.com
```

### Metode Domain

#### 5. Uppercase (Domain)
Mengubah domain (setelah @) menjadi huruf kapital.
```
contoh@GMAIL.COM
```

#### 6. Lowercase (Domain)
Mengubah domain (setelah @) menjadi huruf kecil.
```
contoh@gmail.com
```

### Kombinasi Metode
Gabungkan beberapa metode untuk variasi maksimal:
- `Plus + Dot`: `con.toh+1@gmail.com`
- `Plus + Uppercase (Username)`: `CONTOH+1@gmail.com`
- `Plus + Uppercase (Domain)`: `contoh+1@GMAIL.COM`
- `Uppercase (Username) + Lowercase (Username)`: `CoNtOh@gmail.com` (random case username)
- `Uppercase (Domain) + Lowercase (Domain)`: `contoh@GmAiL.cOm` (random case domain)
- `Plus + Dot + Uppercase (Username) + Uppercase (Domain)`: `CON.TOH+1@GMAIL.COM`

## Cara Penggunaan

### Langkah Dasar
1. Input username tanpa domain (contoh: `johndoe`)
2. Pilih domain email (default: `gmail.com`)
3. Aktifkan metode yang diinginkan dengan klik checkbox
4. Pilih mode Single atau Bulk
5. Klik tombol Generate

### Mode Bulk Detail
1. Set nomor awal di field "Mulai dari Nomor"
2. Tentukan jumlah email di field "Jumlah Email"
3. (Opsional) Klik "Preview" untuk melihat 5 email pertama
4. Klik "Buat" untuk generate semua email
5. Gunakan tombol "Salin" untuk copy ke clipboard atau "Download" untuk save sebagai file

### Tips
- Gunakan tombol "Reset Counter" untuk mengulang nomor urut dari 1
- History menyimpan semua email yang pernah dibuat (tersimpan di browser)
- Template memungkinkan save kombinasi metode favorit untuk digunakan kembali

## Fitur Tambahan

### History Management
- Menyimpan seluruh riwayat email yang dibuat
- Data tersimpan di localStorage browser
- Bisa dihapus kapan saja dengan tombol "Hapus Semua"
- Toggle visibility dengan tombol History di header

### Template System
Simpan kombinasi metode favorit:
1. Pilih kombinasi metode yang diinginkan
2. Klik "Simpan Template"
3. Beri nama template
4. Load template dengan klik nama yang tersimpan
5. Hapus template dengan klik icon X

**Catatan**: Template tersimpan di localStorage browser. Data akan hilang jika clear browser data, menggunakan mode incognito, atau berganti browser/device.

### Dark Mode
Interface otomatis menyesuaikan dengan preferensi tema. Toggle manual tersedia di header dengan icon sun/moon. Preferensi tersimpan otomatis.

### Validasi Email
Sistem otomatis memvalidasi format email sebelum proses generate. Error message akan muncul jika format tidak valid.

## Setup & Development

### Prerequisites
- Node.js versi 16 atau lebih tinggi
- npm atau yarn

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Aplikasi akan berjalan di `http://localhost:5173`

### Build Production
```bash
npm run build
```
Output tersimpan di folder `dist/`

### Type Checking
```bash
npm run typecheck
```

### Linting
```bash
npm run lint
```

## Tech Stack

- **Framework**: React 18 dengan TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Hooks (useState, useEffect)
- **Storage**: Browser localStorage API

## License

MIT License - silakan gunakan untuk project personal maupun komersial.