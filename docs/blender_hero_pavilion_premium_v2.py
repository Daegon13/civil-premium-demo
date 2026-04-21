"""
Blender bpy script: Pabellón estructural de acceso con gran voladizo,
lámina de agua lineal y núcleo escultórico desplazado.

Objetivo:
- Pieza hero premium para landing de arquitectura/ingeniería civil.
- Lenguaje sobrio, institucional y contemporáneo.
- Geometría low/mid poly con materiales simples compatibles con GLB.
"""

import bpy
import math
from mathutils import Vector


# ==========================================================
# PARÁMETROS EDITABLES (ajuste rápido de composición)
# ==========================================================
CONFIG = {
    # Escena / control general
    "collection_name": "HeroAccessPavilion",
    "set_viewport_shading_to_material": True,

    # Exportación
    "do_export_glb": False,
    "export_path": "//hero_access_structural_pavilion.glb",

    # Plinto y plataforma (eje longitudinal en X)
    "plinth_length": 16.0,
    "plinth_width": 9.0,
    "plinth_thickness": 0.35,
    "plinth_bevel": 0.02,

    "platform_length": 11.5,
    "platform_width": 6.2,
    "platform_elevation": 0.06,
    "platform_thickness": 0.05,

    # Alineación general sobre plinto
    "front_margin": 1.6,  # distancia desde borde frontal del plinto a inicio de plataforma

    # Sistema estructural (pórticos)
    "portal_clear_width": 6.8,
    "portal_height": 4.1,
    "portal_col_section": (0.18, 0.18),
    "portal_beam_section": (0.18, 0.22),
    "secondary_scale": 0.82,

    # Posiciones longitudinales desde frente de plataforma
    "main_portal_x": [2.2, 6.8, 11.6],
    "secondary_portal_x": [4.7, 9.6],

    # Cubiertas
    "roof_main_length": 10.5,
    "roof_main_width": 5.8,
    "roof_main_thickness": 0.12,
    "roof_main_z": 4.15,
    "roof_main_front_cantilever": 2.0,
    "roof_main_side_cantilever_dominant": 1.4,
    "roof_main_side_cantilever_minor": 0.5,

    "roof_secondary_length": 5.4,
    "roof_secondary_width": 3.1,
    "roof_secondary_thickness": 0.10,
    "roof_secondary_z_offset": 0.14,
    "roof_secondary_back_offset": 1.7,

    # Paneles laterales (pantallas)
    "panel_thickness": 0.06,
    "panel_side_a": [
        # (x desde frente plataforma, ancho_x, alto_z)
        (2.0, 0.9, 1.85),
        (4.9, 1.2, 2.0),
        (7.7, 1.7, 2.25),
        (10.2, 2.0, 2.15),
    ],
    "panel_side_b": [
        (5.6, 1.0, 1.95),
        (8.8, 1.45, 2.1),
        (11.1, 1.1, 2.2),
    ],

    # Núcleo escultórico desplazado
    "monolith_size": (0.9, 0.9, 2.3),
    "monolith_plinth_size": (2.2, 0.55, 0.09),
    "monolith_x_from_front": 10.9,
    "monolith_side_offset_ratio": 0.18,  # 15%~20% hacia lado más abierto

    # Lámina de agua
    "water_length": 6.5,
    "water_width": 1.1,
    "water_recess": 0.05,
    "water_x_from_front": 4.6,
    "water_side": -1,  # -1 lado abierto / +1 lado opuesto

    # Cámara / luz
    "create_front_camera": True,
    "ground_size": 52.0,
    "world_strength": 0.5,
}


# ==========================================================
# UTILIDADES BÁSICAS
# ==========================================================
def clean_scene():
    """Limpia la escena para ejecución reproducible."""
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete(use_global=False)

    for mesh in list(bpy.data.meshes):
        bpy.data.meshes.remove(mesh)
    for mat in list(bpy.data.materials):
        bpy.data.materials.remove(mat)
    for cam in list(bpy.data.cameras):
        bpy.data.cameras.remove(cam)
    for light in list(bpy.data.lights):
        bpy.data.lights.remove(light)


