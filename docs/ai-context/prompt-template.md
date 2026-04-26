# Plantilla de Prompt (Alta Precisión)

Copiar y completar antes de pedir cambios técnicos:

## Contexto
- Objetivo:
- Módulo/archivo:
- Stack y versión:

## Problema
- Comportamiento actual:
- Comportamiento esperado:
- Error/log exacto:
- Reproducción paso a paso:

## Restricciones
- Performance:
- Compatibilidad:
- Límites de alcance:

## Formato de respuesta requerido
1. Diagnóstico probable
2. Plan mínimo de cambio
3. Riesgos
4. Validación
5. Rollback

## Evidencia adjunta
- Capturas:
- Snippets:
- Commits/PRs relacionados:

---

## Ejemplo completo (copiar/editar)

**Contexto**
- Objetivo: corregir warning de hidratación en layout raíz.
- Módulo/archivo: `src/app/layout.tsx`.
- Stack y versión: Next.js (App Router) + React 19.

**Problema**
- Comportamiento actual: en `next dev` aparece warning de hydration mismatch en `<html>`.
- Comportamiento esperado: no ver warning cuando no hay desvío funcional real.
- Error/log exacto: `A tree hydrated but some attributes of the server rendered HTML didn't match the client properties`.
- Reproducción paso a paso:
  1. Iniciar dev server.
  2. Abrir home en navegador con extensiones activas.
  3. Ver warning en consola.

**Restricciones**
- Performance: sin impacto perceptible.
- Compatibilidad: mantener comportamiento en navegadores modernos.
- Límites de alcance: cambios mínimos en layout raíz.

**Formato de respuesta requerido**
1. Diagnóstico probable.
2. Plan mínimo de cambio.
3. Riesgos.
4. Validación.
5. Rollback.
