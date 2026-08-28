# Proyecto Fortaleza & Legado

Landing comercial B2B (Next.js App Router + TypeScript + Tailwind v3) para el programa
**Proyecto Fortaleza & Legado** de **Vangelis Happiness Partners** en alianza con **Fenalco
Santander**.

## Arranque

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # build de producción
npm run lint    # ESLint
```

## Variables de entorno

Copia `.env.example` a `.env.local` y completa los valores reales (no se versionan):

```
RESEND_API_KEY=
LEADS_TO_EMAIL=
LEADS_FROM_EMAIL=
CRM_WEBHOOK_URL=
```

El endpoint `app/api/contacto/route.ts` intenta, en orden y de forma independiente:
1. Enviar el lead por correo con [Resend](https://resend.com) si `RESEND_API_KEY` existe.
2. Reenviarlo a `CRM_WEBHOOK_URL` si existe.
3. Si ninguna está configurada (como en desarrollo), lo registra con `console.info`.

Incluye honeypot (`website`), rechazo de envíos en menos de 3s (`_ts`) y rate limit en
memoria (3 envíos / 60s / IP, best-effort en serverless).

## Estructura

- `content/fortaleza-legado.ts` — única fuente de todo el copy de la landing, tipado por
  sección. La tabla de alcance (§18) usa un tipo que deliberadamente no admite campos de
  precio/monto.
- `components/ui/` — componentes base de presentación (Section, Kicker, SectionTitle, Rule,
  Quote, NumberedCard, Button).
- `components/sections/` — una sección por bloque de la landing (S2–S19).
- `components/Header.tsx`, `components/Footer.tsx` — cobranding Vangelis + Fenalco Santander.
- `components/VideoVertical.tsx`, `Accordion.tsx`, `ProgramTabs.tsx`, `ContactForm.tsx` —
  únicos Client Components de la app; todo lo demás es Server Component.
- `lib/schemas/contacto.ts` — schema `zod` compartido entre el formulario y el endpoint.

## Assets pendientes

Ver [`public/README.md`](public/README.md): póster del video (falta `ffmpeg` en este
entorno), favicon de marca y `og-fortaleza-legado.png`.

## Pendientes de negocio

- Número de WhatsApp y correo de contacto reales: `lib/contactChannels.ts` (constantes vacías
  con `// TODO: confirmar`; los botones correspondientes están ocultos mientras estén vacías).
- Variables de entorno reales de `.env.local`.