def ensure_collection(name):
    scene = bpy.context.scene
    col = bpy.data.collections.new(name)
    scene.collection.children.link(col)
    return col


def link_to_collection(obj, collection):
    for c in list(obj.users_collection):
        c.objects.unlink(obj)
    collection.objects.link(obj)


def assign_material(obj, material):
    obj.data.materials.clear()
    obj.data.materials.append(material)


def create_box(name, size_xyz, loc_xyz, collection, material=None, rot_xyz=(0.0, 0.0, 0.0)):
    bpy.ops.mesh.primitive_cube_add(location=loc_xyz, rotation=rot_xyz)
    obj = bpy.context.active_object
    obj.name = name
    obj.scale = (size_xyz[0] * 0.5, size_xyz[1] * 0.5, size_xyz[2] * 0.5)
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    link_to_collection(obj, collection)
    if material is not None:
        assign_material(obj, material)
    return obj


def add_bevel(obj, amount, segments=1):
    bev = obj.modifiers.new(name="Bevel", type='BEVEL')
    bev.width = amount
    bev.segments = segments
    bev.profile = 0.72
    bev.limit_method = 'ANGLE'
    bev.angle_limit = math.radians(35.0)


def front_to_world_x(cfg, x_from_front):
    """Convierte distancia desde frente de plataforma a coordenada X global."""
    platform_start = -cfg["plinth_length"] * 0.5 + cfg["front_margin"]
    return platform_start + x_from_front


# ==========================================================
# MATERIALES (4 familias glTF/GLB-friendly)
# ==========================================================
def create_materials(cfg):
    mats = {}

    # 1) Mineral claro: plinto, plataforma, cubiertas, zócalo monolito
    mineral = bpy.data.materials.new("M_MineralLight")
    mineral.use_nodes = True
    bsdf = mineral.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = (0.69, 0.70, 0.72, 1.0)
    bsdf.inputs["Roughness"].default_value = 0.78
    bsdf.inputs["Metallic"].default_value = 0.0
    mats["mineral"] = mineral

    # 2) Estructura metálica oscura grafito satinado
    metal = bpy.data.materials.new("M_GraphiteMetal")
    metal.use_nodes = True
    bsdf = metal.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = (0.06, 0.065, 0.075, 1.0)
    bsdf.inputs["Roughness"].default_value = 0.28
    bsdf.inputs["Metallic"].default_value = 0.96
    mats["metal"] = metal

    # 3) Paneles claros sobrios
    panel = bpy.data.materials.new("M_PanelSoft")
    panel.use_nodes = True
    bsdf = panel.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = (0.79, 0.81, 0.83, 1.0)
    bsdf.inputs["Roughness"].default_value = 0.58
    bsdf.inputs["Metallic"].default_value = 0.04
    mats["panel"] = panel

    # 4) Agua oscura reflectante
    water = bpy.data.materials.new("M_WaterDark")
    water.use_nodes = True
    bsdf = water.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = (0.025, 0.032, 0.038, 1.0)
    bsdf.inputs["Roughness"].default_value = 0.03
    bsdf.inputs["Metallic"].default_value = 0.0
    if "Transmission Weight" in bsdf.inputs:
        bsdf.inputs["Transmission Weight"].default_value = 0.05
    elif "Transmission" in bsdf.inputs:
        bsdf.inputs["Transmission"].default_value = 0.05
    mats["water"] = water

    # Mundo oscuro neutro
    world = bpy.data.worlds.new("HeroWorld")
    bpy.context.scene.world = world
    world.use_nodes = True
    bg = world.node_tree.nodes.get("Background")
    bg.inputs[0].default_value = (0.025, 0.028, 0.032, 1.0)
    bg.inputs[1].default_value = cfg["world_strength"]

    return mats


