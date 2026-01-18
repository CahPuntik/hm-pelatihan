# DEPLOY KE GITHUB PAGES

## Step 1: Buat Repository di GitHub

1. Buka https://github.com/new
2. Nama repository: `hm-pelatihan` (atau nama lain sesuai keinginan)
3. Buat repository (public agar bisa diakses semua orang)

## Step 2: Setup Git di Folder Local

Buka PowerShell/Terminal di folder `d:\Input HM\` dan jalankan:

```powershell
# Inisialisasi git repository
git init

# Tambahkan semua file
git add .

# Commit pertama
git commit -m "Initial commit: HM Pelatihan PWA"

# Tambahkan remote (ganti USERNAME dengan username GitHub Anda)
git remote add origin https://github.com/USERNAME/hm-pelatihan.git

# Ubah branch ke main (jika perlu)
git branch -M main

# Push ke GitHub
git push -u origin main
```

## Step 3: Enable GitHub Pages

1. Buka repository Anda di GitHub
2. Klik **Settings** → **Pages**
3. Di bagian **Source**, pilih:
   - Branch: `main`
   - Folder: `/ (root)`
4. Klik **Save**

GitHub akan generate URL seperti: `https://USERNAME.github.io/hm-pelatihan/`

## Step 4: Update manifest.json (Opsional)

Jika ingin fix URL di manifest.json:

```json
"start_url": "/hm-pelatihan/",
"scope": "/hm-pelatihan/",
```

Tapi jika deploy ke custom domain atau subdomain, sesuaikan pathnya.

## Step 5: Akses Aplikasi

Buka: `https://USERNAME.github.io/hm-pelatihan/`

---

## Update Kode & Deploy Ulang

Setelah ada perubahan:

```powershell
git add .
git commit -m "Deskripsi perubahan"
git push origin main
```

GitHub Pages akan auto-update dalam beberapa detik.

---

## Tips Penting

✅ **HTTPS otomatis** - GitHub Pages menyediakan HTTPS gratis  
✅ **PWA compatible** - Service Worker akan bekerja dengan sempurna  
✅ **Deploy instan** - Perubahan live dalam hitungan detik  
✅ **Free hosting** - Tidak ada biaya

---

## Troubleshooting

**Jika pages tidak muncul:**

- Tunggu 5 menit setelah enable pages
- Cek di Settings > Pages sudah benar
- Pastikan file index.html ada (atau update start_url di manifest)

**Jika PWA tidak bisa install:**

- Pastikan HTTPS aktif (check icon lock di browser)
- Verify manifest.json valid (check browser console)
- Service Worker harus ter-register (check Application tab di DevTools)

---

Sudah siap deploy? Mari mulai dari Step 2! 🚀
