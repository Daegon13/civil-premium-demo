"""
Blender bpy script: Hero architectural pavilion for web (GLB-ready).

Objetivo:
- Pieza arquitectónica abstracta para hero section web (Three.js / React Three Fiber).
- Geometría limpia, pocos materiales y buen impacto visual con bajo peso.

Uso rápido:
1) Abrir Blender.
2) Scripting > New.
3) Pegar este script y ejecutar.
4) Ajustar CONFIG según necesidad.
"""

import bpy
import math
from mathutils import Vector


# ==========================================================
# CONFIGURACIÓN GLOBAL (fácil de modificar)
# ==========================================================
CONFIG = {
    # Escala general de la pieza
    "base_length": 18.0,
    "base_width": 10.0,
    "platform_height": 0.5,

    # Marcos / columnas
    "num_frames": 6,
    "frame_spacing": 2.6,
    "frame_thickness": 0.28,
    "frame_height": 4.8,

    # Cubierta
    "roof_thickness": 0.26,
    "roof_overhang": 0.7,
    "roof_tilt_deg": 4.0,

    # Paneles de vidrio
    "glass_panel_height": 2.9,
    "glass_panel_thickness": 0.05,
    "glass_inset": 0.15,

    # Export GLB
    "do_export_glb": False,
    "export_path": "//hero_pavilion.glb",  # // = relativo al .blend

    # Render viewport friendly
    "set_viewport_shading_to_material": True,
}


# ==========================================================
# UTILIDADES
# ==========================================================
def clean_scene():
    """Borra objetos, materiales y colecciones para iniciar limpio."""
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete(use_global=False)

    for block in bpy.data.meshes:
        bpy.data.meshes.remove(block)
    for block in bpy.data.materials:
        bpy.data.materials.remove(block)
    for block in bpy.data.cameras:
        bpy.data.cameras.remove(block)
    for block in bpy.data.lights:
        bpy.data.lights.remove(block)

    # Limpieza de colecciones huérfanas excepto Scene Collection
    for col in list(bpy.data.collections):
        if col.users == 0:
            bpy.data.collections.remove(col)


def ensure_collection(name="HeroStructure"):
    """Crea y enlaza una colección para organizar la pieza."""
    scene = bpy.context.scene
    col = bpy.data.collections.new(name)
    scene.collection.children.link(col)
    return col


def link_to_collection(obj, col):
    """Mueve el objeto a la colección de trabajo."""
    # Desenlazar de colecciones previas
    for c in list(obj.users_collection):
        c.objects.unlink(obj)
    col.objects.link(obj)


def assign_material(obj, mat):
    """Asigna un material al objeto reemplazando slots anteriores."""
    obj.data.materials.clear()
    obj.data.materials.append(mat)


def set_color_management_look(scene, preferred_looks):
    """
    Asigna el look de color management de forma robusta entre versiones.

    Blender puede exponer distintos nombres de look (p. ej.:
    "Medium High Contrast" vs "AgX - Medium High Contrast").
    Esta función intenta varias opciones y, si ninguna existe, conserva el valor actual.
    """
    look_prop = scene.view_settings.bl_rna.properties.get("look")
    if look_prop is None:
        print("[WARN] No se encontró la propiedad scene.view_settings.look.")
        return None

    enum_items = look_prop.enum_items
    available = {item.identifier for item in enum_items}

    for look_name in preferred_looks:
        if look_name in available:
            scene.view_settings.look = look_name
            print(f"[OK] Color management look configurado: {look_name}")
            return look_name

    print(
        "[WARN] Ningún look preferido está disponible. "
        f"Disponibles: {sorted(available)}. "
        f"Se mantiene: {scene.view_settings.look}"
    )
    return None


def create_box(name, size, location, collection, material=None, rotation=(0.0, 0.0, 0.0)):
    """Crea una caja simple (low poly) con tamaño exacto."""
    bpy.ops.mesh.primitive_cube_add(location=location, rotation=rotation)
    obj = bpy.context.active_object
    obj.name = name
    obj.scale = (size[0] * 0.5, size[1] * 0.5, size[2] * 0.5)
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)

    link_to_collection(obj, collection)
    if material:
        assign_material(obj, material)
    return obj