# ==========================================================
# BLOQUES ARQUITECTÓNICOS
# ==========================================================
def build_plinth_and_platform(cfg, col, mats):
    """1) Borde limpio del plinto + 2) plataforma de acceso."""
    plinth = create_box(
        "Plinth",
        (cfg["plinth_length"], cfg["plinth_width"], cfg["plinth_thickness"]),
        (0.0, 0.0, cfg["plinth_thickness"] * 0.5),
        col,
        mats["mineral"],
    )
    add_bevel(plinth, cfg["plinth_bevel"], segments=2)

    z0 = cfg["plinth_thickness"] + cfg["platform_elevation"]
    platform_x = front_to_world_x(cfg, cfg["platform_length"] * 0.5)
    platform = create_box(
        "InnerPlatform",
        (cfg["platform_length"], cfg["platform_width"], cfg["platform_thickness"]),
        (platform_x, 0.0, z0 + cfg["platform_thickness"] * 0.5),
        col,
        mats["mineral"],
    )
    add_bevel(platform, 0.008, segments=1)

    return {
        "plinth": plinth,
        "platform": platform,
        "platform_top_z": z0 + cfg["platform_thickness"],
        "platform_x": platform_x,
    }


def create_portal(col, mats, name_prefix, x, y_center, z_base, clear_width, height, col_section, beam_section, bevel_amount):
    """Crea un pórtico U simple: dos pilares + una viga."""
    col_w, col_d = col_section
    beam_h, beam_d = beam_section

    half_clear = clear_width * 0.5
    leg_z = z_base + height * 0.5
    beam_z = z_base + height - beam_h * 0.5

    left = create_box(
        f"{name_prefix}_ColL",
        (col_w, col_d, height),
        (x, y_center - half_clear, leg_z),
        col,
        mats["metal"],
    )
    right = create_box(
        f"{name_prefix}_ColR",
        (col_w, col_d, height),
        (x, y_center + half_clear, leg_z),
        col,
        mats["metal"],
    )
    beam = create_box(
        f"{name_prefix}_Beam",
        (beam_d, clear_width + col_w, beam_h),
        (x, y_center, beam_z),
        col,
        mats["metal"],
        rot_xyz=(0.0, 0.0, math.radians(90.0)),
    )

    add_bevel(left, bevel_amount)
    add_bevel(right, bevel_amount)
    add_bevel(beam, bevel_amount)


def build_structural_sequence(cfg, col, mats, platform_top_z):
    """3/4) Secuencia axial: 3 pórticos principales + 2 secundarios."""
    z_base = platform_top_z

    for i, x_f in enumerate(cfg["main_portal_x"], start=1):
        x = front_to_world_x(cfg, x_f)
        # Leve jerarquía en pórtico final (más alto)
        h = cfg["portal_height"] + (0.18 if i == 3 else 0.0)
        create_portal(
            col,
            mats,
            f"MainPortal_{i:02d}",
            x,
            0.0,
            z_base,
            cfg["portal_clear_width"],
            h,
            cfg["portal_col_section"],
            cfg["portal_beam_section"],
            bevel_amount=0.008,
        )

    sec_col = (
        cfg["portal_col_section"][0] * cfg["secondary_scale"],
        cfg["portal_col_section"][1] * cfg["secondary_scale"],
    )
    sec_beam = (
        cfg["portal_beam_section"][0] * cfg["secondary_scale"],
        cfg["portal_beam_section"][1] * cfg["secondary_scale"],
    )

    for i, x_f in enumerate(cfg["secondary_portal_x"], start=1):
        x = front_to_world_x(cfg, x_f)
        create_portal(
            col,
            mats,
            f"SecondaryPortal_{i:02d}",
            x,
            0.0,
            z_base,
            cfg["portal_clear_width"] * 0.98,
            cfg["portal_height"] * 0.94,
            sec_col,
            sec_beam,
            bevel_amount=0.005,
        )


