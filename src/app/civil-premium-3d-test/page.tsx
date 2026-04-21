import { BarcelonaPavilionPreview } from "@/components/three/BarcelonaPavilionPreview";

export default function CivilPremium3DTestPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-10 md:px-10">
      <header className="max-w-3xl space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">Civil Premium • 3D Preview</p>
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">Barcelona Pavilion glTF Test View</h1>
        <p className="text-sm text-neutral-600 md:text-base">
          Ruta de prueba dedicada para validar carga, escala y encuadre de una escena 3D premium antes de llevarla al hero final.
        </p>
      </header>

      <section>
        <BarcelonaPavilionPreview />
      </section>
    </main>
  );
}
