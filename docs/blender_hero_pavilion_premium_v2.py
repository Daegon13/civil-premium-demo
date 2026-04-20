"""
Blender bpy script (v2 refactor): Hero architectural pavilion premium/commercial (GLB-ready).

Objetivo de esta refactorización:
- Elevar la pieza de blockout técnico a objeto hero premium para web.
- Introducir composición intencional: jerarquía estructural, vacío central y silueta memorable.
- Mantener geometría low/mid poly limpia y compatible con glTF/GLB.

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
# CONFIGURACIÓN GLOBAL (editable)
# ==========================================================
CONFIG = {
    # Escala general
    "base_length": 22.0,
    "base_width": 9.6,
    "platform_height": 0.36,
    "platform_chamfer": 0.04,

    # Estructura principal (portales) con variación controlada
    "num_portals": 6,
    "portal_spacing": 3.15,
    "portal_depth": 0.22,
    "portal_leg_width": 0.24,
    "portal_head_height": 5.4,
    "portal_thickness": 0.18,
    "portal_center_emphasis": 0.24,   # eleva y robustece el tramo central
    "portal_rotation_deg": 2.2,        # ligera torsión progresiva para evitar repetición rígida

    # Cubierta premium (doble plano + canto metálico)
    "roof_thickness": 0.11,
    "roof_overhang_x": 1.6,
    "roof_overhang_y": 0.46,
    "roof_peak_lift": 0.64,            # cresta para silueta más escultórica
    "roof_tilt_deg": 2.7,
    "roof_split_gap": 0.34,

    # Paneles laterales (composición intencional)
    "fin_thickness": 0.08,
    "fin_depth": 0.58,
    "fin_height": 3.05,
    "fin_inset_y": 0.6,

    # Cierre de vidrio
    "glass_height": 2.9,
    "glass_thickness": 0.04,

    # Núcleo/recorrido central
    "void_length_ratio": 0.58,
    "spine_width": 0.36,
    "spine_height": 0.2,
    "walkway_width": 1.35,
    "walkway_thickness": 0.1,

    # Escena
    "ground_size": 60.0,
    "background_strength": 0.46,

    # Exportación GLB
    "do_export_glb": False,
    "export_path": "//hero_pavilion_premium_v2.glb",

    # Vista en Blender
    "set_viewport_shading_to_material": True,
}


# ==========================================================
# UTILIDADES GENERALES
# ==========================================================
def clean_scene():
    """Limpia escena para reproducibilidad."""
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
    for block in bpy.data.worlds:
        if block.users == 0:
            bpy.data.worlds.remove(block)


def ensure_collection(name="HeroPremiumV2"):
    """Crea colección de trabajo."""
    scene = bpy.context.scene
    col = bpy.data.collections.new(name)
    scene.collection.children.link(col)
    return col


def link_to_collection(obj, col):
    """Mueve un objeto a la colección dada."""
    for c in list(obj.users_collection):
        c.objects.unlink(obj)
    col.objects.link(obj)


def assign_material(obj, mat):
    """Asigna material único."""
    obj.data.materials.clear()
    obj.data.materials.append(mat)


def add_bevel_modifier(obj, amount=0.02, segments=1, profile=0.7):
    """Bisel mínimo para captar highlights sin inflar polígonos."""
    bev = obj.modifiers.new(name="Bevel", type='BEVEL')
    bev.width = amount
    bev.segments = segments
    bev.profile = profile
    bev.limit_method = 'ANGLE'
    bev.angle_limit = math.radians(35.0)


def set_color_management_look(scene, preferred_looks):
    """Selecciona look robusto entre variantes de Blender."""
    look_prop = scene.view_settings.bl_rna.properties.get("look")
    if look_prop is None:
        return None

    available = {item.identifier for item in look_prop.enum_items}
    for look_name in preferred_looks:
        if look_name in available:
            scene.view_settings.look = look_name
            return look_name
    return None


def create_box(name, size, location, collection, material=None, rotation=(0.0, 0.0, 0.0)):
    """Crea caja simple con tamaño exacto (low/mid poly)."""
    bpy.ops.mesh.primitive_cube_add(location=location, rotation=rotation)
    obj = bpy.context.active_object
    obj.name = name
    obj.scale = (size[0] * 0.5, size[1] * 0.5, size[2] * 0.5)
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)

    link_to_collection(obj, collection)
    if material:
        assign_material(obj, material)
    return obj


def arch_bias(t):
    """Curva suave (0..1) con más peso en el centro para composición."""
    return 1.0 - abs((t * 2.0) - 1.0)


# ==========================================================
# MATERIALES (3 materiales principales)
# ==========================================================
def create_materials(cfg):
    """Materiales sobrios: hormigón, metal oscuro y vidrio."""
    mats = {}

    def set_bsdf_input(bsdf_node, socket_names, value):
        for socket_name in socket_names:
            socket = bsdf_node.inputs.get(socket_name)
            if socket is not None:
                socket.default_value = value
                return

    # Hormigón
    concrete = bpy.data.materials.new("M_Concrete")
    concrete.use_nodes = True
    bsdf = concrete.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = (0.62, 0.64, 0.66, 1.0)
    bsdf.inputs["Roughness"].default_value = 0.84
    bsdf.inputs["Metallic"].default_value = 0.0
    mats["concrete"] = concrete

    # Metal oscuro
    metal = bpy.data.materials.new("M_DarkMetal")
    metal.use_nodes = True
    bsdf = metal.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = (0.06, 0.07, 0.09, 1.0)
    bsdf.inputs["Roughness"].default_value = 0.24
    bsdf.inputs["Metallic"].default_value = 0.98
    mats["metal"] = metal

    # Vidrio
    glass = bpy.data.materials.new("M_Glass")
    glass.use_nodes = True
    bsdf = glass.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = (0.78, 0.86, 0.92, 1.0)
    bsdf.inputs["Roughness"].default_value = 0.05
    bsdf.inputs["Metallic"].default_value = 0.0
    set_bsdf_input(bsdf, ["Transmission Weight", "Transmission"], 0.93)
    bsdf.inputs["IOR"].default_value = 1.45

    glass.blend_method = 'BLEND'
    if hasattr(glass, "shadow_method"):
        glass.shadow_method = 'HASHED'
    mats["glass"] = glass

    # Fondo oscuro neutro
    world = bpy.data.worlds.new("HeroWorld")
    bpy.context.scene.world = world
    world.use_nodes = True
    bg = world.node_tree.nodes.get("Background")
    bg.inputs[0].default_value = (0.034, 0.037, 0.043, 1.0)
    bg.inputs[1].default_value = cfg["background_strength"]

    return mats


# ==========================================================
# PIEZA HERO: composición, estructura y vacío
# ==========================================================
def build_platform(cfg, col, mats):
    """Plataforma en dos niveles para presentación tipo producto hero."""
    plinth_h = cfg["platform_height"]

    platform = create_box(
        name="BasePlatform",
        size=(cfg["base_length"], cfg["base_width"], plinth_h),
        location=(0.0, 0.0, plinth_h * 0.5),
        collection=col,
        material=mats["concrete"],
    )
    add_bevel_modifier(platform, amount=cfg["platform_chamfer"], segments=1)

    top_plinth = create_box(
        name="DisplayPlinth",
        size=(cfg["base_length"] * 0.84, cfg["base_width"] * 0.76, 0.12),
        location=(0.0, 0.0, plinth_h + 0.06),
        collection=col,
        material=mats["concrete"],
    )
    add_bevel_modifier(top_plinth, amount=0.018, segments=1)

    return platform


def build_portals(cfg, col, mats):
    """Estructura principal con variación controlada de altura/espesor/inclinación."""
    n = cfg["num_portals"]
    spacing = cfg["portal_spacing"]
    total_x = (n - 1) * spacing
    x_start = -total_x * 0.5

    plinth_h = cfg["platform_height"]
    clear_y = cfg["base_width"] * 0.5 - cfg["portal_leg_width"] * 0.65 - 0.48

    head_base = cfg["portal_head_height"]
    head_thk = cfg["portal_thickness"]
    leg_w = cfg["portal_leg_width"]
    leg_d = cfg["portal_depth"]

    for i in range(n):
        t = i / max(1, n - 1)
        center_boost = arch_bias(t)

        # Variación compositiva: centro más alto y extremos ligeramente abiertos
        h_scale = 1.0 + cfg["portal_center_emphasis"] * center_boost
        leg_height = head_base * h_scale
        beam_thickness = head_thk * (0.95 + 0.18 * center_boost)
        beam_width_y = (clear_y * 2.0) + leg_w * (0.70 + 0.14 * center_boost)

        x = x_start + i * spacing
        yaw = math.radians((t - 0.5) * 2.0 * cfg["portal_rotation_deg"])

        z_leg = plinth_h + leg_height * 0.5
        z_beam = plinth_h + leg_height - beam_thickness * 0.5

        left_leg = create_box(
            name=f"PortalLegL_{i:02d}",
            size=(leg_w, leg_d, leg_height),
            location=(x, -clear_y, z_leg),
            rotation=(0.0, 0.0, yaw),
            collection=col,
            material=mats["metal"],
        )
        right_leg = create_box(
            name=f"PortalLegR_{i:02d}",
            size=(leg_w, leg_d, leg_height),
            location=(x, clear_y, z_leg),
            rotation=(0.0, 0.0, yaw),
            collection=col,
            material=mats["metal"],
        )
        head = create_box(
            name=f"PortalHead_{i:02d}",
            size=(leg_w, beam_width_y, beam_thickness),
            location=(x, 0.0, z_beam),
            rotation=(0.0, 0.0, yaw),
            collection=col,
            material=mats["metal"],
        )

        if i in {0, n - 1, n // 2}:
            add_bevel_modifier(left_leg, amount=0.011, segments=1)
            add_bevel_modifier(right_leg, amount=0.011, segments=1)
            add_bevel_modifier(head, amount=0.011, segments=1)

    return total_x, clear_y


def build_roof(cfg, col, mats, total_x):
    """Cubierta elegante con doble ala inclinada y nervio central liviano."""
    roof_len = total_x + cfg["roof_overhang_x"] * 2.0
    roof_w_half = (cfg["base_width"] + cfg["roof_overhang_y"] * 2.0) * 0.5
    plinth_h = cfg["platform_height"]

    roof_base_z = plinth_h + cfg["portal_head_height"] + 0.36
    roof_pitch = math.radians(cfg["roof_tilt_deg"])
    split = cfg["roof_split_gap"]

    # Ala izquierda
    roof_left = create_box(
        name="RoofWing_Left",
        size=(roof_len, roof_w_half - split * 0.5, cfg["roof_thickness"]),
        location=(0.0, -(roof_w_half + split) * 0.25, roof_base_z + cfg["roof_peak_lift"] * 0.35),
        rotation=(roof_pitch, 0.0, math.radians(-0.8)),
        collection=col,
        material=mats["concrete"],
    )

    # Ala derecha
    roof_right = create_box(
        name="RoofWing_Right",
        size=(roof_len, roof_w_half - split * 0.5, cfg["roof_thickness"]),
        location=(0.0, (roof_w_half + split) * 0.25, roof_base_z + cfg["roof_peak_lift"] * 0.62),
        rotation=(-roof_pitch * 0.7, 0.0, math.radians(0.9)),
        collection=col,
        material=mats["concrete"],
    )

    # Nervio/canto metálico para lectura premium de la cresta
    ridge = create_box(
        name="RoofRidgeTrim",
        size=(roof_len * 0.95, split * 0.9, cfg["roof_thickness"] * 0.55),
        location=(0.0, 0.0, roof_base_z + cfg["roof_peak_lift"] * 0.62),
        collection=col,
        material=mats["metal"],
    )

    add_bevel_modifier(roof_left, amount=0.01, segments=1)
    add_bevel_modifier(roof_right, amount=0.01, segments=1)
    add_bevel_modifier(ridge, amount=0.008, segments=1)


def build_side_composition(cfg, col, mats, total_x):
    """Paneles laterales redistribuidos con patrón asimétrico equilibrado + vidrio."""
    plinth_h = cfg["platform_height"]
    side_y = cfg["base_width"] * 0.5 - cfg["fin_inset_y"]

    # Distribución intencional (no uniforme): densifica acceso central + respiración en extremos
    normalized_positions = [-1.0, -0.63, -0.28, 0.08, 0.44, 0.82]
    x_half_span = (total_x * 0.5) + cfg["portal_spacing"] * 0.34

    for side in (-1.0, 1.0):
        for idx, npos in enumerate(normalized_positions):
            x = npos * x_half_span
            t = (idx / max(1, len(normalized_positions) - 1))
            center_boost = arch_bias(t)
            h = cfg["fin_height"] * (0.86 + center_boost * 0.24)
            z = plinth_h + h * 0.5
            yaw = math.radians(side * (2.1 - idx * 0.35))

            create_box(
                name=f"SideFin_{'L' if side < 0 else 'R'}_{idx:02d}",
                size=(cfg["fin_thickness"], cfg["fin_depth"], h),
                location=(x, side * side_y, z),
                rotation=(0.0, 0.0, yaw),
                collection=col,
                material=mats["metal"],
            )

    glass_len = total_x + cfg["portal_spacing"] * 1.05
    glass_z = plinth_h + cfg["glass_height"] * 0.5

    create_box(
        name="GlassRibbon_Left",
        size=(glass_len, cfg["glass_thickness"], cfg["glass_height"]),
        location=(0.0, -side_y + 0.07, glass_z),
        collection=col,
        material=mats["glass"],
    )
    create_box(
        name="GlassRibbon_Right",
        size=(glass_len, cfg["glass_thickness"], cfg["glass_height"]),
        location=(0.0, side_y - 0.07, glass_z),
        collection=col,
        material=mats["glass"],
    )


def build_central_void_and_path(cfg, col, mats, total_x):
    """Núcleo arquitectónico: vacío legible + pasarela metálica y apoyos mínimos."""
    plinth_h = cfg["platform_height"]
    void_len = total_x * cfg["void_length_ratio"]

    # Costillas longitudinales separadas para subrayar el vacío central
    rail_offset = cfg["walkway_width"] * 0.5
    rail_z = plinth_h + 0.38
    for side in (-1.0, 1.0):
        rail = create_box(
            name=f"VoidRail_{'L' if side < 0 else 'R'}",
            size=(void_len, cfg["spine_width"], cfg["spine_height"]),
            location=(0.0, side * rail_offset, rail_z),
            collection=col,
            material=mats["metal"],
        )
        add_bevel_modifier(rail, amount=0.008, segments=1)

    # Pasarela central ligera (foco interior y lectura de recorrido)
    walkway = create_box(
        name="CentralWalkway",
        size=(void_len * 0.88, cfg["walkway_width"], cfg["walkway_thickness"]),
        location=(0.0, 0.0, plinth_h + 0.33),
        collection=col,
        material=mats["concrete"],
    )
    add_bevel_modifier(walkway, amount=0.006, segments=1)

    # Núcleo vertical sobrio como remate focal
    core = create_box(
        name="CoreMonolith",
        size=(0.52, 1.18, 2.55),
        location=(0.0, 0.0, plinth_h + 1.28),
        rotation=(0.0, 0.0, math.radians(5.0)),
        collection=col,
        material=mats["concrete"],
    )
    add_bevel_modifier(core, amount=0.012, segments=1)


def build_hero_pavilion(cfg, col, mats):
    """Pipeline de construcción principal."""
    platform = build_platform(cfg, col, mats)
    total_x, _ = build_portals(cfg, col, mats)
    build_roof(cfg, col, mats, total_x)
    build_side_composition(cfg, col, mats, total_x)
    build_central_void_and_path(cfg, col, mats, total_x)

    for obj in col.objects:
        obj.select_set(True)
    bpy.context.view_layer.objects.active = platform
    bpy.ops.object.transform_apply(location=False, rotation=True, scale=False)
    bpy.ops.object.select_all(action='DESELECT')


# ==========================================================
# CÁMARA, LUZ Y FONDO
# ==========================================================
def setup_camera_and_light(cfg):
    """Escena comercial: cámara 3/4, key light definida y relleno controlado."""
    scene = bpy.context.scene

    # Cámara hero comercial
    cam_data = bpy.data.cameras.new("HeroCamera")
    cam = bpy.data.objects.new("HeroCamera", cam_data)
    scene.collection.objects.link(cam)

    cam.location = Vector((13.9, -12.6, 7.6))
    target = Vector((0.2, 0.0, 2.7))
    direction = target - cam.location
    cam.rotation_euler = direction.to_track_quat('-Z', 'Y').to_euler()

    cam_data.lens = 52
    cam_data.sensor_width = 36
    cam_data.clip_start = 0.1
    cam_data.clip_end = 600
    scene.camera = cam

    # Luz principal (sun)
    key_data = bpy.data.lights.new(name="KeySun", type='SUN')
    key = bpy.data.objects.new(name="KeySun", object_data=key_data)
    scene.collection.objects.link(key)

    key.location = (9.8, -8.8, 15.3)
    key.rotation_euler = (math.radians(50.0), math.radians(2.0), math.radians(33.0))
    key_data.energy = 3.9
    key_data.angle = math.radians(0.38)

    # Relleno suave para recortar silueta sin lavar contraste
    fill_data = bpy.data.lights.new(name="FillArea", type='AREA')
    fill = bpy.data.objects.new(name="FillArea", object_data=fill_data)
    scene.collection.objects.link(fill)

    fill.location = (-7.4, 9.6, 5.8)
    fill.rotation_euler = (math.radians(75.0), 0.0, math.radians(-45.0))
    fill_data.energy = 62
    fill_data.color = (0.78, 0.82, 0.9)
    fill_data.size = 6.4

    # Suelo neutro oscuro
    bpy.ops.mesh.primitive_plane_add(location=(0.0, 0.0, 0.0), size=cfg["ground_size"])
    ground = bpy.context.active_object
    ground.name = "GroundPlane"

    ground_mat = bpy.data.materials.new("M_Ground")
    ground_mat.use_nodes = True
    bsdf = ground_mat.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = (0.045, 0.05, 0.058, 1.0)
    bsdf.inputs["Roughness"].default_value = 0.93
    assign_material(ground, ground_mat)

    set_color_management_look(
        scene,
        preferred_looks=[
            "AgX - Medium High Contrast",
            "Medium High Contrast",
            "AgX - High Contrast",
            "High Contrast",
            "None",
        ],
    )


# ==========================================================
# EXPORTACIÓN GLB
# ==========================================================
def export_glb_if_needed(cfg):
    """Exporta GLB con settings compatibles para web."""
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
    work_col = ensure_collection("HeroPavilionPremiumV2")
    mats = create_materials(CONFIG)

    build_hero_pavilion(CONFIG, work_col, mats)
    setup_camera_and_light(CONFIG)

    if CONFIG["set_viewport_shading_to_material"] and bpy.context.screen is not None:
        for area in bpy.context.screen.areas:
            if area.type == 'VIEW_3D':
                for space in area.spaces:
                    if space.type == 'VIEW_3D':
                        space.shading.type = 'MATERIAL'

    export_glb_if_needed(CONFIG)
    print("[OK] Hero pavilion premium v2 refactor generado.")


if __name__ == "__main__":
    main()