def build_roofs(cfg, col, mats, platform_top_z):
    """5) Cubierta dominante asimétrica + cubierta secundaria contrapunto."""
    portal_1_x = front_to_world_x(cfg, cfg["main_portal_x"][0])

    # Centro de cubierta principal considerando voladizo frontal dominante
    roof_main_cx = portal_1_x + cfg["roof_main_length"] * 0.5 - cfg["roof_main_front_cantilever"]

    # Asimetría lateral: lado negativo más abierto (dominante)
    roof_main_cy = (
        cfg["roof_main_side_cantilever_dominant"] - cfg["roof_main_side_cantilever_minor"]
    ) * 0.5

    roof_main = create_box(
        "Roof_Main",
        (cfg["roof_main_length"], cfg["roof_main_width"], cfg["roof_main_thickness"]),
        (roof_main_cx, roof_main_cy, platform_top_z + cfg["roof_main_z"]),
        col,
        mats["mineral"],
        rot_xyz=(math.radians(-1.4), 0.0, math.radians(-1.1)),
    )
    add_bevel(roof_main, 0.01, segments=1)

    # Cubierta secundaria: más pequeña, algo más alta y desplazada al lado opuesto
    roof_sec = create_box(
        "Roof_Secondary",
        (cfg["roof_secondary_length"], cfg["roof_secondary_width"], cfg["roof_secondary_thickness"]),
        (
            roof_main_cx + cfg["roof_secondary_back_offset"],
            roof_main_cy - 1.1,
            platform_top_z + cfg["roof_main_z"] + cfg["roof_secondary_z_offset"],
        ),
        col,
        mats["mineral"],
        rot_xyz=(math.radians(0.8), 0.0, math.radians(1.9)),
    )
    add_bevel(roof_sec, 0.008, segments=1)


def build_water_sheet(cfg, col, mats, platform_top_z, platform_center_x):
    """3) Lámina de agua lineal mínima y reflectante en un solo lateral."""
    y_offset = (cfg["platform_width"] * 0.5 - cfg["water_width"] * 0.5 - 0.45) * cfg["water_side"]
    water_x = front_to_world_x(cfg, cfg["water_x_from_front"]) + cfg["water_length"] * 0.5

    # Marco mineral ultra bajo para evitar booleanos complejos
    frame = create_box(
        "WaterFrame",
        (cfg["water_length"], cfg["water_width"], 0.01),
        (water_x, y_offset, platform_top_z + 0.005),
        col,
        mats["mineral"],
    )

    # Plano de agua hundido visualmente respecto a plataforma
    water = create_box(
        "WaterSheet",
        (cfg["water_length"] * 0.985, cfg["water_width"] * 0.93, 0.003),
        (water_x, y_offset, platform_top_z - cfg["water_recess"]),
        col,
        mats["water"],
    )
    add_bevel(frame, 0.003)
    return water


def build_side_screens(cfg, col, mats, platform_top_z):
    """Pantallas laterales asimétricas con ritmo controlado."""
    y_a = -(cfg["platform_width"] * 0.5 - 0.20)  # lado más abierto
    y_b = +(cfg["platform_width"] * 0.5 - 0.25)

    # Lado A: 4 paneles (más densidad hacia zona media/fondo)
    for i, (x_f, w, h) in enumerate(cfg["panel_side_a"], start=1):
        create_box(
            f"Screen_A_{i:02d}",
            (w, cfg["panel_thickness"], h),
            (front_to_world_x(cfg, x_f), y_a, platform_top_z + h * 0.5),
            col,
            mats["panel"],
            rot_xyz=(0.0, 0.0, math.radians(-0.7 + i * 0.22)),
        )

    # Lado B: 3 paneles (menos presencia, más apertura en acceso)
    for i, (x_f, w, h) in enumerate(cfg["panel_side_b"], start=1):
        create_box(
            f"Screen_B_{i:02d}",
            (w, cfg["panel_thickness"], h),
            (front_to_world_x(cfg, x_f), y_b, platform_top_z + h * 0.5),
            col,
            mats["panel"],
            rot_xyz=(0.0, 0.0, math.radians(0.35 - i * 0.15)),
        )


def build_sculptural_monolith(cfg, col, mats, platform_top_z):
    """6) Remate con monolito desplazado sobre zócalo lineal bajo."""
    side_offset = cfg["platform_width"] * cfg["monolith_side_offset_ratio"]
    monolith_x = front_to_world_x(cfg, cfg["monolith_x_from_front"])

    base = create_box(
        "Monolith_Base",
        cfg["monolith_plinth_size"],
        (
            monolith_x,
            side_offset,
            platform_top_z + cfg["monolith_plinth_size"][2] * 0.5,
        ),
        col,
        mats["mineral"],
    )
    add_bevel(base, 0.006)

    monolith = create_box(
        "Monolith",
        cfg["monolith_size"],
        (
            monolith_x + 0.15,
            side_offset + 0.02,
            platform_top_z + cfg["monolith_plinth_size"][2] + cfg["monolith_size"][2] * 0.5,
        ),
        col,
        mats["metal"],
        rot_xyz=(0.0, 0.0, math.radians(1.7)),
    )
    add_bevel(monolith, 0.012, segments=2)