def create_materials():
    """Materiales básicos compatibles con glTF (Principled BSDF)."""
    mats = {}

    def set_bsdf_input(bsdf_node, socket_names, value):
        """
        Asigna valor al primer socket existente en una lista de nombres.
        Sirve para compatibilidad entre versiones de Blender con nombres cambiantes.
        """
        for socket_name in socket_names:
            socket = bsdf_node.inputs.get(socket_name)
            if socket is not None:
                socket.default_value = value
                return True
        return False

    # Hormigón premium (ligeramente frío)
    concrete = bpy.data.materials.new("M_Concrete")
    concrete.use_nodes = True
    bsdf = concrete.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = (0.63, 0.65, 0.67, 1.0)
    bsdf.inputs["Roughness"].default_value = 0.86
    bsdf.inputs["Metallic"].default_value = 0.0
    mats["concrete"] = concrete

    # Metal oscuro estructural
    metal = bpy.data.materials.new("M_DarkMetal")
    metal.use_nodes = True
    bsdf = metal.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = (0.08, 0.09, 0.11, 1.0)
    bsdf.inputs["Roughness"].default_value = 0.32
    bsdf.inputs["Metallic"].default_value = 0.95
    mats["metal"] = metal

    # Vidrio simple para glTF
    glass = bpy.data.materials.new("M_Glass")
    glass.use_nodes = True
    bsdf = glass.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = (0.76, 0.86, 0.92, 1.0)
    bsdf.inputs["Roughness"].default_value = 0.06
    bsdf.inputs["Metallic"].default_value = 0.0
    set_bsdf_input(bsdf, ["Transmission Weight", "Transmission"], 0.9)
    bsdf.inputs["IOR"].default_value = 1.45

    # Ajustes de transparencia para viewport/Eevee y export
    glass.blend_method = 'BLEND'
    if hasattr(glass, "shadow_method"):
        glass.shadow_method = 'HASHED'
    mats["glass"] = glass

    return mats


# ==========================================================
# CONSTRUCCIÓN DE LA PIEZA
# ==========================================================
def build_hero_pavilion(cfg, col, mats):
    """
    Construye:
    - plataforma base (hormigón)
    - marcos repetidos (metal oscuro)
    - cubierta inclinada (hormigón)
    - paneles de vidrio laterales
    """
    # Medidas derivadas
    n = cfg["num_frames"]
    spacing = cfg["frame_spacing"]
    total_length = (n - 1) * spacing

    frame_t = cfg["frame_thickness"]
    frame_h = cfg["frame_height"]
    base_w = cfg["base_width"]

    # Desfase para centrar la composición en X=0
    x_start = -total_length / 2.0

    # ------------------------------------------------------
    # 1) Plataforma / losa base
    # ------------------------------------------------------
    platform = create_box(
        name="BasePlatform",
        size=(cfg["base_length"], base_w, cfg["platform_height"]),
        location=(0.0, 0.0, cfg["platform_height"] / 2.0),
        collection=col,
        material=mats["concrete"],
    )

    # ------------------------------------------------------
    # 2) Marcos estructurales (cada marco = 2 columnas + 1 dintel)
    # ------------------------------------------------------
    clear_y = (base_w * 0.5) - frame_t * 0.5 - 0.3

    for i in range(n):
        x = x_start + i * spacing

        # Columna izquierda
        create_box(
            name=f"FrameColL_{i:02d}",
            size=(frame_t, frame_t, frame_h),
            location=(x, -clear_y, cfg["platform_height"] + frame_h / 2.0),
            collection=col,
            material=mats["metal"],
        )

        # Columna derecha
        create_box(
            name=f"FrameColR_{i:02d}",
            size=(frame_t, frame_t, frame_h),
            location=(x, clear_y, cfg["platform_height"] + frame_h / 2.0),
            collection=col,
            material=mats["metal"],
        )

        # Dintel
        create_box(
            name=f"FrameBeam_{i:02d}",
            size=(frame_t, base_w - 1.0, frame_t),
            location=(x, 0.0, cfg["platform_height"] + frame_h - frame_t * 0.5),
            collection=col,
            material=mats["metal"],
        )

    # ------------------------------------------------------
    # 3) Cubierta inclinada (impacto de silueta)
    # ------------------------------------------------------
    roof_len = total_length + cfg["roof_overhang"] * 2.0
    roof_w = base_w + cfg["roof_overhang"] * 1.8
    roof_z = cfg["platform_height"] + frame_h + cfg["roof_thickness"] * 0.55
    roof_rot_x = math.radians(cfg["roof_tilt_deg"])

    roof = create_box(
        name="RoofSlab",
        size=(roof_len, roof_w, cfg["roof_thickness"]),
        location=(0.0, 0.0, roof_z),
        collection=col,
        material=mats["concrete"],
        rotation=(roof_rot_x, 0.0, 0.0),
    )

    # Nervio central de precisión estructural
    create_box(
        name="RoofRib",
        size=(roof_len * 0.85, frame_t * 1.1, cfg["roof_thickness"] * 2.1),
        location=(0.0, 0.0, roof_z - cfg["roof_thickness"] * 0.55),
        collection=col,
        material=mats["metal"],
        rotation=(roof_rot_x, 0.0, 0.0),
    )

    # ------------------------------------------------------
    # 4) Paneles de vidrio simples (2 tiras longitudinales)
    # ------------------------------------------------------
    panel_h = cfg["glass_panel_height"]
    panel_t = cfg["glass_panel_thickness"]
    inset = cfg["glass_inset"]
    panel_len = total_length + spacing * 0.6

    glass_z = cfg["platform_height"] + panel_h / 2.0
    glass_y = clear_y - inset

    create_box(
        name="GlassPanel_Left",
        size=(panel_len, panel_t, panel_h),
        location=(0.0, -glass_y, glass_z),
        collection=col,
        material=mats["glass"],
    )

    create_box(
        name="GlassPanel_Right",
        size=(panel_len, panel_t, panel_h),
        location=(0.0, glass_y, glass_z),
        collection=col,
        material=mats["glass"],
    )

    # Elemento escultórico mínimo central (detalle premium sin sobrecargar)
    create_box(
        name="CoreMonolith",
        size=(1.0, 1.6, 3.4),
        location=(0.0, 0.0, cfg["platform_height"] + 1.7),
        collection=col,
        material=mats["metal"],
    )

    # Origen global para rotación limpia en web
    for obj in col.objects:
        obj.select_set(True)
    bpy.context.view_layer.objects.active = platform
    bpy.ops.object.transform_apply(location=False, rotation=True, scale=False)
    bpy.ops.object.select_all(action='DESELECT')


