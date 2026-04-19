# Civil Premium Demo

Landing comercial one-page para ingeniería civil, optimizada para presentación comercial y portafolio.

## Stack
- Next.js 16
- TypeScript
- Tailwind CSS 4

## Scripts
```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Deploy en Vercel
1. Importar el repositorio en Vercel.
2. Definir la variable `NEXT_PUBLIC_SITE_URL` con el dominio final (por ejemplo, `https://tudominio.com`).
3. Ejecutar deploy con configuración por defecto de Next.js.

La variable `NEXT_PUBLIC_SITE_URL` se usa para canonical, Open Graph, `robots` y `sitemap`.

## Variante demo
- Ruta principal: `/`
- Variante demo para presentaciones: `/demo`

## Estructura
La arquitectura del proyecto y el plan del patch están documentados en:
- `docs/ARCHITECTURE.md`
- `docs/PATCH_PLAN.md`
