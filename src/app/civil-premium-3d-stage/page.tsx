import { ModelStage } from "@/components/three/ModelStage";

export default function CivilPremium3DStagePage() {
  return (
    <main className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 px-6 py-10 md:px-10">
      <header className="max-w-4xl space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">Civil Premium • Internal Tool</p>
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">3D Asset Stage</h1>
        <p className="text-sm text-neutral-600 md:text-base">
          Herramienta interna para staging técnico de modelos glTF: auto-center, auto-fit de cámara, debug controls y export de configuración para el hero final.
        </p>
      </header>

      <ModelStage modelName="Barcelona Pavilion 3D Demo" modelPath="/models/barcelona_pavilion_3d_demo/scene.gltf" />
    </main>
  );
}
