# Email Generator Pro

Aplikasi web modern untuk generate varian email dengan berbagai metode. Sempurna untuk testing, managing multiple accounts, atau kebutuhan development. Interface responsif yang bekerja seamless di semua perangkat.

## Daftar Isi

- [Fitur Utama](#fitur-utama)
- [Metode Email](#metode-email)
- [Cara Penggunaan](#cara-penggunaan)
- [Fitur Advanced](#fitur-advanced)
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

#### 1. Plus Method (+) - ADVANCED
Menambahkan suffix dengan 3 mode berbeda:

**Mode Angka** (Sequential)
```
contoh+1@gmail.com
contoh+2@gmail.com
contoh+3@gmail.com
```

**Mode Huruf** (Random Letters)
```
contoh+kdjsalwoxmnvbqpzr@gmail.com
contoh+qweryuiopasdfghjklz@gmail.com
```

**Mode Campur** (Random Letters + Numbers)
```
contoh+k8j3s9a2l4w7o1x5@gmail.com
contoh+a9s8d7f6g5h4j3k2@gmail.com
```

Panjang karakter untuk mode Huruf dan Campur bisa diatur dari **5-50 karakter** (default: 20).

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

**Kombinasi Uppercase + Lowercase**: Random case pada setiap karakter
```
CoNtOh@gmail.com
cOnToH@gmail.com
```

### Metode Domain

#### 5. Random Case (Domain)
Mengubah domain (setelah @) dengan kombinasi huruf besar dan kecil secara random.
```
contoh@GmAiL.cOm
contoh@gMAIl.Com
contoh@GMail.COM
```

### Kombinasi Metode Maksimal

Gabungkan semua metode untuk variasi unlimited:
- `Plus + Dot`: `con.toh+k8j3s9a2@gmail.com`
- `Plus (Campur) + Uppercase`: `CONTOH+a9s8d7f6@gmail.com`
- `Plus (Huruf) + Random Domain`: `contoh+kdjsalwoxmnv@GmAiL.cOm`
- `Dot + Random Case (Username + Domain)`: `CoN.tOh@gMAIl.Com`
- `ALL COMBINED`: `CON.TOH+a9s8d7f6g5h4@GmAiL.cOm`

## Cara Penggunaan

### Langkah Dasar
1. Input username atau email lengkap (contoh: `johndoe` atau `johndoe@gmail.com`)
2. Pilih domain email (default: `gmail.com`)
3. Aktifkan metode yang diinginkan dengan klik tombol metode
4. **Plus Method**: Pilih mode (Angka/Huruf/Campur) dan atur panjang karakter
5. Pilih mode Single atau Bulk
6. Klik tombol Generate

### Mode Bulk Detail
1. Set nomor awal di field "Mulai dari Nomor"
2. Tentukan jumlah email di field "Jumlah Email" (max: 1,000,000)
3. (Opsional) Klik "Preview" untuk melihat 5 email pertama
4. Klik "Buat" untuk generate semua email
5. Gunakan tombol "Salin" untuk copy ke clipboard atau "Download" untuk save sebagai file

### Tips Pro
- Gunakan tombol "Reset Counter" untuk mengulang nomor urut dari 1
- Mode Campur (huruf + angka) menghasilkan email paling unique
- Kombinasikan Plus Mode Campur + Dot + Random Case untuk hasil maksimal
- History menyimpan semua email yang pernah dibuat (tersimpan di browser)
- Template memungkinkan save kombinasi metode favorit untuk digunakan kembali

## Fitur Advanced

### Plus Method dengan 3 Mode
- **Angka**: Sequential numbering (1, 2, 3...)
- **Huruf**: Random string huruf lowercase (5-50 karakter)
- **Campur**: Random kombinasi huruf + angka (5-50 karakter)

Slider interaktif untuk mengatur panjang karakter saat mode Huruf atau Campur aktif.

### History Management
- Menyimpan seluruh riwayat email yang dibuat
- Data tersimpan di localStorage browser
- Bisa dihapus kapan saja dengan tombol "Hapus Semua"
- Toggle visibility dengan tombol History di header

### Template System
Simpan kombinasi metode favorit:
1. Pilih kombinasi metode yang diinginkan
2. Atur Plus Mode dan panjang karakter
3. Klik "Simpan Template"
4. Beri nama template (contoh: "Max Security", "Testing Mode")
5. Load template dengan klik nama yang tersimpan
6. Hapus template dengan klik icon X

**Catatan**: Template menyimpan semua pengaturan termasuk Plus Mode dan panjang karakter.

### Dark Mode
Interface otomatis menyesuaikan dengan preferensi tema. Toggle manual tersedia di header dengan icon sun/moon. Preferensi tersimpan otomatis.

### Validasi Email
Sistem otomatis memvalidasi format email sebelum proses generate. Error message akan muncul jika format tidak valid.

### Social Links
Akses cepat ke developer profiles:
- Facebook: [@iqraa07](https://www.facebook.com/iqraa07)
- GitHub: [@iqraa07](https://github.com/iqraa07)

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
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3
- **Icons**: Lucide React
- **State Management**: React Hooks (useState, useEffect)
- **Storage**: Browser localStorage API
- **Database**: Supabase (optional, untuk sync fitur)

## Deployment

Aplikasi ini adalah static site dan bisa dideploy di berbagai platform:
- **Vercel** (recommended - zero config)
- **Netlify** (auto deploy from Git)
- **GitHub Pages**
- **Cloudflare Pages**
- **Firebase Hosting**

Cukup build project dan upload folder `dist/` ke hosting pilihan.

### Deploy ke Vercel (Cepat)
```bash
npm install -g vercel
vercel
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Use Cases

### Testing & Development
- Test registrasi multiple accounts dengan email yang valid
- Bypass email limit untuk testing automation
- QA testing dengan variasi email format

### Account Management
- Manage multiple accounts dari satu email utama
- Organisasi email berdasarkan service/platform
- Filter email otomatis berdasarkan suffix

### Privacy & Security
- Generate email unique untuk setiap service
- Track mana service yang leak email address
- Easy unsubscribe dengan block specific suffix

## Performance

- Generate 1000 email: ~50ms
- Generate 100,000 email: ~2 detik
- Generate 1,000,000 email: ~20 detik

## Roadmap

- [ ] Export ke CSV format
- [ ] Custom domain support
- [ ] Batch import dari file
- [ ] Cloud sync dengan Supabase
- [ ] Email verification checker
- [ ] Chrome extension

## License

MIT License - silakan gunakan untuk project personal maupun komersial.

## Contributing

Pull requests are welcome! Untuk perubahan major, buka issue terlebih dahulu untuk diskusi.

---

**Dibuat oleh [Iqra](https://github.com/iqraa07)** | Dikembangkan dengan fokus pada UX dan performa optimal
