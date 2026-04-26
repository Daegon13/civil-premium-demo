# Known Issues

## [Hydration] Mismatch en `<html>` por atributos externos
**Síntoma**: warning de hidratación con atributos inesperados en `<html>`.

**Causa frecuente**: extensiones del navegador (ej. filtros visuales/modo oscuro) que mutan el DOM antes de hidratar.

**Validación**:
1. Probar en incógnito sin extensiones.
2. Desactivar extensiones de tema/filtro.
3. Comparar comportamiento dev vs prod.

**Mitigación**:
- Considerar `suppressHydrationWarning` en nodo raíz cuando sea ruido no funcional.
- Evitar variabilidad SSR/CSR en atributos raíz.
