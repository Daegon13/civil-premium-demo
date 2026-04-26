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

## Ajustes manuales del Hero 3D

Puedes tunear cámara y caja del modelo desde `.env.local`:

```bash
NEXT_PUBLIC_HERO_CAMERA_DISTANCE_FACTOR=1
NEXT_PUBLIC_HERO_STAGE_ASPECT_RATIO="15 / 10"
NEXT_PUBLIC_HERO_STAGE_MIN_HEIGHT_REM=19
NEXT_PUBLIC_HERO_STAGE_MAX_HEIGHT_REM=26
NEXT_PUBLIC_HERO_USE_CAMERA_RIG=false
```

- `NEXT_PUBLIC_HERO_CAMERA_DISTANCE_FACTOR`: controla alejamiento de cámara (`>1` aleja, `<1` acerca).
- `NEXT_PUBLIC_HERO_STAGE_ASPECT_RATIO`: relación ancho/alto del bloque 3D.
- `NEXT_PUBLIC_HERO_STAGE_MIN_HEIGHT_REM` y `NEXT_PUBLIC_HERO_STAGE_MAX_HEIGHT_REM`: límites de altura del contenedor.
- `NEXT_PUBLIC_HERO_USE_CAMERA_RIG`: activa/desactiva el rig avanzado de cámara.

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
