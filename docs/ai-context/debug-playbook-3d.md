# Playbook de Debug 3D (Web)

## 1) Datos mínimos de entrada (obligatorios)
Antes de diagnosticar, recolectar:
- Motor/librería (Three.js, Babylon, React Three Fiber, etc.)
- Versión exacta
- Navegador y dispositivo
- Error exacto (stack/log)
- Formato de assets (glTF/GLB/FBX)
- Pasos para reproducir

## 2) Triaging rápido
1. ¿Falla de carga de asset?
   - Verificar rutas, CORS, MIME y tamaño.
2. ¿Falla de render/material?
   - Revisar iluminación, color space, tone mapping, normal maps.
3. ¿Falla de performance?
   - Revisar draw calls, triángulos, texturas, animaciones, sombras.
4. ¿Falla de interacción?
   - Revisar raycasting, event layers y bounds.

## 3) Checklist técnico
- [ ] Medir FPS y frame time
- [ ] Confirmar compresión de texturas (si aplica)
- [ ] Reducir geometría/LOD
- [ ] Validar que no haya NaN en transformaciones
- [ ] Revisar leaks (dispose de geometrías/materiales/texturas)

## 4) Estrategia de resolución
- Aislar con escena mínima reproducible.
- Corregir una hipótesis a la vez.
- Validar resultado esperado y documentar evidencia.

## 5) Salida esperada de cada diagnóstico
- Causa probable
- Cambio mínimo sugerido
- Riesgos del cambio
- Plan de rollback
