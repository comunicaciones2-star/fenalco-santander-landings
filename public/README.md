# Pendientes de assets — Proyecto Fortaleza & Legado

## Resueltos con archivos reales

- **Logos Vangelis** (`logos/vangelis-blanco.svg`, `logos/vangelis-color.svg`): tomados de
  `Logo Vangelis Happiness Partners 3.svg` (fill `#f0dceb`, uso en fondos oscuros) y
  `Logo Vangelis Happiness Partners 1.svg` (fill `#191946`, uso en fondos claros).
- **Logos Fenalco Santander** (`logos/fs-logo-horizontal-blanco.svg`,
  `logos/fs-logo-horizontal-negro.svg`): tomados de `FS-Logo-Horizontal_B.svg` y
  `FS-Logo-Horizontal_N.svg` en `identidad-fenalco/assets/logos/svg/`. También se copió
  `fs-logo-horizontal-color.svg` (`_CB.svg`) por si el contraste del `_N` no fuera suficiente
  sobre `cream-50`/`cream-100` — no está en uso actualmente, revisar visualmente y cambiar si
  hace falta.
- **Póster del video** (`video/poster-vangelis.jpg`): generado con `ffmpeg` (instalado vía
  winget) extrayendo el frame del segundo 15 del propio video — es el primer tramo sin
  subtítulos incrustados.
- **Favicon** (`app/icon.svg`): copiado desde
  `10 EVENTOS 2026/10 VANGELIS/13 Landing - Proyecto Fortaleza - Legado/favicon.svg`. Next.js
  lo sirve automáticamente por convención de archivo.
- **Foto de Octavio Llamas** (`images/octavio-llamas.png`): cutout real con canal alfa
  (verificado: PNG color type 6, truecolor+alpha), usado en el Hero.

## Pendientes reales

1. **`og-fortaleza-legado.png`** (1200×630, para Open Graph/Twitter Card): no existe. La
   metadata en `app/layout.tsx` ya referencia `/og-fortaleza-legado.png` — falta exportar la
   imagen desde el diseño de marca y colocarla en `public/`.
2. **`apple-touch-icon.png`**: no existe. El favicon SVG cubre navegadores modernos, pero iOS
   sigue usando este archivo aparte para "añadir a inicio".
