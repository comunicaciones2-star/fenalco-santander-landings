# Fenalco Santander — Landing pages

Landing pages públicas de eventos de Fenalco Santander. Cada archivo `.html` en
la raíz es un sitio de una sola página, autocontenido (imágenes incrustadas
como `data:` URI), sin build ni framework.

No incluye backend propio: los formularios de inscripción enlazan al
[satélite de inscripciones](https://github.com/comunicaciones2-star/nexo-satelite-inscripciones),
que a su vez habla con la API pública de NEXO. Estas páginas solo enlazan hacia
ese satélite — no llaman a ninguna API por JavaScript, así que no necesitan
configurar CORS ni variables de entorno.

## Páginas

| Archivo | Evento |
|---|---|
| `cobranza-2-0.html` | Cobranza 2.0: Protegiendo el Flujo de Caja de tu Empresa (11 ago 2026) |
| `mesa-sectorial-educativa.html` | Mesa Sectorial de Instituciones Educativas y de Idiomas |

## Despliegue

Vercel, plan gratuito (Hobby). Proyecto importado directo desde este repo:

- Root Directory: `.`
- Framework Preset: *Other*
- Build Command / Output Directory: por defecto (vacíos)

`vercel.json` activa `cleanUrls`, así que cada página queda disponible sin la
extensión `.html` (ej. `/cobranza-2-0`).

Cada push a `main` redeploya automáticamente.

## Agregar una landing nueva

1. Crear el archivo `.html` autocontenido en la raíz (sin dependencias
   externas de imágenes — usar `data:` URI o un CDN público).
2. Si el evento tiene inscripción, enlazar al formulario público del satélite
   de NEXO correspondiente (`/f/:slug`), no llamar a la API de NEXO directo.
3. Commit + push a `main`. Vercel lo publica solo.

## Qué NO va en este repo

Landings con backend propio (ej. `ssr-2026`, que maneja pagos con Rapyd y
proxya la API de NEXO) viven en `fenalco-crm/landing/` y se despliegan aparte
como servicio con backend (Render Web Service), no como sitio estático aquí.