# ==========================================================
# CÁMARA + LUZ
# ==========================================================
def setup_camera_and_light(cfg):
    """Configura una cámara atractiva para hero y una luz principal sobria."""
    scene = bpy.context.scene

    # Cámara
    cam_data = bpy.data.cameras.new("HeroCamera")
    cam = bpy.data.objects.new("HeroCamera", cam_data)
    scene.collection.objects.link(cam)

    cam.location = Vector((11.5, -12.0, 7.4))

    # Apuntar cámara al centro de la pieza
    target = Vector((0.0, 0.0, 2.2))
    direction = target - cam.location
    cam.rotation_euler = direction.to_track_quat('-Z', 'Y').to_euler()

    cam_data.lens = 44
    cam_data.clip_start = 0.1
    cam_data.clip_end = 250.0
    scene.camera = cam

    # Luz principal (Sun)
    sun_data = bpy.data.lights.new(name="KeySun", type='SUN')
    sun = bpy.data.objects.new(name="KeySun", object_data=sun_data)
    scene.collection.objects.link(sun)

    sun.location = (8.0, -6.0, 14.0)
    sun.rotation_euler = (math.radians(49.0), math.radians(7.0), math.radians(31.0))
    sun_data.energy = 3.2
    sun_data.angle = math.radians(0.5)

    # Ajustes de color management para look comercial neutro
    # Ordenado por preferencia y compatibilidad entre Blender versiones.
    set_color_management_look(
        scene,
        preferred_looks=[
            "AgX - Medium High Contrast",
            "Medium High Contrast",
            "AgX - High Contrast",
            "High Contrast",
            "AgX - Base Contrast",
            "None",
        ],
    )


# ==========================================================
# EXPORTACIÓN GLB
# ==========================================================
def export_glb_if_needed(cfg):
    """Exporta a GLB si está habilitado en configuración."""
    if not cfg["do_export_glb"]:
        return

    bpy.ops.export_scene.gltf(
        filepath=cfg["export_path"],
        export_format='GLB',
        export_yup=True,
        export_apply=True,
        export_texcoords=True,
        export_normals=True,
        export_tangents=False,
        export_materials='EXPORT',
        export_colors=False,
        use_selection=False,
    )
    print(f"[OK] GLB exportado en: {cfg['export_path']}")


# ==========================================================
# MAIN
# ==========================================================
def main():
    clean_scene()
    work_col = ensure_collection("HeroPavilion")
    mats = create_materials()
    build_hero_pavilion(CONFIG, work_col, mats)
    setup_camera_and_light(CONFIG)

    # Opcional: mejorar vista en viewport para revisión rápida
    if CONFIG["set_viewport_shading_to_material"] and bpy.context.screen is not None:
        for area in bpy.context.screen.areas:
            if area.type == 'VIEW_3D':
                for space in area.spaces:
                    if space.type == 'VIEW_3D':
                        space.shading.type = 'MATERIAL'

    export_glb_if_needed(CONFIG)
    print("[OK] Pieza hero arquitectónica generada.")


if __name__ == "__main__":
    main()
