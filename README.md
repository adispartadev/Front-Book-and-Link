# Pendahuluan

Project ini menggunakan Nextjs dalam pengembangannya. Sebelum menjalankan project ini, silahkan atur beberapa konfigurasi.

Pada file `next.config.js` sesuaikan variable `apiUrl` sesuai dengan api di hosting.
```
/**  @type  {import('next').NextConfig}  */
const  nextConfig  = {
	env: {
		apiUrl: 'http://localhost:8002',
	},
}
module.exports  = nextConfig
``` 

Selanjutnya, setelah konfigurasi disesuaikan. Jalankan perintah berikut untuk menjalankan project ini:
```
npm run dev

# atau

yarn dev
```
