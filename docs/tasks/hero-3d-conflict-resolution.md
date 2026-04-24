# Tarea: aplicar ajustes del Hero 3D sin conflictos con `main`

## Objetivo
Crear un PR independiente que conserve los ajustes visuales del Hero 3D (tamaño del stage, framing de cámara, plano y límites de zoom), resolviendo el conflicto con la rama principal.

## Archivo afectado
- `src/components/three/CivilPremiumHeroModel.tsx`

## Cambios esperados (funcionales)
1. Reducir altura del stage 3D para mejor proporción en el layout:
   - `h-[19.5rem] sm:h-[22rem] lg:h-[25rem]`
2. Acercar cámara base inicial:
   - `baseCamera = [6.4, 3.35, 4.9]`
3. Ajustar plano base:
   - `position={[0, -1.05, 0]}`
   - `scale={[28, 28, 1]}`
4. Limitar rango de zoom:
   - `minDistance={4.5}`
   - `maxDistance={12}`

## Estrategia recomendada para resolver conflicto
1. Actualizar rama de trabajo con el último `main`.
2. Aplicar los cambios anteriores manualmente sobre `main` en un commit nuevo (evitar reusar el commit conflictivo).
3. Verificar visualmente el hero en desktop/tablet/mobile para confirmar:
   - proporción del cuadro 3D
   - presencia del modelo en viewport inicial
   - interacción de zoom controlada
4. Abrir PR nuevo y cerrar el PR conflictivo previo.

## Criterios de aceptación
- El bloque 3D no sobresale visualmente frente al resto del hero.
- El modelo entra mejor en cuadro al cargar.
- No hay conflictos de merge pendientes contra `main`.