def build_ground(cfg, mats):
    bpy.ops.mesh.primitive_plane_add(location=(0.0, 0.0, 0.0), size=cfg["ground_size"])
    ground = bpy.context.active_object
    ground.name = "Ground"
    assign_material(ground, mats["mineral"])


# ==========================================================
# CÁMARAS Y LUZ
# ==========================================================
def point_camera(cam_obj, target):
    direction = target - cam_obj.location
    cam_obj.rotation_euler = direction.to_track_quat('-Z', 'Y').to_euler()


def setup_cameras_and_light(cfg):
    scene = bpy.context.scene
    target = Vector((1.8, -0.1, 2.25))

    # Cámara hero 3/4 comercial
    cam_data = bpy.data.cameras.new("HeroCamera")
    hero_cam = bpy.data.objects.new("HeroCamera", cam_data)
    scene.collection.objects.link(hero_cam)
    hero_cam.location = Vector((14.8, -10.6, 6.9))
    point_camera(hero_cam, target)
    cam_data.lens = 54
    cam_data.sensor_width = 36
    scene.camera = hero_cam

    # Cámara frontal opcional
    if cfg["create_front_camera"]:
        front_data = bpy.data.cameras.new("FrontCamera")
        front_cam = bpy.data.objects.new("FrontCamera", front_data)
        scene.collection.objects.link(front_cam)
        front_cam.location = Vector((-12.8, 0.0, 3.55))
        point_camera(front_cam, Vector((1.1, 0.0, 2.4)))
        front_data.lens = 66

    # Una luz principal (Sun)
    key_data = bpy.data.lights.new(name="KeySun", type='SUN')
    key = bpy.data.objects.new(name="KeySun", object_data=key_data)
    scene.collection.objects.link(key)
    key.location = (11.0, -8.0, 15.0)
    key.rotation_euler = (math.radians(56.0), math.radians(-2.0), math.radians(28.0))
    key_data.energy = 4.4
    key_data.angle = math.radians(0.42)


def set_viewport_material_mode_if_possible(enabled=True):
    if not enabled or bpy.context.screen is None:
        return
    for area in bpy.context.screen.areas:
        if area.type == 'VIEW_3D':
            for space in area.spaces:
                if space.type == 'VIEW_3D':
                    space.shading.type = 'MATERIAL'


# ==========================================================
# EXPORTACIÓN GLB
# ==========================================================
def export_glb_if_needed(cfg):
    if not cfg["do_export_glb"]:
        return

    bpy.ops.export_scene.gltf(
        filepath=cfg["export_path"],
        export_format='GLB',
        export_yup=True,
        export_apply=True,
        export_texcoords=True,
        export_normals=True,
        export_materials='EXPORT',
        export_colors=False,
        use_selection=False,
    )
    print(f"[OK] Exportado GLB: {cfg['export_path']}")


# ==========================================================
# MAIN
# ==========================================================
def main():
    clean_scene()

    work_col = ensure_collection(CONFIG["collection_name"])
    mats = create_materials(CONFIG)

    base_info = build_plinth_and_platform(CONFIG, work_col, mats)
    platform_top_z = base_info["platform_top_z"]

    build_structural_sequence(CONFIG, work_col, mats, platform_top_z)
    build_roofs(CONFIG, work_col, mats, platform_top_z)
    build_water_sheet(CONFIG, work_col, mats, platform_top_z, base_info["platform_x"])
    build_side_screens(CONFIG, work_col, mats, platform_top_z)
    build_sculptural_monolith(CONFIG, work_col, mats, platform_top_z)

    build_ground(CONFIG, mats)
    setup_cameras_and_light(CONFIG)
    set_viewport_material_mode_if_possible(CONFIG["set_viewport_shading_to_material"])

    export_glb_if_needed(CONFIG)
    print("[OK] Pabellón estructural premium generado.")


if __name__ == "__main__":
    main()
