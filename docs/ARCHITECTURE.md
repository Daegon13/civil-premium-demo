# Architecture

## Objetivo
Landing comercial one-page para estudio de ingeniería civil, con foco en claridad comercial y estética premium.

## Principios
- Estructura simple y escalable.
- Separación clara entre layout, secciones y UI base.
- Contenido y configuración fuera de los componentes.
- Sin sobreingeniería ni dependencias extra.

## Estructura principal
- `src/app`: entrada de aplicación y estilos globales.
- `src/components/layout`: marco global (header/footer).
- `src/components/sections`: bloques de la one-page.
- `src/components/ui`: piezas reutilizables mínimas.
- `src/components/visual`: recursos visuales desacoplados.
- `src/content`: contenido estructurado para secciones.
- `src/lib`: configuración utilitaria y constantes.
- `src/styles`: tokens de diseño iniciales.
