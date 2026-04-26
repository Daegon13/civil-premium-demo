# Contexto del Proyecto

## Objetivo
Este repositorio contiene una aplicación web para servicios de ingeniería civil (dirección técnica, control de obra y regularización técnica), con contenido en español y foco comercial.

## Stack principal
- Next.js (App Router)
- TypeScript
- CSS global (`src/app/globals.css`)
- Contenido estructurado en módulos (`src/content/siteContent`)

## Estructura relevante
- `src/app/layout.tsx`: layout raíz y metadatos SEO/social
- `src/app/`: rutas y composición de páginas
- `src/content/`: contenido de marca, copy y metadatos
- `src/hooks/`: lógica reutilizable de interacción (ej. efectos visuales)

## Cómo ejecutar localmente
1. Instalar dependencias del proyecto.
2. Levantar entorno de desarrollo con el script del proyecto.
3. Abrir la URL local reportada por Next.js en el navegador.

> Nota: usar siempre scripts definidos en `package.json` para evitar desvíos entre entornos.

## Dónde vive cada feature (guía rápida)
- Página principal y secciones de marketing: `src/app/` y componentes asociados.
- Contenido de negocio y textos: `src/content/`.
- SEO/metadatos globales: `src/app/layout.tsx`.
- Efectos/interacciones reutilizables: `src/hooks/`.

## Convenciones recomendadas para trabajo con IA
1. Confirmar versión/framework antes de proponer cambios profundos.
2. Evitar soluciones con SSR/CSR ambiguo en componentes críticos de hidratación.
3. Priorizar cambios pequeños, verificables y con rollback simple.
4. Documentar cada decisión técnica en `decision-log.md`.
