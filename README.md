# Form Input HM Pelatihan - Web App

Aplikasi web untuk pencatatan data pelatihan HM yang berfungsi sebagai Progressive Web App (PWA).

## Fitur Utama

✅ **Progressive Web App (PWA)**

- Bisa diinstal ke home screen
- Offline support
- Native app-like experience

✅ **Form Management**

- Input data pelatihan
- Edit data yang sudah ada
- Modal selector untuk memilih data
- Validasi form lengkap

✅ **Status Online/Offline**

- Indikator status koneksi real-time
- Notice saat offline
- Install button untuk PWA

## File Structure

```
Input HM/
├── Home.html          # File HTML utama dengan all-in-one app
├── manifest.json      # PWA manifest file
├── sw.js             # Service Worker untuk caching & offline support
└── README.md         # File ini
```

## Setup & Hosting

### Untuk Development Lokal:

1. Pastikan file berada di folder yang bisa diakses via HTTP (bukan file://)
2. Gunakan local server, contoh:

   ```bash
   # Python 3
   python -m http.server 8000

   # Node.js dengan http-server
   npx http-server
   ```

3. Buka di browser: `http://localhost:8000/Home.html`

### Untuk Production:

1. Upload semua file ke hosting yang mendukung HTTPS
2. Pastikan manifest.json dapat diakses
3. Service worker akan ter-register otomatis

## Cara Menggunakan

### Install App

1. Buka aplikasi di browser
2. Klik tombol "Install App" (jika ada)
3. Ikuti instruksi browser
4. App akan ter-install di home screen

### Menambah Data

1. Isi semua form sesuai kebutuhan
2. Klik tombol "Kirim"
3. Data akan dikirim ke Google Apps Script

### Edit Data

1. Klik tombol "Edit"
2. Pilih data dari modal selector
3. Data akan ter-load di form
4. Lakukan perubahan
5. Klik "Update" untuk menyimpan

## API Integration

Aplikasi terhubung ke Google Apps Script dengan endpoints:

- `?action=getEditable` - GET list data yang bisa diedit
- `?action=update` - POST untuk update data
- Default - POST untuk insert data baru

## Status Indicator

🟢 **Online** - Terhubung ke internet  
🔴 **Offline** - Tidak terhubung, perubahan akan disimpan saat kembali online

## Browser Support

- ✅ Chrome/Edge (v50+)
- ✅ Firefox (v44+)
- ✅ Safari (v11.1+)
- ✅ Mobile browsers (iOS Safari, Chrome Android)

## PWA Capabilities

- 📲 Install ke home screen
- 🔄 Auto-update dengan service worker
- 📡 Network-first strategy dengan cache fallback
- 💾 Persistent storage
- 🌐 Offline functionality

---

Dikembangkan sebagai Progressive Web App untuk kemudahan akses dan offline support.
