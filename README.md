# Proyek Autentikasi

Proyek ini adalah aplikasi autentikasi lengkap yang terdiri dari backend Node.js (Express) dan frontend React (Vite).

## Struktur Proyek

- `backend/`: Berisi kode sisi server untuk API autentikasi.
- `frontend-react/`: Berisi kode sisi klien untuk antarmuka pengguna.

## Backend (Node.js dengan Express)

### Deskripsi

Backend dibangun menggunakan Node.js dan framework Express. Ini menyediakan API untuk pendaftaran pengguna, login, dan manajemen sesi.

### Instalasi

1. Navigasi ke direktori `backend`:
   ```bash
   cd backend
   ```
2. Instal dependensi:
   ```bash
   npm install
   ```
3. Buat file `.env` di direktori `backend` dan tambahkan variabel lingkungan yang diperlukan (misalnya, `JWT_SECRET`, `MONGO_URI`).

### Menjalankan Aplikasi

Untuk menjalankan server backend:
```bash
npm start
```

Server akan berjalan di `http://localhost:5000` (atau port yang dikonfigurasi).

## Frontend (React dengan Vite)

### Deskripsi

Frontend dibangun menggunakan React dan Vite untuk pengalaman pengembangan yang cepat. Ini menyediakan antarmuka pengguna untuk berinteraksi dengan API autentikasi backend.

### Instalasi

1. Navigasi ke direktori `frontend-react`:
   ```bash
   cd frontend-react
   ```
2. Instal dependensi:
   ```bash
   npm install
   ```

### Menjalankan Aplikasi

Untuk menjalankan aplikasi frontend:
```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173` (atau port yang dikonfigurasi).

## Penggunaan

1. Pastikan backend berjalan.
2. Pastikan frontend berjalan.
3. Akses aplikasi frontend di browser Anda dan gunakan fitur pendaftaran/login.